import { useState } from "react"
import OwnedPokemonBar from "../ownedPokemonBar/OwnedPokemonBar"
import PokemonGrid from "../PokemonGrid/PokemonGrid"
import RegionBar from "../RegionBar/RegionBar"

function PokemonDashboard(){

    const [display,setDisplay] = useState('region')
    const [currentRegion,setCurrentRegion] = useState({id:1,region:'hoenn'});
    return (
        <>
            <div id='navBar'>
                <RegionBar setCurrentRegion={setCurrentRegion}/>
                <OwnedPokemonBar setDisplay={setDisplay} />
            </div>
            <PokemonGrid display={display} currentRegion={currentRegion} />
        </>
    )
}

export default PokemonDashboard