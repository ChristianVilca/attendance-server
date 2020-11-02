import {
  CHECK_PRESENT,
  CHECK_LATE,
  CHECK_ABSENT,
  CHECK_WITHOUT
} from './_const'

import Catequesis from './Catequesis'

export default class Attendance {

  constructor(){
    this.catequesisDS = [];
    this.dateAttendanceDS = [];
    this.attendanceDS = [];
    this.details = []
    this.pastHourEnd = false;
    this.isToday = false;
  }

  setCatequesis(catequesisDS) {
    this.catequesisDS = catequesisDS
  }

  setDates(dateAttendanceDS) {
    this.dateAttendanceDS = dateAttendanceDS
  }

  setAttendances(attendanceDS) {
    this.attendanceDS = attendanceDS
  }

  async getDetails() {
    const dates = await this.dateAttendanceDS()

    this.details = []
    const datesPre = dates.map(x => x.date)

    let index = 0
    // "for of" is the best to async functions
    for (let date of datesPre) {
      const element = await this.getElement(date, ++index)
      this.details.push(element)
    }

    return this.details
  }

  async getElement(date, index) {
    let {firstCheck, lastCheck, description} = await this.typeCheck(date);

    let element = {
      number: index,
      year: this.getYear(date),
      mounth: this.getMounth(date),
      day: this.getDay(date),
      hourStart: firstCheck,
      hourEnd: lastCheck,
      description: description
    }

    return element
  }

  async typeCheck(date) {
    let firstCheck = '';
    let lastCheck = '';
    let description = '';

    let checks = await this.getCkecksByDay(date);
    const catequesis = new Catequesis(await this.catequesisDS());

    this.isToday = (
      `${new Date(date).getFullYear()}
      /${new Date(date).getMonth()}
      /${new Date(date).getDate()}` ===
      `${new Date().getFullYear()}
      /${new Date().getMonth()}
      /${new Date().getDate()}`
    )

    this.pastHourEnd = (new Date().getTime() > catequesis.getHourEnd().getTime())

    catequesis.setDate(date);

    if (checks.length > 1) {
      firstCheck = this.formatAMPM(checks[0]);
      lastCheck = this.formatAMPM(checks.reverse()[0]);
    }
    else if (checks.length === 1) {
      if (checks[0] < catequesis.getHourMiddle()) {
        firstCheck = this.formatAMPM(checks[0]);
        lastCheck = CHECK_WITHOUT;
      }
      else {
        firstCheck = CHECK_WITHOUT;
        lastCheck = this.formatAMPM(checks[0]);
      }
    }

    const dayPreFirstCheck = await this.dayPreFirstCheck(date)

    if (checks.length === 0) {
      if (dayPreFirstCheck) {
        description = ''
      } else {
        description = CHECK_ABSENT
      }

      if ( this.isToday ) {
        if  (!this.pastHourEnd) {
          description = ''
        } else {
          description = CHECK_ABSENT
        }
      }
    }
    else if (checks.length >= 1) {
      description = (new Date(checks[0]) <= catequesis.getHourStart())
        ? CHECK_PRESENT
        : CHECK_LATE;
    }

    return {firstCheck, lastCheck, description};
  }

  async getCkecksByDay(date) {
    const attendances = await this.attendanceDS()
    //console.log("attendances", attendances)

    const fromDate = new Date(date) //new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate())-ZONE_HOUR)
    const toDate = new Date(date)//new Date(date+ONE_DAY)//new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)-ZONE_HOUR-1)
    toDate.setHours(23)
    toDate.setMinutes(59)
    toDate.setSeconds(59)
    toDate.setMilliseconds(999)

    /* console.log("date", this.getDate(date))
    console.log("fromDate", this.getDate(fromDate))
    console.log("toDate", this.getDate(toDate)) */

    return attendances.map(x => x.date).filter((item) => {
      return fromDate.getTime() <= item.getTime() && item.getTime() <= toDate.getTime();
    })
  }

  /* isToday(date) {
    return (
      `${new Date(date).getFullYear()}
      /${new Date(date).getMonth()}
      /${new Date(date).getDate()}` ===
      `${new Date().getFullYear()}
      /${new Date().getMonth()}
      /${new Date().getDate()}`
    )
  } */

  getDate(day){
    const date = new Date(day)
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`
  }

  getMounth(date) {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Setiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ]
    const monthIndex = new Date(date).getMonth()//this.getZoneDate(date).getMonth()//date.getMonth() //
    return months[monthIndex]
  }

  getDay(date) {
    return date.getDate()//this.getZoneDate(date).getDate() //new Date(date).getDate() + 1 //new Date(Math.abs(date)+ZONE_HOUR).getDate()
  }

  getYear(date) {
    return date.getFullYear()//this.getZoneDate(date).getDate() //new Date(date).getDate() + 1 //new Date(Math.abs(date)+ZONE_HOUR).getDate()
  }

  formatAMPM(check) {
    var date = new Date(check)//check.getDate()//this.getZoneDate(check)//new Date(Math.abs(check)+ZONE_HOUR)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime.toUpperCase();
  }

  getPresents() {
    return this.details.filter(x => x.description === CHECK_PRESENT ).length
  }

  getLates() {
    return this.details.filter(x => x.description === CHECK_LATE ).length
  }

  getAbsents() {
    return this.details.filter(x => x.description === CHECK_ABSENT ).length
  }

  getAbsentsPre () {
    const absentsPre = this.details.filter(x => x.description === '' )
    if ( this.isToday && !this.pastHourEnd) {
      return absentsPre.length - 1
    }
    return absentsPre.length
  }

  getLength() {
    if ( this.isToday && !this.pastHourEnd) {
      return this.details.length - 1
    }
    return this.details.length
  }

  async dayPreFirstCheck (date) {
    const attendances = await this.attendanceDS()

    if (attendances.length === 0) return true
    const firstAttendance = new Date(attendances[0].date)
    firstAttendance.setHours(0)
    firstAttendance.setMinutes(0)
    firstAttendance.setSeconds(0)
    firstAttendance.setMilliseconds(0)

    return ( date.getTime() < firstAttendance.getTime() )
  }
}

