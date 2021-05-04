import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import { UserDS } from '../../datasources/attendance-mongoDB/db'

const newToken = (usuarioLogin, secreto, expiresIn) => {
  const {usuario, roles, menu} = usuarioLogin
  return jwt.sign({usuario, roles, menu}, secreto, {expiresIn})
}

const mutationUser = {
   newUser: async(root, {usuario, nombre, password, roles, menu}) => {
    const existeUsuario = await UserDS.findOne({usuario})

    if(existeUsuario) {
      throw new Error('El usuario ya existe')
    }

    await new UserDS({
      usuario,
      nombre,
      password,
      roles,
      menu
    }).save()

    return "Creado correctamente"
  },

  validateUser: async(root, {usuario, password}) => {
    const nombreUsuario = await UserDS.findOne({usuario})

    if(!nombreUsuario) {
      throw new Error('Usuario no encontrado')
    }

    const passwordCorrecto = await bcrypt.compare(password, nombreUsuario.password)

    if(!passwordCorrecto){
      throw new Error('Password incorrecto')
    }

    return {
      token: newToken(nombreUsuario, process.env.NODE_APP_SECRET, '1hr')
    }
  }
}

export default mutationUser
