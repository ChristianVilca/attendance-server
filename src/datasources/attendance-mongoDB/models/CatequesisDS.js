import mongoose from 'mongoose';

/* const { ObjectId } = mongoose.Types;

ObjectId.prototype.valueOf = function() {
  return this.toString();
}; */

const catequesisSchema = new mongoose.Schema({
  name: String,
  year: String,
  hourStart: String,
  hourEnd: String,
  tolerance: String,
  day: String,
  image: String,
  manager: mongoose.Types.ObjectId,
})

export default mongoose.model('catequeses', catequesisSchema)
