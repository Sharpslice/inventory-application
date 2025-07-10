import { useContext, useEffect, useState } from 'react';
import './MovesetDashboard.css'
import { RegionContext } from '../context';
import axios from 'axios';
import MovesTile from './MovesTile';
function MovesetDashboard(){
    const {selectedPokemon} = useContext(RegionContext) 
    const [moveset,setMoveset] = useState(null)
    useEffect(()=>{
            const fetchData = async()=>{
                 const result = await axios.get(`http://localhost:3000/api/pokemon/${selectedPokemon.pokemon.id}/moveset`);
                 setMoveset(result.data)
            }
            if(!selectedPokemon) return;
            fetchData();
        },[selectedPokemon])

    
    return(
        <div id='movesetDashboard'>



            <div id ='movesGrid'>
                {moveset && moveset.map((move)=>(
                <MovesTile
                    key ={move.id}
                    move ={move}
                />
                ))}
            </div>
            



        </div>


    )
}
export default MovesetDashboard