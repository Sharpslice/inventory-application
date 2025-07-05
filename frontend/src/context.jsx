import { createContext, useState } from "react";


const RegionContext = createContext({id:1,region:'hoenn'});

export function RegionProvider({children}){
    
    
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [selectedTrainer,setSelectedTrainer] = useState({id:1,name:'David'})
    const [partyRefresh,setPartyRefresh] = useState(0);
    const [collectionRefresh,setCollectionRefresh] = useState(0)
    return (
    <RegionContext.Provider value ={{selectedPokemon,setSelectedPokemon,selectedTrainer,setSelectedTrainer,partyRefresh,setPartyRefresh,
                                        collectionRefresh,setCollectionRefresh
    }}>
        {children}
    </RegionContext.Provider>
    )
} 

export {RegionContext};