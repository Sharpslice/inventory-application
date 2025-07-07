import { useContext } from "react";
import { useState } from "react";
import { RegionContext } from "../../context";
import { useEffect } from "react";
import axios from "axios";
import TypesTile from "./TypesTile"
import './Types.css'
function TypesPanel(){
    const {selectedPokemon} = useContext(RegionContext) 
    const [types,setTypes] = useState(null)
    useEffect(()=>{
        const getType = async() =>{
            try{
                const result = await axios.get(`http://localhost:3000/api/region/pokemon/${selectedPokemon.pokemon.id}`);
                console.log(result.data)

                setTypes(result.data);
            }catch(error){
                console.log(`failed to fetch ${selectedPokemon}'s type`,error)
            }
    }
    if(!selectedPokemon)return;
    getType();
    },[selectedPokemon])


    return(
         types && types.map((obj,index)=>{
                    return <TypesTile key={`${obj.type}-${index}`} type ={obj.type}/>
                })
    )
}

export default TypesPanel;