import dbConnect from "../../lib/db"; // Importa tu función de conexión a la base de datos
import Employees from "../../models/Employees"; // Modelo de empleados
import equipment from "../../models/equipment";
import Activities from "../../models/Activities";
import Users from "../../models/Users";

export default async function handler(req, res) {
  await dbConnect(); // Conéctate a la base de datos

  try {
    const employeeCount = await Employees.countDocuments(); // Contar empleados
    const equipmentCount = await equipment.countDocuments(); // Contar equipos
    const usersCount = await Users.countDocuments(); // Contar equipos
    const activitiesCount = await Activities.countDocuments(); // Contar equipos

    res.status(200).json({
      success: true,
      data: {
        employees: employeeCount,
        equipment: equipmentCount,
        users: usersCount,
        activities: activitiesCount,
      },
    });
  } catch (error) {
    console.error("Error al contar documentos:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
