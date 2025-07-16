import { useContext, useEffect, useState } from 'react';
import './MovesetDashboard.css'
import { RegionContext } from '../context';
import axios from 'axios';
import FilterBar from './FilterBar';
import SortBtn from './SortBtn';
import MovesetGrid from './MovesetGrid';
function MovesetDashboard({setSelectedMove}){
    const {selectedPokemon} = useContext(RegionContext) 
    const [originalMoveSet,setOriginalMoveset] = useState(null)
    const [moveset,setMoveset] = useState(null)
    
    useEffect(()=>{
            const fetchData = async()=>{
                try{
                    const result = await axios.get(`http://localhost:3000/api/pokemon/${selectedPokemon.pokemon.id}/movepool`);
                    if(result.data.success){
                        setMoveset(result.data.data)
                        setOriginalMoveset(result.data.data)
                    }
                   
                }catch(error)
                {
                    console.log("network error",error.message)
                }
                 
            }
            fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

    
    if(!originalMoveSet) return;
    return(
        <div id='moveset-dashboard'>

            <FilterBar 
                originalMoveset={originalMoveSet} 
                
                setMoveset={setMoveset} 
            
            />
            <SortBtn moveset ={moveset} setMoveset={setMoveset}/>
            
            {moveset && <MovesetGrid moveset={moveset} setSelectedMove={setSelectedMove}/>}
            
            



        </div>


    )
}
export default MovesetDashboard