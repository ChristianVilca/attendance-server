import { ConfirmanteDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const resolverManager = {
  Attendance: {
    confirmante: ({confirmante}) => ConfirmanteDS.findById(confirmante),
  },
}

export default resolverManager
