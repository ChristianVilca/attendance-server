import { ConfirmanteDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const ean13_checksum = message => {
  var checksum = 0;
  var initial = message
  message += ''
  message = message.split('').reverse();
  for(var pos in message){
      checksum += message[pos] * (3 - 2 * (pos % 2));
  }
  return "0".repeat(12-initial.length)+initial+((10 - (checksum % 10 )) % 10);
}

const mutationConfirmante = {
  new2Confirmante: (root, { input }) => {
    const newConfirmante = new ConfirmanteDS({
      number: input.number,
      code: input.code,
      nombre: input.nombre,
      apellido: input.apellido,
      institucion: input.institucion,
      edad: input.edad,
      fotoNormal: input.fotoNormal,
      fotoCircular: input.fotoCircular
    })

    newConfirmante.id = newConfirmante._id

    return new Promise((resolver, object) => {
      /* ConfirmanteDS.findOne({}, (err, result) =>{
        if (err) throw err;
        console.log(result)

        newConfirmante.number = (result) ? Number(result.number) + 1 : 1

        console.log("confirmante",newConfirmante) */
        newConfirmante.save((error) => {
          if (error) rejects(error)
          else resolver(newConfirmante)
        })
      /* }).sort({number:-1}) */
    })
  },
  new3Confirmante: (root, { input }) => {
    const newConfirmante = new ConfirmanteDS({
      number: '',
      code: '',
      nombre: '',
      apellido: '',
      institucion: '',
      edad: 0,
      fotoNormal: '',
      fotoCircular: ''
    })

    newConfirmante.id = newConfirmante._id

    return new Promise((resolver, object) => {
      ConfirmanteDS.findOne({}, (err, result) =>{
        if (err) throw err;
        //console.log(result)
        var code = 0
        if (result) {
          newConfirmante.number = Number(result.number) + 1
          code = ean13_checksum(newConfirmante.number)
        } else {
          newConfirmante.number = 1
          code = ean13_checksum(1)
        }
        code = "0".repeat(13-code.length)+ code
        newConfirmante.code = code

        //newConfirmante.number = (result) ? Number(result.number) + 1 : 1

        //console.log("0".repeat(13-newConfirmante.code.length)+newConfirmante.code)
        //console.log(code)
        //console.log("confirmante",newConfirmante)
        newConfirmante.save((error) => {
          if (error) rejects(error)
          else resolver(newConfirmante)
        })
      }).sort({number:-1})
    })
  },
  newConfirmante: (root, { input }) => {
    const newConfirmante = new ConfirmanteDS({
      firstName: input.firstName,
      lastName: input.lastName,
      image: input.image,
      catequesis: input.catequesis,
      group: input.group,
    })

    newConfirmante.id = newConfirmante._id

    return new Promise((resolver, object) => {
      ConfirmanteDS.findOne({}, (err, result) =>{
        if (err) throw err;
        //console.log("result",result)
        var code = 0
        if (result) {
          newConfirmante.number = Number(result.number) + 1
          code = ean13_checksum(newConfirmante.number)
        } else {
          newConfirmante.number = 1
          code = ean13_checksum(1)
        }
        code = "0".repeat(13-code.length)+ code
        newConfirmante.code = code

    newConfirmante.save((error) => {
          if (error) rejects(error)
          else resolver(newConfirmante)
        })
      }).sort({number:-1})
    })
  },
  updateConfirmante: (root, { input }) => {
    return new Promise((resolve, object) => {
      ConfirmanteDS.findOneAndUpdate({ _id: input.id }, input, {new: true}, (error, registro) => {
        if (error) rejects(error)
        else resolve(registro)
      })
    })
  },
  removeConfirmante: (root, { id }) => {
    return new Promise((resolve, object) => {
      ConfirmanteDS.findOneAndRemove({ _id: id }, (error) => {
        if (error) rejects(error)
        else resolve("Se elimino correctamente")
      })
    })
  }
}

export default mutationConfirmante
