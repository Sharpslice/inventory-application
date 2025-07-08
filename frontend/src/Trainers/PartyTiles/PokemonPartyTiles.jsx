
import { RegionContext } from "../../context"

function PokemonPartyTiles({item,onSelectPokemonClick}){

    
    return(
        <>
            <li>
                <div className="tiles" onClick={()=>{onSelectPokemonClick(item)}}>
                    <div className="pokemonTileName">{item.name}</div>
                    <img src={item.sprite} alt="" />
                </div>
            </li>
        
        </>
    )

}

export default PokemonPartyTiles