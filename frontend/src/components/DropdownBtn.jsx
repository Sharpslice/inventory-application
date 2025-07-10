import { useState } from 'react';
import './DropdownBtn.css'

function DropdownBtn({moveset,setMoveset}){
    const [visibility,setVisibility] = useState(false)
    const onHandleClick = ()=>{
        setVisibility(prev => !prev)
        
    }

    const sortAlphabetical=()=>{
        console.log(moveset)
        setMoveset([...moveset].sort((a,b)=> (a.name).localeCompare(b.name)))
        console.log('Sorted alphabetically')
        console.log(moveset)
    }

    return(
        <>
            <div id = 'dropDownMenu'>
                <button className="dropDownBtn" onClick={onHandleClick}>
                    {'Sort'}
                </button>
                <ul className={visibility? 'sortList': 'sortList hidden'}>
                    <li>
                        
                        <button onClick={sortAlphabetical}>
                            {'Alphabetical'}
                        </button>
                        
                    </li>
                    <li>
                        
                        <button >
                            {'Power'}
                        </button>
                        
                    </li>

                </ul>
            </div>
            
                
            
        </>
    )
}

export default DropdownBtn;