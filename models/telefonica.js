import mongoose from 'mongoose';

const telefonicaSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  numeroExt: { type: String, required: true },
  numeroSerie: { type: String, required: true },
  estado: { type: String, required: true },
});

export default mongoose.models.telefonica || mongoose.model('telefonica', telefonicaSchema);
