import mongoose from "mongoose";

const managerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  image: String,
  code: String,
  institution: mongoose.Types.ObjectId,
})

export default mongoose.model('managers', managerSchema)
