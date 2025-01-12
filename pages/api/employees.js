import dbConnect from "../../lib/db"; // Función para conectar a la base de datos
import Employees from "../../models/Employees"; // Modelo para la colección de empleados

// Handler principal para manejar las solicitudes HTTP
export default async function handler(req, res) {
  // Establece la conexión a la base de datos
  await dbConnect();

  // Manejo de diferentes métodos HTTP
  switch (req.method) {
    // Caso para la solicitud POST (crear un nuevo empleado)
    case "POST":
      try {
        console.log(req.body); // Log de la solicitud para depuración
        // Crea una nueva instancia de Employee con los datos del cuerpo de la solicitud
        const employee = new Employees(req.body);
        // Guarda el nuevo empleado en la base de datos
        await employee.save();
        // Responde con un estado 201 (creado) y los datos del empleado
        res.status(201).json({ success: true, data: employee });
      } catch (error) {
        // Si ocurre un error, responde con estado 400 y el mensaje de error
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // Caso para la solicitud GET (obtener todos los empleados)
    case "GET":
      try {
        // Obtiene todos los empleados de la base de datos
        const employees = await Employees.find({});
        // Responde con estado 200 (OK) y los datos de los empleados
        res.status(200).json({ success: true, data: employees });
      } catch (error) {
        // Si ocurre un error, responde con estado 400 y el mensaje de error
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // Caso para la solicitud DELETE (eliminar un empleado por ID)
    case "DELETE":
      try {
        const { id } = req.query; // Obtiene el ID del empleado a eliminar
        // Busca y elimina al empleado usando su ID
        const deletedEmployee = await Employees.findByIdAndDelete(id);

        // Si no se encuentra al empleado, responde con un estado 404 (No encontrado)
        if (!deletedEmployee) {
          return res
            .status(404)
            .json({ success: false, message: "Empleado no encontrado" });
        }

        // Si se elimina con éxito, responde con un estado 204 (Sin contenido)
        res.status(204).json({ success: true });
      } catch (error) {
        // Si ocurre un error, responde con estado 400 y el mensaje de error
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // Caso para la solicitud PUT (actualizar un empleado por ID)
    case "PUT":
      try {
        const { id } = req.query; // Obtiene el ID del empleado a actualizar
        const updatedData = req.body; // Datos nuevos a actualizar

        // Verifica que el ID sea válido
        if (!id) {
          return res.status(400).json({ success: false, message: "ID no proporcionado" });
        }

        // Actualiza al empleado con el ID especificado
        const result = await Employees.findByIdAndUpdate(id, updatedData, { new: true });

        // Si no se encuentra al empleado, responde con estado 404 (No encontrado)
        if (!result) {
          return res.status(404).json({ success: false, message: "Empleado no encontrado" });
        }

        // Si la actualización es exitosa, responde con los datos actualizados
        res.status(200).json({ success: true, data: result });
      } catch (error) {
        console.error(error); // Log para depuración
        // Si ocurre un error, responde con estado 500 y el mensaje de error
        res.status(500).json({ success: false, error: error.message || "Error desconocido" });
      }
      break;

    // Si el método no es ni GET, POST, DELETE, ni PUT
    default:
      // Configura los métodos permitidos para este endpoint
      res.setHeader("Allow", ["GET", "POST", "DELETE", "PUT"]);
      // Responde con el código 405 (Método no permitido)
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
