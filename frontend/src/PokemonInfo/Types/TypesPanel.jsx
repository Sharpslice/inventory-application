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
                const result = await axios.get(`http://localhost:3000/api/pokemon/${selectedPokemon.pokemon.id}/types`);
                if(result.data.success){
                    setTypes(result.data.data);
                }
                else{
                    console.error('Unable to fetch pokemons type')
                }
                
            }catch(error){
                console.log(`Network error`,error.message)
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