import { CatequistaDS, CatequesisDS, ConfirmanteDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

const resolverManager = {
  Group: {
    catequesis: ({catequesis}) => CatequesisDS.findById(catequesis),
    catequistas: ({id}) => CatequistaDS.find({group: id}),
    confirmantes: ({id}) => ConfirmanteDS.find({group: id}),
  },
}

export default resolverManager
