import { UserDS } from '../../datasources/attendance-mongoDB/db'

const queryUser = {
  getUser: (root, args, {userCurrent}) => {
    //console.log("userCurrent: ",userCurrent)
    if(!userCurrent){
      return null
    }
    //console.log(userCurrent)

    // Obtener el usuario actual del request del JWT verificado
    const usuario = UserDS.findOne({usuario: userCurrent.usuario})
    return usuario
  }
}

export default queryUser
