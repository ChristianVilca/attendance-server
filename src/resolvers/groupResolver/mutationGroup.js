import { GroupDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const mutationGroup = {
  newGroup: (root, { input }) => {
    const newGroup = new GroupDS({
      name: input.name,
      color: input.color,
      image: input.image,
      catequesis: input.catequesis,
    })
    newGroup.id = newGroup._id

    return new Promise((resolver, object) => {
      newGroup.save((error) => {
        if (error) rejects(error)
        else resolver(newGroup)
      })
    })
  },
  updateGroup: (root, { input }) => {
    return new Promise((resolve, object) => {
      GroupDS.findOneAndUpdate({ _id: input.id }, input, {new: true}, (error, registro) => {
        if (error) rejects(error)
        else resolve(registro)
      })
    })
  },
  removeGroup: (root, { id }) => {
    return new Promise((resolve, object) => {
      GroupDS.findOneAndRemove({ _id: id }, (error) => {
        if (error) rejects(error)
        else resolve("Se elimino correctamente")
      })
    })
  }
}

export default mutationGroup
