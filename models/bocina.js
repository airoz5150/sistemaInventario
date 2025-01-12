import mongoose from 'mongoose';

const bocinaSchema = new mongoose.Schema({

  marca: {
    type: String,
    required: [true, 'Area name is required'],
  },
  modelo: {
    type: String,
    required: [true, 'Responsible is required'],
  },
  SN: {
    type: String,
    required: [true, 'floor is required'],
  },
  estado: {
    type: String,
    required: [true, 'description is required'],
  }
  // id_tickes  : {
  //   type: Schema.ObjectId, ref: "activities",
  //   required: [true, 'id activities is required'],
  // },
});

export default mongoose.models.bocina || mongoose.model('bocina', bocinaSchema);
