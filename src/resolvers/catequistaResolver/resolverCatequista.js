import { GroupDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const resolverManager = {
  Catequista: {
    group: ({group}) => GroupDS.findById(group),
  },
}

export default resolverManager
