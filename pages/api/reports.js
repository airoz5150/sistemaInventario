import dbConnect from "../../lib/db"; // Conexión a la base de datos
import Report from "../../models/Reports"; // Importa el modelo Report

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "POST":
      console.log(req.body)
      try {
        const { title, contenido, createdBy } = req.body; // Extraer datos del cuerpo de la solicitud

        // Validar que todos los campos requeridos están presentes
        if (!title || !contenido || !createdBy) {
          return res.status(400).json({ message: "Faltan campos requeridos" });
        }

        // Crear un nuevo reporte
        const newReport = new Report({
          title,
          contenido, // Aquí se usa el tipo de reporte (Equipment, Activity, etc.)
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
        console.log(req.query)
      if (id) {
        try {
          // Si 'id' está presente, obtenemos solo el campo 'contenido' de un reporte específico
          const report = await Report.findById(id).populate('contenido').populate('createdBy','nombreCompleto -_id');  // Busca un reporte específico por ID

          if (!report) {
            return res.status(404).json({ success: false, message: 'Reporte no encontrado' });
          }

          // Devolver solo el campo 'contenido' del reporte
          res.json({ contenido: report.contenido });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Hubo un error al recuperar el reporte por ID.' });
        }
      } else {
        try {
          // Si no se pasa un 'id', obtenemos todos los reportes
          const reports = await Report.find({}).populate('createdBy','nombreCompleto -_id')  // Trae solo el campo 'correo' de 'createdBy'
              
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
        const { id } = req.query;
        const deletedReport = await Report.findByIdAndDelete(id); // O Employees.findByIdAndDelete(id)

        if (!deletedReport) {
          return res.status(404).json({ success: false, message: "Reporte no encontrado" });
        }

        res.status(204).json({ success: true }); // No content
      } catch (error) {
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
        const result = await Report.findByIdAndUpdate(id, updatedData, { new: true }); // O Employees.findByIdAndUpdate(id, updatedData)

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







