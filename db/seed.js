const axios = require("axios");


async function fetchPokemon(limit=50){
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);

    const getPokemonApiID = async (name) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        return response.data.id;
    }
    
     const data = await Promise.all( response.data.results.map(async(pokemon) =>(
        {name: pokemon.name, api_id: await getPokemonApiID(pokemon.name) }
    )));
    console.log(data)

    return response.data.results
}

async function fetchMoves (limit = 2){
    const response = await axios.get(`https://pokeapi.co/api/v2/move?limit=${limit}`);
    
    const moveList = response.data.results;
    

    for(const {name} of moveList){
        const response = await axios.get(`https://pokeapi.co/api/v2/move/${name}`)
        //console.log(response.data.learned_by_pokemon)
    }

    return moveList;
}

async function fetchPokemonMoveSet(){
    //moveList = fetchMoves();
    pokemonList = fetchPokemon();

}



fetchPokemonMoveSet();