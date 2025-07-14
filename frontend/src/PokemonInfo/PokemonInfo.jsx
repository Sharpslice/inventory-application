import {  useContext, useEffect} from "react"
import "./PokemonInfo.css"
import { RegionContext } from "../context"


import DisplayTile from "./DisplayTile/DisplayTile"
import AddToPartyBtn from "./buttons/AddToPartyBtn"
import RemoveFromPartyBtn from "./buttons/RemoveFromPartyBtn"
import DeleteFromCollectionBtn from "./buttons/DeleteFromCollectionBtn"
import TypesPanel from "./Types/TypesPanel"
import PokeballIcon from '../assets/pokeball.svg'


import MovesetPanel from "./moves/MovesetPanel"
import StatsPanel from "./Stats/StatsPanel"
import MovesetModeBtn from "./buttons/MovesetModeBtn"

function PokemonInfo({setMovesMode,selectedMove}){

    const {selectedPokemon} = useContext(RegionContext) 
     

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
            <StatsPanel attribute ={selectedPokemon.pokemon}/>
        </div>
        {/* check if the selected pokemon belongs in trainer's collection and then you can display which button needs to show up */}
        {/* compareSelectedPokemon to trainer's pokemonCollection */}
        {selectedPokemon.source === 'grid'? <AddToPartyBtn pokemon={selectedPokemon.pokemon} />: null}
        {selectedPokemon.source === 'party'? <RemoveFromPartyBtn pokemon={selectedPokemon.pokemon} />: null}
        {selectedPokemon.source === 'owned'? <DeleteFromCollectionBtn pokemon={selectedPokemon.pokemon} />: null}
        {selectedPokemon.source === 'owned'? <AddToPartyBtn pokemon={selectedPokemon.pokemon}  />: null}

        {selectedPokemon.source === 'grid' || selectedPokemon.source === 'party'? <MovesetModeBtn setMovesMode={setMovesMode}/> : null}

        {selectedPokemon.source === 'grid' || selectedPokemon.source === 'party'? <MovesetPanel selectedMove={selectedMove}/> : null}
    
    
    
    
    </>
    )


}

export default PokemonInfo