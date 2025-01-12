import mongoose, { Schema } from 'mongoose';

const employeeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'employee name is required'],
  },
  lastname: {
    type: String,
    required: [true, 'lastname is required'],
  },
  phone: {
    type: String,
    required: [true, 'phone is required'],
  },
  address: {
    type: String,
    required: [true, 'address is required'],
  },
  position: {
    type: String,
    required: [true, 'position is required'],
  },  
  id_equipment: {
    type: Schema.Types.ObjectId, 
    ref: "Equipment", // Asegúrate de que coincida con el nombre del modelo
    default: null,
  },
  id_area: {
    type: Schema.Types.ObjectId, 
    ref: "Area",
    default: null,
  },
  
});

export default mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
