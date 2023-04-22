/**
 * 
 * @param {Object} props 
 * @returns 
 */
export default function Event (props) {
    return (
        <div className='event' style={{'height':props.value['pixelHeight']}}>
            <h3>{props.value['name']}</h3>
        </div>
    )
}