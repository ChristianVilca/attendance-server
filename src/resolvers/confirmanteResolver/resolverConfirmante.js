import { GroupDS, AttendanceDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const resolverManager = {
  Confirmante: {
    group: ({group}) => GroupDS.findById(group),
    attendances: ({id}) => AttendanceDS.find({confirmante: id}),
  },
}

export default resolverManager
