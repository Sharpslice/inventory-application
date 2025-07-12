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
                 const result = await axios.get(`http://localhost:3000/api/pokemon/${selectedPokemon.pokemon.id}/moveset`);
                 setMoveset(result.data)
                 setOriginalMoveset(result.data)
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