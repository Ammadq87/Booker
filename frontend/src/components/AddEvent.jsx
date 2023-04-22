import { useState } from 'react'
import Calendar from '../models/Calendar.js';
import Event from '../models/Event.js';

export default function AddEvent () {
    const [startTime, setStartTime] = useState(1);
    const [endTime, setEndTime] = useState(1);
    const [name, setName] = useState('Unknown Event');
    const [events, setEvents] = useState([]);

    function handleName(e) {
        setName(e.target.value);
    }

    function handleStartTime(e){
        setStartTime(e.target.value);
    }

    function handleEndTime(e){
        setEndTime(e.target.value);
    }

    function addToEvents() {
        if (endTime > startTime) {
            const event = new Event(false, startTime, endTime, name)
            // setEvents([...events, event])
            Calendar.addEvent(event)
        }
        console.log(Calendar.calendar)
    }

    return (
        <div className='functions'>
            <input type="text" placeholder='Event...' onChange={handleName}/>
            <input type='datetime-local' onChange={handleStartTime} placeholder='Start'/>
            <input type='datetime-local' onChange={handleEndTime} placeholder='End'/>
            <button onClick={addToEvents}>Add</button>
        </div>
    )
}