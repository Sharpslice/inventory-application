import { useContext, useEffect, useState } from "react"
import "./PokemonInfo.css"
import "./StatsTile.css"
import { RegionContext } from "../context"
import axios from "axios"
import TypesTile from "./TypesTile"
import StatsTile from "./StatsTile"
import DisplayTile from "./DisplayTile"


function PokemonInfo(){

    const {selectedPokemon} = useContext(RegionContext) 
    const [types,setTypes] = useState(null)
    useEffect(()=>{
        const getType = async() =>{
            try{
                const result = await axios.get(`http://localhost:3000/api/region/pokemon/${selectedPokemon.id}`);
                console.log(result.data)

                setTypes(result.data);
            }catch(error){
                console.log(`failed to fetch ${selectedPokemon}'s type`,error)
            }
    }
    if(!selectedPokemon)return;
    getType();
    },[selectedPokemon])
    

    if(!selectedPokemon) return;
    if(!types) return;
    return (
    <div id="pokemonInfo">
       <header>
            {selectedPokemon.name}
       </header>
       <div id ="typePanel">
            {selectedPokemon.api_id}
            {
                types.map((obj,index)=>{
                    return <TypesTile key={`${obj.type}-${index}`} type ={obj.type}/>
                })
            }
       </div>
       <div id="displayPanel">
            <DisplayTile sprite={selectedPokemon.sprite}/>
       </div>
       <div id ='statsPanel'>
           {<StatsTile title = {'HP'} stat={selectedPokemon.hp}/>}
           {<StatsTile title = {'ATTACK'} stat={selectedPokemon.attack}/>}
           {<StatsTile title = {'DEFENSE'} stat={selectedPokemon.defense}/>}
           {<StatsTile title = {'SP. AT'} stat={selectedPokemon.special_attack}/>}
           {<StatsTile title = {'SP. DEF'} stat={selectedPokemon.special_defense}/>}
           {<StatsTile title = {'SPEED'} stat={selectedPokemon.speed}/>}
       </div>
        
    
    
    
    
    </div>  
    )


}

export default PokemonInfo