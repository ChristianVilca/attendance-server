import { CatequesisDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const queryCatequesis = {
  getAllCatequesis: () => {
    return CatequesisDS.find({})
  },
  getCatequesis: (root, { id }) => {
    return new Promise((resolve, object) => {
      CatequesisDS.findById(id, (error, registro) => {
        if (error) rejects(error)
        else resolve(registro)
      })
    })
  },
}

export default queryCatequesis
