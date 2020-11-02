import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuariosSchema = new mongoose.Schema({
  usuario: String,
  nombre: String,
  password: String,
  roles: Array
})

usuariosSchema.pre('save', function(next){
  if(!this.isModified('password')){
    return next()
  }
  bcrypt.genSalt(10, (err, salt)=>{
    if(err) return next(err)
    bcrypt.hash(this.password, salt, (err,hash) => {
      if(err) return next(err)
      this.password = hash
      next()
    })
  })
})

export default mongoose.model('users', usuariosSchema)
