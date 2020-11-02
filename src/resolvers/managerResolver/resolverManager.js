import { InstitutionDS, CatequesisDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const resolverManager = {
  Manager: {
    institution: ({institution}) => InstitutionDS.findById(institution),
    catequesis: ({id}) => CatequesisDS.find({manager: id})
  },
}

export default resolverManager
