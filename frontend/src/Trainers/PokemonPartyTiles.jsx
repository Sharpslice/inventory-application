
import { RegionContext } from "../context"

function PokemonPartyTiles({item,onSelectPokemonClick}){

    
    return(
        <>
            <li>
                <div className="tiles" onClick={()=>{onSelectPokemonClick(item)}}>
                    {item.name}
                   
                </div>
            </li>
        
        </>
    )

}

export default PokemonPartyTiles