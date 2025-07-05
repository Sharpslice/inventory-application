import { useContext} from "react"
import "./PokemonInfo.css"
import "./StatsTile.css"
import { RegionContext } from "../context"

import StatsTile from "./StatsTile"
import DisplayTile from "./DisplayTile"
import AddToPartyBtn from "./buttons/AddToPartyBtn"
import DeleteFromPartyBtn from "./buttons/DeleteFromPartyBtn"
import DeleteFromCollectionBtn from "./buttons/DeleteFromCollectionBtn"
import TypesPanel from "./TypesPanel"


function PokemonInfo({setRefreshKey}){

    const {selectedPokemon} = useContext(RegionContext) 
    
    if(!selectedPokemon) return;
    
    return (
    <div id="pokemonInfo">
       <header>
            {selectedPokemon.pokemon.name}
       </header>
       <div id ="typePanel">
            {selectedPokemon.pokemon.api_id}
            <TypesPanel/>
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
       {selectedPokemon.source === 'owned'? <DeleteFromCollectionBtn pokemon={selectedPokemon.pokemon}setRefreshKey={setRefreshKey} />: null}
        
    
    
    
    
    </div>  
    )


}

export default PokemonInfo