import { CatequistaDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const mutationCatequista = {
  newCatequista: (root, { input }) => {
    const newCatequista = new CatequistaDS({
      firstName: input.firstName,
      lastName: input.lastName,
      imagen: input.imagen,
      firstName: input.firstName,
      lastName: input.lastName,
      imagen: input.imagen,
      newAttendance: input.newAttendance,
      newConfirmante: input.newConfirmante,
      updateConfirmante: input.updateConfirmante,
      viewConfirmante: input.viewConfirmante,
      removeConfirmante: input.removeConfirmante,
      viewGeneral: input.viewGeneral,
      viewSingle: input.viewSingle,
      viewCarnet: input.viewCarnet,
      group: input.group,
    })
    newCatequista.id = newCatequista._id

    return new Promise((resolver, object) => {
      newCatequista.save((error) => {
        if (error) rejects(error)
        else resolver(newCatequista)
      })
    })
  },
  updateCatequista: (root, { input }) => {
    return new Promise((resolve, object) => {
      CatequistaDS.findOneAndUpdate({ _id: input.id }, input, {new: true}, (error, result) => {
        if (error) rejects(error)
        else resolve(result)
      })
    })
  },
  removeCatequista: (root, { id }) => {
    return new Promise((resolve, object) => {
      CatequistaDS.findOneAndRemove({ _id: id }, (error) => {
        if (error) rejects(error)
        else resolve("Se elimino correctamente")
      })
    })
  }
}

export default mutationCatequista

