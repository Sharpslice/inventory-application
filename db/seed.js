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
    moveList = fetchMoves();
    //pokemonList = fetchPokemon();

}



fetchPokemonMoveSet();