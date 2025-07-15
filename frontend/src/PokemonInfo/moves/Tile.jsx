
import { getTypeIcon } from "../Types/typesToIcon"


function Tile({id,move,selectedTileId,setSelectedTileId}){

    
    const onSelectClick=()=>{
        setSelectedTileId(prev=>prev===id?null:id)
        
        console.log(id)
    }

    return(
        
        <div className={selectedTileId===id?'moveset-panel__tile highlighted':'moveset-panel__tile'} 
            style={{backgroundColor: move?getTypeIcon(move.type).color:'white' }} onClick={onSelectClick}>

            {move?<div className="moveset-panel__tile-icon">
                <img src={getTypeIcon(move.type).icon} alt="" />
            </div>:null}
            <span className="moveset-panel__tile-text" style={{color: move?'white':'black'}}>
                {move? move.name:'empty'}
            </span>

        </div>
       
        
    )
}
export default Tile