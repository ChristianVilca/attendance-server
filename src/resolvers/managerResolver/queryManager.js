import { ManagerDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const queryManager = {
  getAllManager: () => {
    return ManagerDS.find({})
  },
  getManager: (root, { id }) => {
    return new Promise((resolve, object) => {
      ManagerDS.findById(id, (error, data) => {
        if (error) rejects(error)
        else resolve(data)
      })
    })
  },
}

export default queryManager
