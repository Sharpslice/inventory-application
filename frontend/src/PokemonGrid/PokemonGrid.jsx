import { useContext, useEffect, useState } from "react";
import { RegionContext } from "../context";
import axios from "axios";


function PokemonGrid(){
    const {currentRegion} = useContext(RegionContext)
  
    const [pokemonList,setPokemonList] = useState(null)

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const regionId = currentRegion.id;
                console.log("this is current region", regionId)
                const result = await axios.get(`http://localhost:3000/api/region/${regionId}/pokemon`)
                console.log(result)
                //setPokemonList(result.data);
            }catch(error){
                console.log("error recieving pokemon from region",error)
            }
            
        }
        fetchData()
    },[currentRegion])



   
    return(
        <>
        
        </>
    )
}

export default PokemonGrid;