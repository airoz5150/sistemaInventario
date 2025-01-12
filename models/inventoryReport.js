import mongoose from "mongoose";

const InventoryReportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    contenidoEquipments: {
      type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
      required: true,
      ref: "Equipment", // Se refiere a un modelo dinámico
    },
    contenidoMoviles: {
      type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
      required: true,
      ref: "moviles", // Se refiere a un modelo dinámico
    },
    contenidoTelefonica: {
      type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
      required: true,
      ref: "telefonica", // Se refiere a un modelo dinámico
    },
    contenidoMouse: {
      type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
      required: true,
      ref: "mouse", // Se refiere a un modelo dinámico
    },
    contenidoBocinas: {
      type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
      required: true,
      ref: "bocina", // Se refiere a un modelo dinámico
    },
    contenidoReguladores: {
      type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
      required: true,
      ref: "reguladores", // Se refiere a un modelo dinámico
    },
    contenidoMonitores: {
      type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
      required: true,
      ref: "monitor", // Se refiere a un modelo dinámico
    },
    contenidoTeclado: {
      type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
      required: true,
      ref: "teclado", // Se refiere a un modelo dinámico
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

export default mongoose.models.InventoryReport || mongoose.model("InventoryReport", InventoryReportSchema);
