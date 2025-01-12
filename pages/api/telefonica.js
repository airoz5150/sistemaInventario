import dbConnect from '../../lib/db'; // Asegúrate de que el archivo de conexión esté correcto
import Telefonica from '../../models/telefonica'; // Asegúrate de que el modelo esté bien importado

export default async function handler(req, res) {
  await dbConnect(); // Conectar a la base de datos

  const { method } = req; // Obtener el método HTTP de la solicitud

  switch (method) {
    case 'GET':
      try {
        // Obtener todos los equipos
        const telefonica = await Telefonica.find({});
        res.status(200).json({ success: true, data: telefonica });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

      case 'POST':
        try {
          console.log('Datos recibidos en POST:', req.body); // Agrega este log para ver lo que llega al backend
          const telefonica = new Telefonica(req.body);
          await telefonica.save();
          res.status(201).json({ success: true, data: telefonica });
        } catch (error) {
          console.error('Error en POST:', error); // Asegúrate de capturar el error completo
          res.status(400).json({ success: false, error: error.message });
        }
        break;
      

    case "DELETE":
      try {
        const { id } = req.query;
        const deletedTelefonica = await Telefonica.findByIdAndDelete(id);

        if (!deletedTelefonica) {
          return res.status(404).json({ success: false, message: "Telefonica no encontrado" });
        }

        res.status(204).json({ success: true }); // No content
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error.message || error });
      }
      break;

    case "PUT":
      try {
        const { id } = req.query;
        const updatedData = req.body;

        if (!id) {
          return res.status(400).json({ success: false, message: "ID no proporcionado" });
        }

        const result = await Telefonica.findByIdAndUpdate(id, updatedData, { new: true });

        if (!result) {
          return res.status(404).json({ success: false, message: "Telefonica no encontrado" });
        }

        res.status(200).json({ success: true, data: result });
      } catch (error) {
        console.error(error); // Log para depuración
        res.status(500).json({ success: false, error: error.message || "Error desconocido" });
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']); // Solo permite los métodos soportados
      res.status(405).end(`Method ${method} Not Allowed`); // Método no permitido
  }
}
