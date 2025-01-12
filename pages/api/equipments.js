import dbConnect from '../../lib/db'; // Asegúrate de que el archivo de conexión esté correcto
import Equipment from '../../models/equipment';
export default async function handler(req, res) {
  await dbConnect(); // Conectar a la base de datos

  const { method } = req; // Obtener el método HTTP de la solicitud

  switch (method) {
    case 'GET':
      try {
        const { id } = req.query; // Obtener el ID de los query parameters

        // Si hay un ID en la query, buscamos solo ese usuario
        if (id) {
          const equipment = await Equipment.findById(id)
            .populate('contenidoMoviles')
            .populate('contenidoTelefonica')
            .populate('contenidoMouse')          // Poblar contenidoMouse
            .populate('contenidoBocinas')        // Poblar contenidoBocinas
            .populate('contenidoReguladores')    // Poblar contenidoReguladores
            .populate('contenidoMonitores')      // Poblar contenidoMonitores
            .populate('contenidoTeclado');

          // Si no se encuentra el usuario, devolver un error 404
          if (!equipment) {
            return res.status(404).json({ success: false, message: " no encontrado" });
          }

          // Si se encuentra el usuario, devolverlo
          return res.status(200).json({ success: true, data: equipment });
        } else {
          // Si no hay ID, devolver todos los usuarios
          const equipment = await Equipment.find({});
          return res.status(200).json({ success: true, data: equipment });
        }
      } catch (error) {
        console.error(error); // Log de error para depuración
        res.status(400).json({ success: false, error: error.message || "Error al obtener los equipos" });
      }
      break;

    case 'POST':
      console.log(req.body);

      try {
        const equipment = new Equipment(req.body);
        await equipment.save();
        res.status(201).json({ success: true, data: equipment });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "DELETE":
      try {
        const { id } = req.query;
        const deletedEquipment = await Equipment.findByIdAndDelete(id);

        if (!deletedEquipment) {
          return res
            .status(404)
            .json({ success: false, message: "Empleado no encontrado" });
        }

        res.status(204).json({ success: true }); // No content
      } catch (error) {
        res.status(400).json({ success: false, error });
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

        // Actualiza el empleado
        const result = await Equipment.findByIdAndUpdate(id, updatedData, { new: true });

        if (!result) {
          return res.status(404).json({ success: false, message: "Empleado no encontrado" });
        }

        res.status(200).json({ success: true, data: result });
      } catch (error) {
        console.error(error); // Log para depuración
        res.status(500).json({ success: false, error: error.message || "Error desconocido" });
      }
      break;


    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT']); // Solo permite POST y GET
      res.status(405).end(`Method ${method} Not Allowed`); // Método no permitido
  }
}
