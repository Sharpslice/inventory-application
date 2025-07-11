import { useState } from 'react';
import DropdownBtn from '../components/DropdownBtn';
import './FilterBar.css'
import { getTypeArray } from '../PokemonInfo/Types/typesToIcon';
function FilterBar({originalMoveset,setMoveset}){

    
    const [currentFilteredMoveset,setCurrentFilteredMoveset] = useState(originalMoveset)  


    const getTypesList =()=>{
        const typeList = getTypeArray().map((type,index)=>{
            return {id:index+1,title:type,function: ()=>typeFilter(type)}
        })
        typeList.unshift({id:0,title:'any',function: ()=>typeFilter('any')})
        
        return typeList
    }



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
                        getTypesList()
                    }
                />
            </div>

        </div>
    )
}
export default FilterBar