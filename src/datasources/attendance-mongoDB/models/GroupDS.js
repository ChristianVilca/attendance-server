import mongoose from "mongoose";

const groupsSchema = new mongoose.Schema({
  name: String,
  color: String,
  image: String,
  catequesis: mongoose.Types.ObjectId,
})

export default mongoose.model('groups', groupsSchema)
