import { createContext, useState } from "react";


const RegionContext = createContext({id:1,region:'hoenn'});

export function RegionProvider({children}){

    const [currentRegion, setCurrentRegion] = useState({id:1,region:'hoenn'})
    const [selectedPokeon, setSelectedPokemon] = useState(null)
    return (
    <RegionContext.Provider value ={{currentRegion,setCurrentRegion,selectedPokeon,setSelectedPokemon}}>
        {children}
    </RegionContext.Provider>
    )
} 

export {RegionContext};