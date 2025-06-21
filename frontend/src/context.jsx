import { createContext, useState } from "react";


const RegionContext = createContext({id:1,region:'hoenn'});

export function RegionProvider({children}){

    const [currentRegion, setCurrentRegion] = useState({id:1,region:'hoenn'})
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    return (
    <RegionContext.Provider value ={{currentRegion,setCurrentRegion,selectedPokemon,setSelectedPokemon}}>
        {children}
    </RegionContext.Provider>
    )
} 

export {RegionContext};