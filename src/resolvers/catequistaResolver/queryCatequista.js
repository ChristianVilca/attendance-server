import { CatequistaDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

const queryCatequista = {
  getAllCatequista: (root, { limite, offset, group }) => {
    let filtro = {}
    if (group) {
      filtro = {group: new ObjectId(group)}
    }
    return CatequistaDS.find(filtro).limit(limite).skip(offset)
  },
  getCatequista: (root, { id }) => {
    return new Promise((resolve, object) => {
      CatequistaDS.findById(id, (error, data) => {
        if (error) rejects(error)
        else resolve(data)
      })
    })
  },
}

export default queryCatequista
