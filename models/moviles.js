import mongoose from "mongoose";

const movilesSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  numeroSerie: { type: String, required: true },
  correo: { type: String, required: true },
  respaldo: { type: String, required: true },
  estado: { type: String, required: true },
});

export default mongoose.models.moviles || mongoose.model('moviles', movilesSchema);

