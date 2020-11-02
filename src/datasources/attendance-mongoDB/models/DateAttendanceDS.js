import mongoose from "mongoose";

const dateAttendanceSchema = new mongoose.Schema({
  date: Date,
  catequesis: mongoose.Types.ObjectId,
})

export default mongoose.model('dateAttendance', dateAttendanceSchema)
