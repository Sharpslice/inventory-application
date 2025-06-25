
import { RegionContext } from "../context"

function PokemonPartyTiles({item,onSelectPokemonClick}){

    
    return(
        <>
            <li>
                <div className="tiles" onClick={()=>{onSelectPokemonClick(item)}}>
                    <span>{item.name}s</span>
                    
                </div>
            </li>
        
        </>
    )

}

export default PokemonPartyTiles