import { ManagerDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const mutationManager = {

  newManager: (root, { input }) => {
    const newManager = new ManagerDS({
      firstName: input.firstName,
      lastName: input.lastName,
      image: input.image,
      code: input.code,
      institution: input.institution,
    })
    newManager.id = newManager._id

    return new Promise((resolver, object) => {
      newManager.save((error) => {
        if (error) rejects(error)
        else resolver(newManager)
      })
    })
  },
  updateManager: (root, { input }) => {
    return new Promise((resolve, object) => {
      ManagerDS.findOneAndUpdate({ _id: input.id }, input, {new: true}, (error, registro) => {
        if (error) rejects(error)
        else resolve(registro)
      })
    })
  },
  removeManager: (root, { id }) => {
    return new Promise((resolve, object) => {
      ManagerDS.findOneAndRemove({ _id: id }, (error) => {
        if (error) rejects(error)
        else resolve("Se elimino correctamente")
      })
    })
  }
}

export default mutationManager

