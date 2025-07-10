import { useState } from "react"
import DropdownBtn from "../components/DropdownBtn"

function SortBtn({moveset,setMoveset}){
    const [visibility,setVisibility] = useState(false)
    const onHandleClick = ()=>{
        setVisibility(prev => !prev)
        
    }

    const sortAlphabetical=()=>{
        
        setMoveset([...moveset].sort((a,b)=> (a.name).localeCompare(b.name)))
        
    }
    const sortPower=()=>{
        setMoveset([...moveset].sort((a,b)=> a.power - b.power))
    }
    //get typeToNum function to compare. id:1, type: normal
    const sortType=()=>{
        setMoveset([...moveset].sort((a,b)=> (a.type).localeCompare(b.type)))
    }
 
    return(
        <>
            <DropdownBtn
                dropDownTitle = {'sort'}
                listClassName = {'sortList'}
                valueList ={
                    [   {id:1,title:'Alphabetical',function: sortAlphabetical },
                        {id:2,title:'Power',function: sortPower },
                        {id:3,title: 'Type', function: sortType}
                        
                    ]
                }
            
            />
            {/* <div id = 'dropDownMenu'>
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
                        
                        <button onClick={sortPower}>
                            {'Power'}
                        </button>
                        
                    </li>

                </ul>
            </div> */}
            
                
            
        </>
    )
}

export default SortBtn;