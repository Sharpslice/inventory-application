
import {getTypeIcon} from "./typesToIcon";

function TypesTile({type}){
    return(
        <div  className='typeTile'>
            <div style={{backgroundColor: getTypeIcon(type).color}}>
                <img className='typeImg' style={{backgroundColor: getTypeIcon(type).color}}src={getTypeIcon(type).icon} alt="" />
            </div>
            
            <span className='typeText'>{type.toUpperCase()}</span>
        </div>



    )
}

export default TypesTile;