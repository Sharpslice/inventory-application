import { useState } from 'react';
import './DropdownBtn.css'

function DropdownBtn({title,data}){
    const [visibility,setVisibility] = useState(false)
    const onHandleClick = ()=>{
        setVisibility(prev => !prev)
        console.log("click")
    }
    if(!data) return;
    return(
        <>
            <div id="dropDownBtn">
                <button onClick={onHandleClick}>
                    {title}
                </button>
                <ul>
                    {data.map((trainer)=>
                    <li className={visibility?'trainerTiles' : 'trainerTiles hidden'} key = {trainer.id}>
                        {trainer.name}
                    </li>
                )}
                </ul>
                
            </div>
        </>
    )
}

export default DropdownBtn;