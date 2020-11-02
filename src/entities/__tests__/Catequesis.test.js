import { ZONE_HOUR } from '../_const'
import Catequesis from '../Catequesis'

describe('Attendance - Check', () => {
  let catequesis

  const catequesisDS =  {
    hourStart: new Date(2000, 0, 1, 15, 30, 0, 0),
    hourEnd: new Date(2000, 0, 1, 18, 0, 0, 0),
    tolerance: new Date(2000, 0, 1, 0, 10, 0, 0),
  }

  beforeAll(() => {
    catequesis = new Catequesis(catequesisDS)
    catequesis.setDate(new Date(2020,3,19))
  });

  test('getHourStart()', () => {
    expect(catequesis.getDate(catequesis.getHourStart())).toBe("2020/4/19 15:30:0:0")
  })

  test('getHourEnd()', () => {
    expect(catequesis.getDate(catequesis.getHourEnd())).toBe("2020/4/19 18:0:0:0")
  })

  test('getHourMiddle()', () => {
    expect(catequesis.getDate(catequesis.getHourMiddle())).toBe("2020/4/19 16:45:0:0")
  })

  test('getTolerance()', () => {
    expect(catequesis.getDate(catequesis.getTolerance())).toBe("2020/4/19 0:10:0:0")
  })
})
