import mongoose from 'mongoose';

const catequistaSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  imagen: String,
  newAttendance: Boolean,
  newConfirmante: Boolean,
  updateConfirmante: Boolean,
  viewConfirmante: Boolean,
  removeConfirmante: Boolean,
  viewGeneral: Boolean,
  viewSingle: Boolean,
  viewCarnet: Boolean,
  group: mongoose.Types.ObjectId,
})

export default mongoose.model('catequistas', catequistaSchema)
