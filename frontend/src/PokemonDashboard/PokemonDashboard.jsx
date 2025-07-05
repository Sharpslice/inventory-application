import { useState } from "react"
import OwnedPokemonBar from "../ownedPokemonBar/OwnedPokemonBar"
import PokemonGrid from "../PokemonGrid/PokemonGrid"
import RegionBar from "../RegionBar/RegionBar"

function PokemonDashboard({refreshKey,setRefreshKey}){

    const [display,setDisplay] = useState('region')

    return (
        <>
            <div id='navBar'>
                <RegionBar/>
                <OwnedPokemonBar setDisplay={setDisplay} setRefreshKey={setRefreshKey}/>
            </div>
            <PokemonGrid display={display} refreshKey={refreshKey}/>
        </>
    )
}

export default PokemonDashboard