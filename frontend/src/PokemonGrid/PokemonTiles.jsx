import './PokemonGrid.css'
function PokemonTiles({key, pokemon}){
    const onInfoClick = () =>{
        console.log(pokemon)
    }
    return (
        <>
            <div className ="pokemonDiv" key ={key}>
                <img className="sprite" 
                    src={pokemon.sprite} 
                    alt="pokemon sprite" 
                    onClick={onInfoClick}
                />
            </div>
        
        
        
        
        </>
    )

}

export default PokemonTiles