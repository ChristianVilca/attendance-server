import {
  CHECK_PRESENT,
  CHECK_LATE,
  CHECK_ABSENT,
} from './_const'

export default class AttendanceResume {

  constructor(){
    this.groups = [];
    this.confirmanteDS = [];
    this.attendance = null;
    this.attendanceDS = [];

    this.mounth = ""
    this.days = []
    this.resumeGroups = []
    this.descriptionDay = []
  }

  setGroups(groups) {
    this.groups = groups
  }

  setConfirmanteDS(confirmanteDS) {
    this.confirmanteDS = confirmanteDS
  }

  setMounth(mounth) {
    this.mounth = mounth
  }

  setAttendance(attendance) {
    this.attendance = attendance
  }

  setAttendanceDS(attendanceDS) {
    this.attendanceDS = attendanceDS
  }

  async getAttendanceDS(idConfirmante) {
    const attendanceDS = await this.attendanceDS()
    return async () => attendanceDS.filter(item => item.confirmante === idConfirmante)
  }

  async getTotalConfirmantes() {
    const confirmanteDS = await this.confirmanteDS()
    return confirmanteDS.length
  }

  getAddConfirmantes() {

  }

  getTotalDays() {
    return this.days.length
  }

  daysByAll() {
    let daysByAll = []

    for (let day of this.days) {
      let presents = 0
      let lates = 0
      let absents = 0
      for (let group of this.resumeGroups) {
        const oneDay = group.daysByGroup.find(item => item.day === day)
        presents = presents + oneDay.presents
        lates = lates + oneDay.lates
        absents = absents + oneDay.absents
      }
      let element = {
        day,
        presents: presents,
        lates: lates,
        absents: absents
      }
      daysByAll.push(element)
    }
    //console.log("daysByAll", daysByAll)

    return daysByAll
  }

  async generate() {
    const groups = await this.groups()
    const confirmanteDS = await this.confirmanteDS()

    this.resumeGroups = []
    let days = []

    for (let group of groups) {
      let daysByGroup = []
      const confirmantes = confirmanteDS.filter(confirmante => confirmante.group + "" === group._id + "" )
      let daysByConfirmante = await this.daysByConfirmante(confirmantes, days);

      this.daysByGroup(days, daysByConfirmante, daysByGroup);

      this.days = days

      this.resumeGroups.push({group: group, daysByGroup: daysByGroup})
    }
  }

  daysByGroup(days, daysByConfirmante, daysByGroup) {
    for (let day of days) {
      const oneDay = daysByConfirmante.filter(item => item.day === day);
      let element = {
        day,
        presents: oneDay.filter(item => item.description === CHECK_PRESENT).length,
        lates: oneDay.filter(item => item.description === CHECK_LATE).length,
        absents: oneDay.filter(item => item.description === CHECK_ABSENT).length
      };
      daysByGroup.push(element);
    }
  }

  async daysByConfirmante(confirmantes, days) {
    let daysByConfirmante = [];
    for (let confirmante of confirmantes) {
      this.attendance.setAttendances(await this.getAttendanceDS(confirmante._id));
      const attendances = await this.attendance.getDetails();
      const details = attendances.filter(attendance => attendance.mounth === this.mounth);
      for (let detail of details) {
        if (days.filter(day => day === detail.day).length === 0)
          days.push(detail.day);
        let element = {
          day: detail.day,
          description: detail.description
        };
        daysByConfirmante.push(element);
      }
    }
    return daysByConfirmante;
  }
}
