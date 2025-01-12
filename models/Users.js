import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: null },
  activities: [{
    type: Schema.Types.ObjectId, 
    ref: "activities", // Asegúrate de que el nombre del modelo 'Activity' sea correcto
    default: [],
  }],
  nombreCompleto: { type: String, required: true, default: null },
  profileImg: { type: Buffer, required: false, default: null },
});

export default mongoose.models.users || mongoose.model("users", userSchema);
