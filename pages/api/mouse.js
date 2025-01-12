import dbConnect from '../../lib/db'; // Asegúrate de que el archivo de conexión esté correcto
import Mouse from '../../models/mouse';
export default async function handler(req, res) {
  await dbConnect(); // Conectar a la base de datos

  const { method } = req; // Obtener el método HTTP de la solicitud

  switch (method) {
    case 'GET':
      try {
        // Obtener todos los equipos
        const mouse = await Mouse.find({});
        res.status(200).json({ success: true, data: mouse });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const mouse = new Mouse(req.body);
        await mouse.save();
        res.status(201).json({ success: true, data: mouse });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
      case "DELETE":
      try {
        const { id } = req.query;
        const deletedMouse = await Mouse.findByIdAndDelete(id);

        if (!deletedMouse) {
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
          const result = await Mouse.findByIdAndUpdate(id, updatedData, { new: true });
      
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
      res.setHeader('Allow', ['POST', 'GET','PUT']); // Solo permite POST y GET
      res.status(405).end(`Method ${method} Not Allowed`); // Método no permitido
  }
}
