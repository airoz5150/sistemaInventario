import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({

  name_of_equipment: {
    type: String,
    required: [true, 'Area name is required'],
  },
  serial_number: {
    type: String,
    required: [true, 'Responsible is required'],
  },
  model: {
    type: String,
    required: [true, 'floor is required'],
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
  year: {
    type: String,
    required: [true, 'year is required'],
  },
  floor: {
    type: Number,
    required: [true, 'floor is required'],
  },
  maintenance: {
    type: String,
    required: [true, 'maintenance is required'],
  },
  contenidoMoviles: {
    type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
    required: false,
    ref: "moviles", // Se refiere a un modelo dinámico
  },
  contenidoTelefonica: {
    type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
    required: false,
    ref: "telefonica", // Se refiere a un modelo dinámico
  },
  contenidoMouse: {
    type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
    required: false,
    ref: "mouse", // Se refiere a un modelo dinámico
  },
  contenidoBocinas: {
    type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
    required: false,
    ref: "bocina", // Se refiere a un modelo dinámico
  },
  contenidoReguladores: {
    type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
    required: false,
    ref: "reguladores", // Se refiere a un modelo dinámico
  },
  contenidoMonitores: {
    type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
    required: false,
    ref: "monitor", // Se refiere a un modelo dinámico
  },
  contenidoTeclado: {
    type: [mongoose.Schema.Types.ObjectId], // Suponiendo que 'contenido' es una lista de referencias a otros objetos
    required: false,
    ref: "teclado", // Se refiere a un modelo dinámico
  },
});

export default mongoose.models.Equipment || mongoose.model('Equipment', equipmentSchema);
