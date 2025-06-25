import { useContext, useEffect, useState } from "react"
import "./PokemonInfo.css"
import "./StatsTile.css"
import { RegionContext } from "../context"
import axios from "axios"
import TypesTile from "./TypesTile"
import StatsTile from "./StatsTile"
import DisplayTile from "./DisplayTile"
import AddToPartyBtn from "./AddToPartyBtn"
import DeleteFromPartyBtn from "./DeleteFromPartyBtn"


function PokemonInfo({setRefreshKey}){

    const {selectedPokemon} = useContext(RegionContext) 
    const [types,setTypes] = useState(null)
    useEffect(()=>{
        const getType = async() =>{
            try{
                const result = await axios.get(`http://localhost:3000/api/region/pokemon/${selectedPokemon.pokemon.id}`);
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
            {selectedPokemon.pokemon.name}
       </header>
       <div id ="typePanel">
            {selectedPokemon.pokemon.api_id}
            {
                types.map((obj,index)=>{
                    return <TypesTile key={`${obj.type}-${index}`} type ={obj.type}/>
                })
            }
       </div>
       <div id="displayPanel">
            <DisplayTile sprite={selectedPokemon.pokemon.sprite}/>
       </div>
       <div id ='statsPanel'>
           {<StatsTile title = {'HP'} stat={selectedPokemon.pokemon.hp}/>}
           {<StatsTile title = {'ATTACK'} stat={selectedPokemon.pokemon.attack}/>}
           {<StatsTile title = {'DEFENSE'} stat={selectedPokemon.pokemon.defense}/>}
           {<StatsTile title = {'SP. AT'} stat={selectedPokemon.pokemon.special_attack}/>}
           {<StatsTile title = {'SP. DEF'} stat={selectedPokemon.pokemon.special_defense}/>}
           {<StatsTile title = {'SPEED'} stat={selectedPokemon.pokemon.speed}/>}
       </div>
       {selectedPokemon.source === 'grid'? <AddToPartyBtn pokemon={selectedPokemon.pokemon} setRefreshKey={setRefreshKey}/>: null}
       {selectedPokemon.source === 'party'? <DeleteFromPartyBtn pokemon={selectedPokemon.pokemon}setRefreshKey={setRefreshKey} />: null}
        
    
    
    
    
    </div>  
    )


}

export default PokemonInfo