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


function PokemonInfo(){

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
           {<StatsTile title = {'SP. ATK'} stat={selectedPokemon.pokemon.special_attack}/>}
           {<StatsTile title = {'SP. DEF'} stat={selectedPokemon.pokemon.special_defense}/>}
           {<StatsTile title = {'SPEED'} stat={selectedPokemon.pokemon.speed}/>}
       </div>
       {/* check if the selected pokemon belongs in trainer's collection and then you can display which button needs to show up */}
       {/* compareSelectedPokemon to trainer's pokemonCollection */}
       {selectedPokemon.source === 'grid'? <AddToPartyBtn pokemon={selectedPokemon.pokemon} ownedByTrainer={false} />: null}
       {selectedPokemon.source === 'party'? <DeleteFromPartyBtn pokemon={selectedPokemon.pokemon} />: null}
       {selectedPokemon.source === 'owned'? <DeleteFromCollectionBtn pokemon={selectedPokemon.pokemon} />: null}
       {selectedPokemon.source === 'owned'? <AddToPartyBtn pokemon={selectedPokemon.pokemon} ownedByTrainer={true} />: null}
        
    
    
    
    
    </div>  
    )


}

export default PokemonInfo