/* eslint-disable no-unused-vars */

import { RegionContext } from "../../context"
import {motion} from "motion/react"
function PokemonPartyTiles({className,item,onSelectPokemonClick}){

    
    return(
        <>
            <motion.li className='pokemonParty' >
                <div className="pokemonParty__tile" onClick={item?()=>{onSelectPokemonClick(item)}:null}>
                    <div className="pokemonParty_tile-name">
                        {item?item.name:'empty'}
                    </div>
                    {item && <img src={item.sprite} alt="" />}
                </div>
            </motion.li>
        
        </>
    )

}

export default PokemonPartyTiles