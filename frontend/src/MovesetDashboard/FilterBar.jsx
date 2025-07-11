import { useState } from 'react';
import DropdownBtn from '../components/DropdownBtn';
import './FilterBar.css'
function FilterBar({originalMoveset,setMoveset}){

    
    const [currentFilteredMoveset,setCurrentFilteredMoveset] = useState(originalMoveset)  

    const resetFilter=()=>{
        setMoveset(originalMoveset)
        setCurrentFilteredMoveset(originalMoveset)
    }
    const offenseFilter =()=>{
          setMoveset(originalMoveset.filter((item)=> item.power !== null && item.damage_class !== 'status'));
          setCurrentFilteredMoveset(originalMoveset)
    }

    
    const supportFilter =()=>{
        setMoveset(originalMoveset.filter((item)=>item.power=== null && item.damage_class === 'status'));
        setCurrentFilteredMoveset(originalMoveset)
    }


    const typeFilter = (type)=>{
        if(type==='any'){
            setMoveset(originalMoveset)
        }
        else{
            setMoveset([...currentFilteredMoveset].filter((item)=>item.type ===type ))
        }
        
    }

    return(
        <div id="filterBar">
           
            <div className='filterBtn'>
                <button onClick={resetFilter}>
                    {'All'}
                </button>
            </div>

             <div className='filterBtn'>
                <button onClick={offenseFilter}>
                    {'Offensive'}
                </button>
            </div>
            
            <div className='filterBtn'>
                <button onClick={()=>supportFilter()}>
                    {'Support'}
                </button>
            </div>
            <div className='filterBtn'>
                <DropdownBtn
                    dropDownTitle={'Types'}

                    valueList={
                        [
                            {id:0,title:'any',function: ()=>typeFilter('any')},
                            {id:1,title:'normal',function: ()=>typeFilter('normal')},
                            {id:2,title:'water',function: ()=>typeFilter('water')},
                        ]
                    }
                />
            </div>

        </div>
    )
}
export default FilterBar