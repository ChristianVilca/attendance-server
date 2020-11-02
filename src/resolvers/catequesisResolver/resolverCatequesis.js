import { ManagerDS, GroupDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const resolverManager = {
  Catequesis: {
    manager: ({manager}) => ManagerDS.findById(manager),
    groups: ({id}) =>  GroupDS.find({catequesis: id})
  },
}

export default resolverManager
