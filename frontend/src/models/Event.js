/**
 * Assumptions: 
 * - min event length is 15mins and must starts at 15 minute intervals
 */
export default class Event {
    empty = true;
    start = {'date': null, 'hour': null, 'mins': null};
    end = {'date': null, 'hour': null, 'mins': null};
    name = '####';
    id = -1;

    /**
     * Defines if the event space is filled or not
     * @param {boolean} empty
     * @param {string} start 
     * @param {string} end 
     * @param {string} name  
     */
    constructor(empty, start, end, name) {
        this.empty = empty;
        if (!empty) {
            this.id = Math.floor(Math.random() * 100000);
            this.setEventValues(start, end, name);
        }
    }    

    setEmpty(empty) {
        this.id = empty ? -1 : Math.floor(Math.random() * 100000);
        this.empty = empty;
    }

    /**
     * Sets the events values 
     * @param {string} start start time
     * @param {string} end end time
     * @param {string} name name of event
     */
    setEventValues(start, end, name) {
        this.start = this.extractTimeValues(start);
        this.end = this.extractTimeValues(end);
        this.name = name;
        
        // Not occuring on the same day
        if (this.start['date'] > this.end['date']) {
            console.log('[Error] => Event does not start/end on the same day');
        }
    }

    /**
     * Extracts the hour and minutes of the time and sets desired time value 
     * @param {Object} value 
     * @param {string} time 
     */
    extractTimeValues(time) {
        const date = time.substring(0, time.indexOf('T'));
        const initTime = time.substring(time.indexOf('T')+1, time.length).split(':');
        const hour = parseInt(initTime[0]);
        const mins = parseInt(initTime[1]);
        return {'date': date, 'hour': hour, 'mins': mins};
    }

    generateUI() {

    }
}

