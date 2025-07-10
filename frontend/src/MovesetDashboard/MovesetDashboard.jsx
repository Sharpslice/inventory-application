import { useContext, useEffect, useState } from 'react';
import './MovesetDashboard.css'
import { RegionContext } from '../context';
import axios from 'axios';
import MovesTile from './MovesTile';
import FilterBar from './FilterBar';
import SortBtn from './SortBtn';
import MovesetGrid from './MovesetGrid';
function MovesetDashboard(){
    const {selectedPokemon} = useContext(RegionContext) 
    const [originalMoveSet,setOriginalMoveset] = useState(null)
    const [moveset,setMoveset] = useState(null)
    const [selectedMove,setSelectedMove] = useState(null)
    useEffect(()=>{
            const fetchData = async()=>{
                 const result = await axios.get(`http://localhost:3000/api/pokemon/${selectedPokemon.pokemon.id}/moveset`);
                 setMoveset(result.data)
                 setOriginalMoveset(result.data)
            }
            fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

    

    return(
        <div id='movesetDashboard'>

            <FilterBar 
                originalMoveset={originalMoveSet} 
                moveset = {moveset} 
                setMoveset={setMoveset} 
            
            />
            <SortBtn moveset ={moveset} setMoveset={setMoveset}/>
            
            {moveset && <MovesetGrid moveset={moveset}/>}
            
            



        </div>


    )
}
export default MovesetDashboard