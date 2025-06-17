import { useContext, useEffect, useState } from "react";
import { RegionContext } from "../context";
import axios from "axios";
import './PokemonGrid.css'

function PokemonGrid(){
    const {currentRegion} = useContext(RegionContext)
  
    const [pokemonList,setPokemonList] = useState(null)

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const regionId = currentRegion.id;
                console.log("this is current region", currentRegion.region)
                const result = await axios.get(`http://localhost:3000/api/region/${regionId}/pokemon`)
                const list = result.data;
                list.length = 50;
                setPokemonList(list)
                
            }catch(error){
                console.log("error recieving pokemon from region",error)
            }
            
        }
        fetchData()
    },[currentRegion])
    if(!pokemonList) return;
    return(
        <>
            <div id ="pokemonGrid">
                {pokemonList.map((pokemon)=>{
                    return (
                    <div className="pokemonDiv" key = {pokemon.id}>
                        <img className="sprite" src={pokemon.sprite} alt="" />
                    </div>
                    )
                })}
            </div>
        </>
    )
}

export default PokemonGrid;