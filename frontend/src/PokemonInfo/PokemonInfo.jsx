import { useContext, useEffect } from "react"
import "./PokemonInfo.css"
import { RegionContext } from "../context"
import axios from "axios"


function PokemonInfo(){

    const {selectedPokemon} = useContext(RegionContext) 
    useEffect(()=>{
        const getType = async() =>{
            try{
                const result = await axios.get(`http://localhost:3000/api/region/pokemon/${selectedPokemon.id}`);
                console.log(result.data)
                return result.data;
            }catch(error){
                console.log(`failed to fetch ${selectedPokemon}'s type`,error)
            }
    }
    if(!selectedPokemon)return;
    getType();
    },[selectedPokemon])
    

    if(!selectedPokemon) return;
    return (
    <div id="pokemonInfo">
       <header>
            {selectedPokemon.name}
       </header>
        
    
    
    
    
    </div>  
    )


}

export default PokemonInfo