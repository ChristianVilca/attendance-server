import { ZONE_HOUR } from './_const'

export default class Catequesis {
	constructor(catequesisDS) {
		this.catequesisDS = catequesisDS;
    //console.log("catequesisDS", catequesisDS)
		this.date = new Date();
  }

  setDate(date) {
    this.date = date
  }

  getHourStart() {
    //return this.catequesisDS.hourStart
    const hourStart = new Date(this.catequesisDS.hourStart)
    return new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
        hourStart.getHours(),
        hourStart.getMinutes(),
        hourStart.getMilliseconds()
      )
  }

  getHourEnd() {
    //return this.catequesisDS.hourEnd
    const hourEnd = new Date(this.catequesisDS.hourEnd)
    return new Date(
      new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
        hourEnd.getHours(),
        hourEnd.getMinutes(),
        hourEnd.getMilliseconds()
      ) - ZONE_HOUR)
  }

  getTolerance() {
    //return this.catequesisDS.hourEnd
    const tolerance = new Date(this.catequesisDS.tolerance)
    return new Date(
      new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
        tolerance.getHours(),
        tolerance.getMinutes(),
        tolerance.getMilliseconds()
      ) - ZONE_HOUR)
  }

  getHourMiddle() {
    const day = new Date(this.date)
    const hour = new Date(
      Math.abs(
        new Date(this.getHourStart()).getTime() +
        Math.abs(
          ( this.getHourEnd().getTime() - this.getHourStart().getTime() ) / 2
        )
      )
    )

    return new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),

      hour.getHours(),
      hour.getMinutes(),
      hour.getSeconds(),
      hour.getMilliseconds()
    )
  }

  getDate(day){
    const date = new Date(day)
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`
  }
}
