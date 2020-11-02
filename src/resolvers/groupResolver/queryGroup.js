import { GroupDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const queryGroup = {
  getAllGroup: () => {
    return GroupDS.find({})
  },
  getGroup: (root, { id }) => {
    return new Promise((resolve, object) => {
      GroupDS.findById(id, (error, registro) => {
        if (error) rejects(error)
        else resolve(registro)
      })
    })
  },
}

export default queryGroup
