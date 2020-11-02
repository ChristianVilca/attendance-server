import { ZONE_HOUR } from '../../entities/_const'

import { AttendanceDS, DateAttendanceDS } from '../../datasources/attendance-mongoDB/db'
import { rejects } from 'assert';

import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

const mutationAttendance = {
  newAttendance: (root, {input}) => {
    const date = new Date()

    const newAttendance = new AttendanceDS({
      date: new Date(new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      )-ZONE_HOUR),
      confirmante: input.confirmante,
      type: input.type
    })

    // ---------- DateAttendanceDS ----------
    /* console.log("date", date)
    console.log("date.getFullYear", date.getFullYear())
    console.log("date.getMonth", date.getMonth())
    console.log("date.getDay", date.getDate()) */

    DateAttendanceDS.find( {
      catequesis: new ObjectId(input.catequesis),
      date: {
        $gte: new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate())-ZONE_HOUR),
        $lt: new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)-ZONE_HOUR-1)
      }
    }, (error, data) => {
      console.log("data", data)
      if(data.length === 0) {
        const newDateAttendance = new DateAttendanceDS({
          date: new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate())-ZONE_HOUR),
          catequesis: input.catequesis,
        })

        newDateAttendance.id = newDateAttendance._id

        new Promise((resolve, object) => {
          newDateAttendance.save((error) => {
            if (error) rejects(error)
            else resolve(newDateAttendance)
          })
        })
      }
    })
    // ---------- End DateAttendanceDS ----------

    newAttendance.id = newAttendance._id

    return new Promise((resolve, object) => {

      newAttendance.save((error) => {
        if (error) rejects(error)
        else resolve(newAttendance)
      })
    })
  }
}

export default mutationAttendance
