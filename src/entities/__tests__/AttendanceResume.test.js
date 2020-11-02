import AttendanceResume from '../AttendanceResume.js'
import Attendance from '../Attendance.js'

describe('AttendanceResume', () => {

  const catequesisDS =  {
    hourStart: new Date(2000, 0, 1, 15, 30, 0, 0),
    hourEnd: new Date(2000, 0, 1, 18, 0, 0, 0),
    tolerance: new Date(2000, 0, 1, 0, 0, 10, 0),
  }

  beforeAll(() => {

  });

  test('Presents', async () => {
    //let attendanceResume
    //let attendance

    let attendance = await new Attendance()
    attendance.setCatequesis( async () => catequesisDS )

    let attendanceResume = new AttendanceResume()
    attendance.setDates( async () => [
      { date: new Date(2020, 3, 19, 0, 0, 0, 0) },
      { date: new Date(2020, 3, 26, 0, 0, 0, 0) },
    ] )
    //attendance.setAttendances( async () => [ { date: new Date(2020, 3, 19, 15, 30, 0, 0) } ] )

    attendanceResume.setGroups( async () => [
      {
        _id: "1",
        name: "SAN MATEO"
      },
      {
        _id: "2",
        name: "SAN MARCOS"
      },
      {
        _id: "3",
        name: "SAN LUCAS"
      },
      {
        _id: "4",
        name: "SAN JUAN"
      },
    ] )

    attendanceResume.setConfirmanteDS(async () => [
      {
        _id: "1",
        group: "1"
      },
      {
        _id: "2",
        group: "1"
      },
      {
        _id: "3",
        group: "1"
      },
    ] )

    attendanceResume.setMounth( "Abril" )

    attendanceResume.setAttendance(attendance)
    attendanceResume.setAttendanceDS(async () => [
      {
        confirmante: "1",
        date: new Date(2020, 3, 19, 15, 30, 0, 0)
      },
      {
        confirmante: "2",
        date: new Date(2020, 3, 19, 15, 30, 0, 0)
      },
      {
        confirmante: "3",
        date: new Date(2020, 3, 19, 15, 31, 0, 0)
      },
      {
        confirmante: "1",
        date: new Date(2020, 3, 26, 15, 31, 0, 0)
      },
    ] )

    await attendanceResume.generate()

    expect(await attendanceResume.getTotalConfirmantes()).toBe(3)
    //expect(attendanceResume.getAddConfirmantes()).toBe(1)
    expect(attendanceResume.getTotalDays()).toBe(2)

    const resumeGroups = attendanceResume.resumeGroups

    expect(resumeGroups[0].group.name).toBe("SAN MATEO")
    expect(resumeGroups[0].daysByGroup[0].day).toBe(19)
    expect(resumeGroups[0].daysByGroup[0].presents).toBe(2)
    expect(resumeGroups[0].daysByGroup[1].day).toBe(26)
    expect(resumeGroups[0].daysByGroup[1].presents).toBe(0)
    expect(resumeGroups[1].group.name).toBe("SAN MARCOS")
    expect(resumeGroups[1].daysByGroup[0].day).toBe(19)
    expect(resumeGroups[1].daysByGroup[0].presents).toBe(0)
    expect(resumeGroups[2].group.name).toBe("SAN LUCAS")
    expect(resumeGroups[2].daysByGroup[0].day).toBe(19)
    expect(resumeGroups[2].daysByGroup[0].presents).toBe(0)

    const daysByAll = attendanceResume.daysByAll()

    expect(daysByAll[0].day).toBe(19)
    expect(daysByAll[0].presents).toBe(2)
    expect(daysByAll[0].lates).toBe(1)
    expect(daysByAll[0].absents).toBe(0)
    expect(daysByAll[1].day).toBe(26)
    expect(daysByAll[1].presents).toBe(0)
    expect(daysByAll[1].lates).toBe(1)
    expect(daysByAll[1].absents).toBe(2)

  })

})
