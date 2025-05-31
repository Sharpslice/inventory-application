const axios = require("axios");

async function fetchPokedex(region){
    const pokedex = await axios.get( `https://pokeapi.co/api/v2/pokedex/${region}`)
    

    const pokemonList = await Promise.all(
        pokedex.data.pokemon_entries.map(async(pokemon)=>{
            
            return (
                {name: pokemon.pokemon_species.name}
            )


        })


    );
    
    return pokemonList
}




async function fetchPokemon(region){
    const pokemonList = await fetchPokedex(region);

    const getPokemonData= async (name) => {
        try{
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            return response.data;
        }
        catch{
            return null;
        }
        
        
    }
    
     const data = await Promise.all(
        pokemonList.map(async(pokemon)=>{
            const pokemonData = await getPokemonData(pokemon.name)
            if(!pokemonData) return null;
            return ({
                api_id: pokemonData.id,
                name: pokemonData.name,
                type: pokemonData.types[0].type.name,
                sprite: pokemonData.sprites.front_default
            })
        })
    );

    console.log(data)

    return data.filter(Boolean)
}

async function fetchMoves (limit = 5){
    const moveList = await axios.get(`https://pokeapi.co/api/v2/move?limit=${limit}`);
    
    const getMovesData = async(name) =>{
        const response = await axios.get(`https://pokeapi.co/api/v2/move/${name}`)
        //console.log(response.data.type.name)
        return response.data;

    }
     const data = await Promise.all(
        moveList.data.results.map(async(move) => {
            const moveData = await getMovesData(move.name);
            return({
                    name: moveData.name, 
                    type: moveData.type.name,
                    power: moveData.power,
                    damage_class: moveData.damage_class.name,
                })
        }

     ));
     console.log(data)
     return data;
}

async function fetchPokemonMoveSet(){
    //moveList = fetchMoves();
    pokemonList = fetchPokemon('original-sinnoh');
    //fetchPokedex();
}



fetchPokemonMoveSet();