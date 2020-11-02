import { CatequesisDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const mutationCatequesis = {
  newCatequesis: (root, { input }) => {
    const nuevoCatequesis = new CatequesisDS({
      name: input.name,
      year: input.year,
      hourStart: input.hourStart,
      hourEnd: input.hourEnd,
      tolerance: input.tolerance,
      day: input.day,
      image: input.image,
      manager: input.manager,
    })
    nuevoCatequesis.id = nuevoCatequesis._id

    return new Promise((resolver, object) => {
      nuevoCatequesis.save((error) => {
        if (error) rejects(error)
        else resolver(nuevoCatequesis)
      })
    })
  },
  updateCatequesis: (root, { input }) => {
    return new Promise((resolve, object) => {
      CatequesisDS.findOneAndUpdate({ _id: input.id }, input, {new: true}, (error, registro) => {
        if (error) rejects(error)
        else resolve(registro)
      })
    })
  },
  removeCatequesis: (root, { id }) => {
    return new Promise((resolve, object) => {
      CatequesisDS.findOneAndRemove({ _id: id }, (error) => {
        if (error) rejects(error)
        else resolve("Se elimino correctamente")
      })
    })
  }
}

export default mutationCatequesis
