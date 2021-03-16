import { ROLE_MASTER, ROLE_INSTITUTION } from '../roles'
import { InstitutionDS } from '../../datasources/attendance-mongoDB/db'

const queryInstitution = {
  getInstitutionList: (root, { filter, limit }, {userCurrent}) => {
    if ( !userCurrent || !userCurrent.roles.includes(ROLE_MASTER)) return null
    return InstitutionDS.find({name: {$regex: ".*" + filter + ".*"}}).limit(limit)
  },
  getInstitutionById: async (root, { id }, {userCurrent}) => {
    //if ( !userCurrent || !userCurrent.roles.includes(ROLE_MASTER)) return null
    return await InstitutionDS.findById( id )
  },
  getInstitution: async (root, args, {userCurrent}) => {
    //if ( !userCurrent || !userCurrent.roles.includes(ROLE_INSTITUTION)) return null
    return await InstitutionDS.findById( userCurrent.id )
  },
}

export default queryInstitution
