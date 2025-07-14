import { useContext, useEffect, useState } from "react";
import { RegionContext } from "../context";
import axios from "axios";
import './PokemonGrid.css'
import triangleLeft from '../assets/triangle-left.svg';
import triangleRight from '../assets/triangle-right.svg';
import PokemonTiles from "./PokemonTiles";
function PokemonGrid({display,currentRegion}){

    const LIMIT = 30;

    
    const {setSelectedPokemon,collectionRefresh} = useContext(RegionContext);
    const {selectedTrainer} = useContext(RegionContext)
    const [pokemonList,setPokemonList] = useState(null)
    const [offset,setOffset] = useState(null)
    

    
     useEffect(()=>{
        const fetchData = async() =>{
            try{
                const result = await axios.get(`http://localhost:3000/api/trainer/${selectedTrainer.id}/pokemonCollection`);
                if(result.data.success){
                    setPokemonList(result.data.data)
                }
                else{
                    console.error('Backend error: cannot fetch trainer pokemon collection')
                }
            }
            catch(error){
                console.log("Network error" ,error.message)
            }
            
        }
        if(display==='region') return;
        fetchData();
    },[selectedTrainer.id,display,collectionRefresh]) // this needs to be changed where clicking on owned, activates this useEffect

    useEffect(()=>{
        const fetchData = async()=>{
            
            try{
               
                const regionId = currentRegion.id;
                
                const result = await axios.get(`http://localhost:3000/api/region/${regionId}/pokemon?offset=${offset}&limit=${LIMIT}`)
                
                setPokemonList(result.data)
                
            }catch(error){
                console.log("error recieving pokemon from region",error)
            }
            
        }
        if(display==='owned') return;
        fetchData()
    },[currentRegion,offset,display]) 

   


    useEffect(()=>{
        setOffset(0)
    },[currentRegion])

    const onPrevClick = () =>{
        if(offset-LIMIT < 0 ) return;
        setOffset(prev => prev-LIMIT)
    }
    const onNextClick = () =>{
        if(pokemonList.length < LIMIT) return;
        setOffset(prev => prev+LIMIT)
    }
   
    const onSelectClick = (pokemon) =>{
        if(display === 'owned'){
            setSelectedPokemon({pokemon: pokemon, source: 'owned'})
        }
        else{
            setSelectedPokemon({pokemon: pokemon, source: 'grid'})
        }
        
            
        
        
    }

    if(!pokemonList) return;
    return(
        <>
            <div id ="pokemonGrid">
                {pokemonList.map((pokemon)=>
                (
                    <PokemonTiles
                       key={pokemon.id}
                       pokemon={pokemon} 
                       onSelectClick={onSelectClick}
                    />
                )
                )}
            </div>
            <div id="pageNav">
                <button onClick={onPrevClick}>
                     <img src={triangleLeft} alt="prev button" />
                </button>
                <button onClick={onNextClick}>
                    <img src={triangleRight} alt="next button" />
                </button>
            </div>
        </>
    )
}

export default PokemonGrid;