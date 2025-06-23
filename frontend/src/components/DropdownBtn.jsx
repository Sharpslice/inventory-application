import { useState } from 'react';
import './DropdownBtn.css'

function DropdownBtn({title,data}){
    const [visibility,setVisibility] = useState(false)
    const onHandleClick = ()=>{
        setVisibility(prev => !prev)
        console.log("click")
    }

    const trainerList = data?.map((trainer)=>
                    <li className={visibility?'trainerTiles' : 'trainerTiles hidden'} key = {trainer.id}>
                        {trainer.name}
                    </li>
                    )
    if(!data) return;
    return(
        <>
            
            <button id="dropDownBtn" onClick={onHandleClick}>
                {title}
            </button>
            <ul>
                {trainerList}
            </ul>
                
            
        </>
    )
}

export default DropdownBtn;