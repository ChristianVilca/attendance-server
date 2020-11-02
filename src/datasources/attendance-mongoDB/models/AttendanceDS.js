import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  date: Date,
  confirmante: mongoose.Types.ObjectId,
  type: String,
})

export default mongoose.model('attendance', attendanceSchema)
