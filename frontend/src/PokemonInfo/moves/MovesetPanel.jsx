import Tile from "./Tile"
import './MovesetPanel.css'
import { useContext, useEffect, useState } from "react"
import { RegionContext } from "../../context"
import axios from "axios"

function MovesetPanel({selectedMove}){
   
    
    const {selectedPokemon} = useContext(RegionContext) 
    const {selectedTrainer} = useContext(RegionContext)
    const [selectedTileId, setSelectedTileId]= useState(null)
    const [tileArray,setTileArray] = useState([
                                    {id:'tile-0', move:null},
                                    {id:'tile-1',move:null},
                                    {id:'tile-2',move:null},
                                    {id:'tile-3',move:null}
        
                                    ])

    const addMovesetToArray = (moveset)=>{
        console.log(moveset)
        setTileArray(prev=>{
            return prev.map((tile,index)=>{
                if(moveset?.[index]!== undefined){
                    
                    return {id:`tile-${index}`,move:moveset[index]}
                }
                else{
                    return {id:`tile-${index}`, move: null}
                }
                
            })
        })
    }
    useEffect(()=>{
        const fetchMoveset=async()=>{
            try{
                
                const response = await axios.get(`http://localhost:3000/api/trainer/${selectedTrainer.id}/${selectedPokemon.pokemon.id}/moveset`)
                if(response.data.success){
                    console.log(response.data.data)
                    addMovesetToArray(response.data.data)
                }
            }catch(error)
            {
                console.log('Network error',error.message)
            }
        }

        if(!selectedPokemon) return;
        fetchMoveset()
    },[selectedPokemon])







    
    const addMoveToMoveset = () =>{
      
         let tileId;
        console.log(selectedMove)
         const result = tileArray.find((tileElement)=>tileElement.move === selectedMove)
         if(result)
         {
            console.log('error. pokemon already learned',selectedMove)
            return;
         }

        if(selectedTileId !== null )
        {
            console.log("changing tile: "+selectedTileId)
            tileId= selectedTileId;
            
        }
        else{
            
            const id = tileArray.findIndex((tileElement)=>tileElement.move ===null)
            tileId = `tile-${id}`
            console.log(tileId)
        }
        
        setTileArray(prev=>{
        return prev.map((tile)=>{
           
            return(
                tile.id ===tileId
                    ? {...tile,move:selectedMove}
                    : tile
            )})
            })
        setSelectedTileId(null)
        setHighlightId(null)
    }
    useEffect(()=>{
        if(!selectedMove ) return; //bug if this is removed
        addMoveToMoveset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedMove])




    const [highlightId, setHighlightId] = useState(null)
    return(
        <div id='moveset-panel'>
            {tileArray.map((tile)=>
                {
                    return <Tile 
                            key={tile.id} 
                            id={tile.id} 
                            highlightId={highlightId}
                            setHighlightId={setHighlightId}
                            move={tile.move} 
                            setSelectedTile={setSelectedTileId}
                            />
                }
            )}
        </div>
    )
}
export default MovesetPanel

