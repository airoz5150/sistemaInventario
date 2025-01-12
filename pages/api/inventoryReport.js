import dbConnect from "../../lib/db"; // Conexión a la base de datos
import inventoryReport from "../../models/inventoryReport";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "POST":
      try {
        const { title,
          contenidoEquipments,
          contenidoMoviles,
          contenidoTelefonica,
          contenidoMouse,
          contenidoBocinas,
          contenidoReguladores,
          contenidoMonitores,
          contenidoTeclado,
          createdBy
        } = req.body; // Extraer datos del cuerpo de la solicitud
        console.log(req.body)
        // Validar que todos los campos requeridos están presentes
        if (!title ||
          !contenidoEquipments ||
          !contenidoMoviles ||
          !contenidoTelefonica ||
          !contenidoMouse ||
          !contenidoBocinas ||
          !contenidoReguladores ||
          !contenidoMonitores ||
          !contenidoTeclado ||
          !createdBy
        ) {
          return res.status(400).json({ message: "Faltan campos requeridos" });
        }

        // Crear un nuevo reporte
        const newReport = new inventoryReport({
          title,
          contenidoEquipments,
          contenidoMoviles,
          contenidoTelefonica,
          contenidoMouse,
          contenidoBocinas,
          contenidoReguladores,
          contenidoMonitores,
          contenidoTeclado, // Aquí se usa el tipo de reporte (Equipment, Activity, etc.)
          createdBy, // ID del usuario que realizó la acción
        });

        // Guardar el reporte en la base de datos
        await newReport.save();

        // Enviar una respuesta exitosa al cliente
        return res.status(200).json({ message: "Reporte creado con éxito", report: newReport });
      } catch (error) {
        console.error(error); // Para depuración
        return res.status(500).json({ message: "Error al crear el reporte", error: error.message });
      }

    case "GET":
      const id = req.query.id;  // Obtener el parámetro 'id' de la query string

      if (id) {
        try {
          // Si 'id' está presente, obtenemos el reporte específico
          const report = await inventoryReport.findById(id)
            .populate('contenidoEquipments')     // Poblar contenidoEquipments
            .populate('contenidoMoviles')
            .populate('contenidoTelefonica')
            .populate('contenidoMouse')          // Poblar contenidoMouse
            .populate('contenidoBocinas')        // Poblar contenidoBocinas
            .populate('contenidoReguladores')    // Poblar contenidoReguladores
            .populate('contenidoMonitores')      // Poblar contenidoMonitores
            .populate('contenidoTeclado')       // Poblar contenidoTeclado
            .populate('createdBy');       // Poblar contenidoTeclado

          if (!report) {
            return res.status(404).json({ success: false, message: 'Reporte no encontrado' });
          }

          // Devolver el reporte con todos los campos poblados
          res.json({
            contenidoEquipments: report.contenidoEquipments,
            contenidoMoviles: report.contenidoMoviles,
            contenidoTelefonica: report.contenidoTelefonica,
            contenidoMouse: report.contenidoMouse,
            contenidoBocinas: report.contenidoBocinas,
            contenidoReguladores: report.contenidoReguladores,
            contenidoMonitores: report.contenidoMonitores,
            contenidoTeclado: report.contenidoTeclado,
          });

        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Hubo un error al recuperar el reporte por ID.' });
        }
      } else {
        // Si no se pasa un 'id', obtenemos todos los reportes
        try {
          const reports = await inventoryReport.find({})
            .populate('contenidoMoviles')
            .populate('contenidoTelefonica')
            .populate('contenidoMouse')          // Poblar contenidoMouse
            .populate('contenidoBocinas')        // Poblar contenidoBocinas
            .populate('contenidoReguladores')    // Poblar contenidoReguladores
            .populate('contenidoMonitores')      // Poblar contenidoMonitores
            .populate('contenidoTeclado')
            .populate('createdBy','nombreCompleto -_id');       // Poblar contenidoTeclado;  // Trae solo el campo 'correo' de 'createdBy'

          reports.forEach(report => {
            // Elimina la propiedad _id de createdBy
            if (report.createdBy && report.createdBy._id) {
              delete report.createdBy._id;
            }
          });

          res.status(200).json({ success: true, data: reports });
        } catch (error) {
          res.status(500).json({ success: false, error: error.message });
        }
      }
      break;


    case "DELETE":
      try {
        const { id } = req.query; // Obtener 'id' de la query string

        if (!id) {
          return res.status(400).json({ success: false, message: "ID no proporcionado" });
        }

        // Usar el modelo correcto 'inventoryReport' para eliminar el reporte
        const deletedReport = await inventoryReport.findByIdAndDelete(id);

        if (!deletedReport) {
          return res.status(404).json({ success: false, message: "Reporte no encontrado" });
        }

        res.status(204).json({ success: true }); // No content
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;


    case "PUT":
      try {
        const { id } = req.query; // Asegúrate de que `id` está pasando correctamente desde el cliente
        const updatedData = req.body;

        // Verifica que el ID es válido (opcional, pero recomendado)
        if (!id) {
          return res.status(400).json({ success: false, message: "ID no proporcionado" });
        }

        // Actualiza el reporte (o empleado si es necesario)
        const result = await ReportsEquipments.findByIdAndUpdate(id, updatedData, { new: true }); // O Employees.findByIdAndUpdate(id, updatedData)

        if (!result) {
          return res.status(404).json({ success: false, message: "Reporte no encontrado" });
        }

        res.status(200).json({ success: true, data: result });
      } catch (error) {
        console.error(error); // Log para depuración
        res.status(500).json({ success: false, error: error.message || "Error desconocido" });
      }
      break;

    default:
      // Si el método no es uno de los permitidos, devolver un error
      res.setHeader("Allow", ["GET", "POST", "DELETE", "PUT"]);
      return res.status(405).json({ message: `Método ${req.method} no permitido` });
  }
}







