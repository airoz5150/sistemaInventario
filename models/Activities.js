import mongoose from 'mongoose';

const activitiesSchema = new mongoose.Schema({
  name_activities: {
    type: String,
    required: [true, 'activities name is required'],
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
  starting_date: {
    type: String,
    required: [true, 'Starting date is required'],
  },
  end_date: {
    type: String,
    required: [true, ' end date is required'],
  },

status: {
  type: String,
  required: [true, 'status is required'],
  default:'Sin asignar',
},
user: {
  type: mongoose.Schema.Types.ObjectId, 
  ref: "users", // Se refiere a un modelo dinámico
  default: null,
},

});

export default mongoose.models.activities || mongoose.model('activities', activitiesSchema);

