import dbConnect from '../../lib/db';
import Users from '../../models/Users';
import multer from 'multer';

// Configuración de almacenamiento de multer en memoria
const storage = multer.memoryStorage();  // Archivos en memoria
const upload = multer({ storage: storage });

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      try {
        const users = new Users(req.body);
        await users.save();
        res.status(201).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'GET':
      try {
        const { id } = req.query;
        if (id) {
          const user = await Users.findById(id).populate("activities");
          if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
          }
          return res.status(200).json({ success: true, data: user });
        } else {
          const users = await Users.find({});
          return res.status(200).json({ success: true, data: users });
        }
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error.message || "Error al obtener los usuarios" });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        const deletedUser = await Users.findByIdAndDelete(id);
        if (!deletedUser) {
          return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
        res.status(204).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

      case 'PUT':
      try {
        const { id } = req.query;

        if (!id) {
          return res.status(400).json({ success: false, message: "ID no proporcionado" });
        }

        // Promisificar la carga de archivos de multer
        await new Promise((resolve, reject) => {
          upload.single('profileImg')(req, res, (err) => {
            if (err) {
              reject(err); // Si hay un error, rechazamos la promesa
            } else {
              resolve(); // Si no hay error, resolvemos la promesa
            }
          });
        });

        const updatedData = req.body;

        // Verificamos si existe una nueva imagen en el archivo cargado
        if (req.file) {
          updatedData.profileImg = req.file.buffer; // Usamos el buffer de la imagen para guardarla en la base de datos
        }

        // Actualiza el usuario
        const result = await Users.findByIdAndUpdate(id, updatedData, { new: true });

        if (!result) {
          return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        res.status(200).json({ success: true, data: result });
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        res.status(500).json({ success: false, error: error.message || "Error desconocido" });
      }
      break;


    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
