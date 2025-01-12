import dbConnect from '../../lib/db'; // Asegúrate de que el archivo de conexión esté correcto
import Reguladores from '../../models/reguladores'; 
export default async function handler(req, res) {
  await dbConnect(); // Conectar a la base de datos

  const { method } = req; // Obtener el método HTTP de la solicitud

  switch (method) {
    case 'GET':
      try {
        // Obtener todos los reguladores
        const reguladores = await Reguladores.find({}); // Usamos el modelo Reguladores
        res.status(200).json({ success: true, data: reguladores });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
      case 'POST':
        try {
          console.log('Datos recibidos:', req.body);  // Verifica los datos recibidos
          const reguladores = new Reguladores(req.body);
          await reguladores.save();
          res.status(201).json({ success: true, data: reguladores });
        } catch (error) {
          console.error('Error al guardar regulador:', error);  // Más detalles del error
          res.status(400).json({ success: false, error: error.message });
        }
        break;
      

    case "DELETE":
      try {
        const { id } = req.query;
        const deletedReguladores = await Reguladores.findByIdAndDelete(id);

        if (!deletedReguladores) {
          return res
            .status(404)
            .json({ success: false, message: "Regulador no encontrado" });
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
    
        // Actualiza el regulador
        const result = await Reguladores.findByIdAndUpdate(id, updatedData, { new: true });
    
        if (!result) {
          return res.status(404).json({ success: false, message: "Regulador no encontrado" });
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
