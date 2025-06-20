import { useContext } from 'react'
import './PokemonGrid.css'
import { RegionContext } from '../context'
function PokemonTiles({key, pokemon}){

    const {setSelectedPokemon} =useContext(RegionContext)

    const onInfoClick = (pokemon) =>{
        setSelectedPokemon(pokemon)
    }
    return (
        <>
            <div className ="pokemonDiv" key ={key}>
                <img className="sprite" 
                    src={pokemon.sprite} 
                    alt="pokemon sprite" 
                    onClick={()=>onInfoClick(pokemon)}
                />
            </div>
        
        
        
        
        </>
    )

}

export default PokemonTiles