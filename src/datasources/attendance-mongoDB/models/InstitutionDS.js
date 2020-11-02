import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema({
  name: String,
  location: String,
  alias: String,
  image: String,
  demo: Boolean,
  email: String,
  qr: String,
})

export default mongoose.model('institutions', institutionSchema)
