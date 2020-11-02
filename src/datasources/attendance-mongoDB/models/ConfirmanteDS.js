import mongoose from "mongoose";

const confirmantesSchema = new mongoose.Schema({
  number: Number,
  code: String,
  firstName: String,
  lastName: String,
  image: String,
  catequesis: mongoose.Types.ObjectId,
  group: mongoose.Types.ObjectId
})

export default mongoose.model('confirmantes', confirmantesSchema)
