import { ConfirmanteDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const queryConfirmante = {
  getNumberConfirmante: (root) => {
    return new Promise((resolve, object) => {
      ConfirmanteDS.findOne({}, (error, result) =>{
        if(error) rejects(error)
        else {
          //console.log(result)
          if (result){
            resolve( result.numero + 1 )
          } else {
            resolve(1)
            //result.numero = Number(result.numero) + 1
          }
          //result.numero = (result) ? Number(result.numero) + 1 : 1
          //console.log("confirmante",result)

        }
      }).sort({numero:-1})
    })
  },
  getAllConfirmante: (root) => {
    return ConfirmanteDS.find({ firstName: { $ne:""} })
  },
  getConfirmante: (root, { id }) => {
    return new Promise((resolve, object) => {
      ConfirmanteDS.findById(id, (error, confirmante) => {
        if (error) rejects(error)
        else resolve(confirmante)
      })
    })
  },
  getNewConfirmante: (root) => {
    const nuevoConfirmante = new ConfirmanteDS({
      numero: '',
      codigo: '',
      nombre: '',
      apellido: '',
      institucion: '',
      edad: '',
      fotoNormal: '',
      fotoCircular: ''
    })

    nuevoConfirmante.id = nuevoConfirmante._id
    nuevoConfirmante.save().then(item => {
      res.send("item saved to database");
    })
    new Promise((resolver, object) => {
        nuevoConfirmante.save((error) => {
          if (error) rejects(error)
          else {
            resolver(nuevoConfirmante)
          }
        })
    })
    //console.log("idConfirmante ", nuevoConfirmante.id)

    return new Promise((resolve, object) => {
      ConfirmanteDS.findById(nuevoConfirmante.id, (error, confirmante) => {
        if (error) rejects(error)
        else {
          //console.log(confirmante)
          resolve(confirmante)
        }
      })
    })
  },
}

export default queryConfirmante
