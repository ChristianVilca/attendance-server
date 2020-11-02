import mongoose from "mongoose"; //ORM
import config from '../../index.config'

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.NODE_APP_MONGO_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  }
)
.then(() => console.log('DB Connected!'))
.catch(err => {
  console.log(`DB Connection Error: ${err.message}`);
});

import UserDS from './models/UserDS'
import ConfirmanteDS from './models/ConfirmanteDS'
import GroupDS from './models/GroupDS'
import AttendanceDS from './models/AttendanceDS'
import InstitutionDS from './models/InstitutionDS'
import ManagerDS from './models/ManagerDS'
import CatequesisDS from './models/CatequesisDS'
import CatequistaDS from './models/CatequistaDS'
import DateAttendanceDS from './models/DateAttendanceDS'

export {
  UserDS,
  ConfirmanteDS,
  GroupDS,
  AttendanceDS,
  InstitutionDS,
  ManagerDS,
  CatequesisDS,
  CatequistaDS,
  DateAttendanceDS,
}
