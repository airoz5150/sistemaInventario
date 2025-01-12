import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    contenido: {
      type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
      required: true,
      ref: "activities", // Se refiere a un modelo dinámico
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Suponiendo que tienes un modelo de usuarios
      required: true,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt
  }
);

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
