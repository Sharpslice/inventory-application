import { useContext} from "react"
import "./PokemonInfo.css"
import { RegionContext } from "../context"

import StatsTile from "./Stats/StatsTile"
import DisplayTile from "./DisplayTile/DisplayTile"
import AddToPartyBtn from "./buttons/AddToPartyBtn"
import DeleteFromPartyBtn from "./buttons/DeleteFromPartyBtn"
import DeleteFromCollectionBtn from "./buttons/DeleteFromCollectionBtn"
import TypesPanel from "./Types/TypesPanel"
import PokeballIcon from '../assets/pokeball.svg'
import { useEffect } from "react"
import axios from "axios"

function PokemonInfo(){

    const {selectedPokemon} = useContext(RegionContext) 
     
    useEffect(()=>{
        const fetchData = async()=>{
             const result = await axios.get(`http://localhost:3000/api/pokemon/${selectedPokemon.pokemon.id}/moveset`);
             console.log(result.data);
        }
        if(!selectedPokemon) return;
        fetchData();
    },[selectedPokemon])




    if(!selectedPokemon) return;
    return (
    <>
       <div id='title'>
            <img src={PokeballIcon} alt="" />
            <div>{(selectedPokemon.pokemon.name).toUpperCase()}</div>
       </div>
       <div id='info-wrapper'>
            <div id='subtitle'>
                <span>{`No. ${selectedPokemon.pokemon.api_id}`}</span>
                <span>{selectedPokemon.pokemon.name}</span>
            </div>
            <div id ="typePanel">
                <TypesPanel/>
            </div>
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
        
    
    
    
    
    </>
    )


}

export default PokemonInfo