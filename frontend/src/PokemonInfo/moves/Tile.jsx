
import { getTypeIcon } from "../Types/typesToIcon"


function Tile({id,move,setSelectedTile}){

    
    const onSelectClick=()=>{
        setSelectedTile(id)
        
    }

    return(
        
        <div className={'moveset-panel__tile'} style={{backgroundColor: move?getTypeIcon(move.type).color:'white' }} onClick={onSelectClick}>
            <span className="moveset-panel__tile-text" style={{color: move?'white':'black'}}>
                {move? move.name:'empty'}
            </span>

        </div>
       
        
    )
}
export default Tile