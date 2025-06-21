import { useContext } from 'react'
import './PokemonGrid.css'
import { RegionContext } from '../context'
function PokemonTiles({ pokemon,onSelectClick}){

    const {selectedPokemon} = useContext(RegionContext)
    
    return (
        <>
            <div className ={selectedPokemon?.id === pokemon.id ? "pokemonDiv selected" :"pokemonDiv"} onClick={()=>onSelectClick(pokemon)} >
                <img className="sprite" 
                    src={pokemon.sprite} 
                    alt="pokemon sprite" 
                />         
            </div>
        
        
        
        
        </>
    )

}

export default PokemonTiles