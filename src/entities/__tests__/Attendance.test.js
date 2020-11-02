import {
  CHECK_PRESENT,
  CHECK_LATE,
  CHECK_ABSENT,
  CHECK_WITHOUT
} from '../_const'
import Attendance from '../Attendance.js'

describe('Attendance - Check', () => {
  let attendance

  const catequesisDS =  {
    hourStart: new Date(2000, 0, 1, 15, 30, 0, 0),
    hourEnd: new Date(2000, 0, 1, 18, 0, 0, 0),
    tolerance: new Date(2000, 0, 1, 0, 0, 10, 0),
  }

  beforeAll(() => {
    attendance = new Attendance()
    attendance.setCatequesis( async () => catequesisDS )
  });

  test('Presents', async () => {
    attendance.setDates( async () => [ { date: new Date(2020, 3, 19, 0, 0, 0, 0) } ] )
    attendance.setAttendances( async () => [ { date: new Date(2020, 3, 19, 15, 30, 0, 0) } ] )

    const details = await attendance.getDetails()

    expect(attendance.getPresents()).toBe(1)
    expect(attendance.getLates()).toBe(0)
    expect(attendance.getAbsents()).toBe(0)
    expect(attendance.getAbsentsPre()).toBe(0)
    expect(attendance.getLength()).toBe(1)

    expect(details[0].number).toBe(1)
    expect(details[0].mounth).toBe("Abril")
    expect(details[0].day).toBe(19)
    expect(details[0].hourStart).toBe("3:30 PM")
    expect(details[0].hourEnd).toBe(CHECK_WITHOUT)
    expect(details[0].description).toBe(CHECK_PRESENT)
  });

  test('Lates', async () => {
    attendance.setDates( async () => [ { date: new Date(2020, 3, 19, 0, 0, 0, 0) } ] )
    attendance.setAttendances( async () => [ { date: new Date(2020, 3, 19, 15, 31, 0, 0) } ] )

    const details = await attendance.getDetails()

    expect(attendance.getPresents()).toBe(0)
    expect(attendance.getLates()).toBe(1)
    expect(attendance.getAbsents()).toBe(0)
    expect(attendance.getAbsentsPre()).toBe(0)
    expect(attendance.getLength()).toBe(1)

    expect(details[0].number).toBe(1)
    expect(details[0].mounth).toBe("Abril")
    expect(details[0].day).toBe(19)
    expect(details[0].hourStart).toBe("3:31 PM")
    expect(details[0].hourEnd).toBe(CHECK_WITHOUT)
    expect(details[0].description).toBe(CHECK_LATE)
  });

  test('Absents', async () => {
    attendance.setDates( async () => [ { date: new Date(2020, 3, 19, 0, 0, 0, 0) }, { date: new Date(2020, 3, 26, 0, 0, 0, 0) }  ] )
    attendance.setAttendances( async () => [ { date: new Date(2020, 3, 19, 15, 30, 0, 0) } ] )

    const details = await attendance.getDetails()

    expect(attendance.getPresents()).toBe(1)
    expect(attendance.getLates()).toBe(0)
    expect(attendance.getAbsents()).toBe(1)
    expect(attendance.getAbsentsPre()).toBe(0)
    expect(attendance.getLength()).toBe(2)

    expect(details[1].number).toBe(2)
    expect(details[1].mounth).toBe("Abril")
    expect(details[1].day).toBe(26)
    expect(details[1].hourStart).toBe("")
    expect(details[1].hourEnd).toBe("")
    expect(details[1].description).toBe(CHECK_ABSENT)
  });

  test('Absents Pre', async () => {
    attendance.setDates( async () => [ { date: new Date(2020, 3, 12, 0, 0, 0, 0) }, { date: new Date(2020, 3, 19, 0, 0, 0, 0) } ] )
    attendance.setAttendances( async () => [ { date: new Date(2020, 3, 19, 15, 30, 0, 0) } ] )

    const details = await attendance.getDetails()

    expect(attendance.getPresents()).toBe(1)
    expect(attendance.getLates()).toBe(0)
    expect(attendance.getAbsentsPre()).toBe(1)
    expect(attendance.getAbsents()).toBe(0)
    expect(attendance.getLength()).toBe(2)

    expect(details[0].number).toBe(1)
    expect(details[0].mounth).toBe("Abril")
    expect(details[0].day).toBe(12)
    expect(details[0].hourStart).toBe("")
    expect(details[0].hourEnd).toBe("")
    expect(details[0].description).toBe("")
  });

  /* test('Absents Pre - hoy: Prehora', async () => {

    const catequesis =  {
      hourStart: new Date(2000, 0, 1, 14, 5, 0, 0),
      hourEnd: new Date(2000, 0, 1, 21, 0, 0, 0),
      tolerance: new Date(2000, 0, 1, 0, 0, 10, 0),
    }

    attendance.setCatequesis( async () => catequesis )

    attendance.setDates( async () => [ { date: new Date(2020, 3, 19, 0, 0, 0, 0) }, { date: new Date(2020, 3, 27, 0, 0, 0, 0) } ] )
    attendance.setAttendances( async () => [ { date: new Date(2020, 3, 19, 14, 0, 0, 0) } ] )

    const details = await attendance.getDetails()

    expect(attendance.getPresents()).toBe(1)
    expect(attendance.getLates()).toBe(0)
    expect(attendance.getAbsentsPre()).toBe(0)
    expect(attendance.getAbsents()).toBe(0)
    expect(attendance.getLength()).toBe(1)

    expect(details[1].number).toBe(2)
    expect(details[1].mounth).toBe("Abril")
    expect(details[1].day).toBe(27)
    expect(details[1].hourStart).toBe("")
    expect(details[1].hourEnd).toBe("")
    expect(details[1].description).toBe("")
  });

  test('Absents Pre - hoy: Posthora', async () => {

    const catequesis =  {
      hourStart: new Date(2000, 0, 1, 20, 5, 0, 0),
      hourEnd: new Date(2000, 0, 1, 20, 40, 0, 0),
      tolerance: new Date(2000, 0, 1, 0, 0, 10, 0),
    }

    attendance.setCatequesis( async () => catequesis )

    attendance.setDates( async () => [ { date: new Date(2020, 3, 19, 0, 0, 0, 0) }, { date: new Date(2020, 3, 27, 0, 0, 0, 0) } ] )
    attendance.setAttendances( async () => [ { date: new Date(2020, 3, 19, 15, 30, 0, 0) } ] )

    const details = await attendance.getDetails()

    expect(attendance.getPresents()).toBe(1)
    expect(attendance.getLates()).toBe(0)
    expect(attendance.getAbsentsPre()).toBe(0)
    expect(attendance.getAbsents()).toBe(1)
    expect(attendance.getLength()).toBe(2)

    expect(details[1].number).toBe(2)
    expect(details[1].mounth).toBe("Abril")
    expect(details[1].day).toBe(27)
    expect(details[1].hourStart).toBe("")
    expect(details[1].hourEnd).toBe("")
    expect(details[1].description).toBe(CHECK_ABSENT)
  }); */
});

