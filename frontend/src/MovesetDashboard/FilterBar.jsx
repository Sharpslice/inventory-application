import './FilterBar.css'
function FilterBar({originalMoveset,moveset,setMoveset,selectedMove}){

    
    const resetFilter=()=>{
        setMoveset(originalMoveset)
    }
    const offenseFilter =()=>{
          setMoveset(moveset.filter((item)=> item.power !== null && item.damage_class !== 'status'));
    }

    
    const supportFilter =()=>{
        console.log('supportFilter button pressed');
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
            

        </div>
    )
}
export default FilterBar