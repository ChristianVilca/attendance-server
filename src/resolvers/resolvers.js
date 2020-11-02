import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'})

import queryUser from './userResolver/queryUser';
import queryConfirmante from './confirmanteResolver/queryConfirmante';
import queryGroup from './groupResolver/queryGroup';
import queryAttendance from './attendanceResolver/queryAttendance';
import queryInstitution from './institutionResolver/queryInstitution';
import queryManager from './managerResolver/queryManager';
import queryCatequesis from './catequesisResolver/queryCatequesis';
import queryCatequista from './catequistaResolver/queryCatequista';

import mutationUser from './userResolver/mutationUser';
import mutationConfirmante from './confirmanteResolver/mutationConfirmante';
import mutationGroup from './groupResolver/mutationGroup';
import mutationAttendance from './attendanceResolver/mutationAttendance';
import mutationInstitution from './institutionResolver/mutationInstitution';
import mutationManager from './managerResolver/mutationManager';
import mutationCatequesis from './catequesisResolver/mutationCatequesis';
import mutationCatequista from './catequistaResolver/mutationCatequista';

import resolverConfirmante from './confirmanteResolver/resolverConfirmante';
import resolverGroup from './groupResolver/resolverGroup';
import resolverAttendance from './attendanceResolver/resolverAttendance';
import resolverManager from './managerResolver/resolverManager';
import resolverCatequesis from './catequesisResolver/resolverCatequesis';
import resolverCatequista from './catequistaResolver/resolverCatequista';

export const resolvers = {
  Query: {
    ...queryUser,
    ...queryConfirmante,
    ...queryGroup,
    ...queryAttendance,
    ...queryInstitution,
    ...queryManager,
    ...queryCatequesis,
    ...queryCatequista,
  },
  Mutation: {
    ...mutationUser,
    ...mutationConfirmante,
    ...mutationGroup,
    ...mutationAttendance,
    ...mutationInstitution,
    ...mutationManager,
    ...mutationCatequesis,
    ...mutationCatequista,
  },
  ...resolverManager,
  ...resolverCatequesis,
  ...resolverGroup,
  ...resolverConfirmante,
  ...resolverAttendance,
  ...resolverCatequista,
}
