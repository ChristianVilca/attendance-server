import { AttendanceDS, ConfirmanteDS, GroupDS, DateAttendanceDS, CatequesisDS } from '../../datasources/attendance-mongoDB/db'
import Attendance from '../../entities/Attendance'
import AttendanceResume from '../../entities/AttendanceResume'
import { rejects } from 'assert';

import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
let attendance = new Attendance()

const queryAttendance = {
  getAllAttendance: (root) => {
    return new Promise((resolve, object) => {
      AttendanceDS.find({}, (error, registro) => {
        if (error) rejects(error)
        else resolve(registro)
      })
    })
  },
  getAllAttendanceByConfirmante: async (root, { idConfirmante, idCatequesis }) => {

    attendance.setCatequesis(async () => CatequesisDS.findById(idCatequesis))
    attendance.setDates(async () => DateAttendanceDS.find( { catequesis: new ObjectId(idCatequesis) } ))
    attendance.setAttendances(async () => AttendanceDS.find( { confirmante: new ObjectId(idConfirmante) } ))

    const details = await attendance.getDetails()

    return {
      confirmante: ConfirmanteDS.findById(idConfirmante),

      presents: attendance.getPresents(),
      lates: attendance.getLates(),
      absents: attendance.getAbsents(),
      absentsPre: attendance.getAbsentsPre(),
      total: attendance.getLength(),
      details: details
    }
  },
  getResumeAttendances: async (root, { idCatequesis, mounth }) => {

    attendance.setCatequesis(async () => CatequesisDS.findById(idCatequesis))
    attendance.setDates(async () => DateAttendanceDS.find( { catequesis: new ObjectId(idCatequesis) } ))

    let attendanceResume = new AttendanceResume()

    attendanceResume.setGroups(async () => GroupDS.find( { catequesis: new ObjectId(idCatequesis) } ))
    attendanceResume.setConfirmanteDS(async () => ConfirmanteDS.find( {} ))
    attendanceResume.setMounth(mounth)
    attendanceResume.setAttendance(attendance)
    attendanceResume.setAttendanceDS(async () => AttendanceDS.find( {} ))

    await attendanceResume.generate()

    const resumeGroups = attendanceResume.resumeGroups
    const daysByAll = attendanceResume.daysByAll()

    return {
      totalConfirmantes: await attendanceResume.getTotalConfirmantes(),
      //totalAddConfirmantes: attendanceResume.getAddConfirmantes(),
      totalDays: attendanceResume.getTotalDays(),

      daysByAll: daysByAll,

      resumeGroups: resumeGroups,
    }
  },
}

export default queryAttendance
