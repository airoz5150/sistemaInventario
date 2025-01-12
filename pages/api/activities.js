import dbConnect from "../../lib/db";
import Activities from "../../models/Activities";

export default async function handler(req, res) {
  await dbConnect();

  // Función para validar que la fecha de inicio no sea posterior a la fecha de fin
  function validateDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error('Una o ambas fechas son inválidas');
    }

    if (start > end) {
      throw new Error('La fecha de inicio no puede ser posterior a la fecha de fin');
    }
  }

  // Función para formatear una fecha a 'YYYY-MM-DD HH:mm'
  function formatDate(date) {
    const reportDate = new Date(date);

    // Verificar si la fecha es válida
    if (isNaN(reportDate.getTime())) {
      console.error('Fecha inválida:', date);  // Mostrar en consola si la fecha no es válida
      return 'Fecha no válida';  // Retornar un valor por defecto en caso de error
    }

    const year = reportDate.getFullYear();
    const month = String(reportDate.getMonth() + 1).padStart(2, '0');
    const day = String(reportDate.getDate()).padStart(2, '0');
    const hours = String(reportDate.getHours()).padStart(2, '0');
    const minutes = String(reportDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }


  switch (req.method) {
    case "POST":
      console.log(req.query)
      try {
        const { starting_date, end_date } = req.body;

        // Validación de fechas
        validateDates(starting_date, end_date);

        // Obtener la fecha y hora actual
        const currentDate = new Date();
        const activitiesData = {
          ...req.body,
          reportDate: currentDate,  // Guardamos la fecha como objeto Date
        };

        // Crear un nuevo documento de Activities
        const activities = new Activities(activitiesData);
        await activities.save();

        res.status(201).json({ success: true, data: activities });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "GET":
      try {
        const { id } = req.query;
        if (id) {
          const activities = await Activities.findById(id).populate('user', 'nombreCompleto -_id');
          if (!activities) {
            return res.status(404).json({ success: false, message: "Actividad no encontrada" });
          }

          const formattedActivity = {
            ...activities.toObject(),
            starting_date: formatDate(activities.starting_date),
            end_date: formatDate(activities.end_date),
          };

          return res.status(200).json({ success: true, data: formattedActivity });
        } else {
          const activities = await Activities.find({}).populate('user', 'nombreCompleto -_id');
          
          // Formatear fechas antes de devolver las actividades
          const activitiesWithFormattedDate = activities.map(activity => {
            return {
              ...activity.toObject(),
              starting_date: formatDate(activity.starting_date),
              end_date: formatDate(activity.end_date),
            };
          });

          return res.status(200).json({ success: true, data: activitiesWithFormattedDate });
        }
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error.message || "Error al obtener las actividades" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        const deletedActivities = await Activities.findByIdAndDelete(id);

        if (!deletedActivities) {
          return res.status(404).json({ success: false, message: "Actividad no encontrada" });
        }

        res.status(204).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "PUT":
      try {
        const { id } = req.query;
        const updatedData = req.body;

        // Validación de fechas en la actualización
        if (updatedData.starting_date && updatedData.end_date) {
          validateDates(updatedData.starting_date, updatedData.end_date);
        }

        if (!id) {
          return res.status(400).json({ success: false, message: "ID no proporcionado" });
        }

        const result = await Activities.findByIdAndUpdate(id, updatedData, { new: true });

        if (!result) {
          return res.status(404).json({ success: false, message: "Actividad no encontrada" });
        }

        res.status(200).json({ success: true, data: result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message || "Error desconocido" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
