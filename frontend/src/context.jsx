import { createContext, useState } from "react";


const RegionContext = createContext({id:1,region:'hoenn'});

export function RegionProvider({children}){

    const [currentRegion, setCurrentRegion] = useState({id:1,region:'hoenn'})
    return (
    <RegionContext.Provider value ={{currentRegion,setCurrentRegion}}>
        {children}
    </RegionContext.Provider>
    )
} 

export {RegionContext};