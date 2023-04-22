import Event from '../models/Event.js';

export default class Calendar {
    static rows = 32;
    static cols = 7;
    static calendar = Calendar.initCalendar();
    // initCalendar();

    constructor() {
        Calendar.calendar = this.initCalendar();
    }

    static initCalendar() {
        let days = [];
        for (let i=0; i<this.cols; i++) {
            let hours = [];
            for (let j=0; j<this.rows; j++) {
                hours.push(new Event(true, null, null, null));
            }
            days.push(hours);
        }
        return days
    }

    /**
     * Adds an event into the Calendar
     * @param {Event} event 
     */
    static addEvent(event) {
        if (Calendar.calendar === undefined || Calendar.calendar.length == 0) {
            Calendar.calendar = Calendar.initCalendar();
        }

        const startIndex = (event.start.hour - 9) * 4 + Math.ceil(event.start.mins / 15) - 1;
        const endIndex = (event.end.hour - 9) * 4 + Math.ceil(event.end.mins / 15) - 1;
        const dayOfWeek = this.getDayOfWeek(event.start.date);

        const day = Calendar.calendar[dayOfWeek];
        
        let valid = true;
        for (let i=startIndex+1; i<=endIndex; i++) {
            if (!day[i].empty) {
                valid = false;
            }
        }

        if (valid) {
            for (let i=startIndex+1; i<=endIndex; i++) {
                day[i] = event;
            }
        } else {
            console.log('Event Could Not Be Added')
        }

    }

    // Accepts a Date object or date string that is recognized by the Date.parse() method
    static getDayOfWeek(date) {
        const dayOfWeek = new Date(date).getDay(); 
        return isNaN(dayOfWeek) ? null : dayOfWeek;
    }

}