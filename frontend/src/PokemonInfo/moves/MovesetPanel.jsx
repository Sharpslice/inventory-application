import Tile from "./Tile"
import './MovesetPanel.css'
import { useContext, useEffect, useState } from "react"
import { RegionContext } from "../../context"
import axios from "axios"

function MovesetPanel({selectedMove}){
   
    
    const {selectedPokemon} = useContext(RegionContext) 
    const {selectedTrainer} = useContext(RegionContext)
    const [selectedTileId, setSelectedTileId]= useState(null)
    const [dbRefresh,setDbRefresh] = useState(0);
    const [highlightId, setHighlightId] = useState(null)
    const [tileArray,setTileArray] = useState([
                                    {id:'tile-0', move:null},
                                    {id:'tile-1',move:null},
                                    {id:'tile-2',move:null},
                                    {id:'tile-3',move:null}
                                    ])

    //store the key (slot position) in the db so that you can select where it gets placed
    //this is for db
    const updateTiles = (moveset)=>{
        setTileArray(prev=>{
            return prev.map((_,index)=>{
                if(moveset?.[index]!== undefined){
                    console.log('hit')
                    return {id:`tile-${index}`,move:moveset[index]}
                }
                else{
                    return {id:`tile-${index}`, move: null}
                }
                
            })
        })
    }

    useEffect(()=>{
        if(!selectedMove) return; //bug if this is removed
        console.log(selectedMove)
        addMoveToMoveset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedMove])

    useEffect(()=>{
        
        const fetchMoveset=async()=>{
           
            const response = await axios.get(`http://localhost:3000/api/trainer/${selectedTrainer.id}/${selectedPokemon.pokemon.id}/moveset`)
            if(response.data.success){
                console.log('updating database')
                updateTiles(response.data.data)
            }
            else{
                updateTiles([])
            }
           
          
        }

        if(!selectedPokemon) return;
        fetchMoveset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedPokemon,dbRefresh])

   




    const isDuplicate=()=>{
        const isDuplicate = tileArray.find((tileElement)=>tileElement.move === selectedMove)
         if(isDuplicate)
         {
            console.log('error. pokemon already learned',selectedMove)
            return true;
         }
    }

   
    
    const addMoveToMoveset = async() =>{
      
        let tileId;
        if(isDuplicate()) return;
        
        if(selectedTileId !== null )
        {
            
            tileId= selectedTileId;
            
        }
        else{
            
            const id = tileArray.findIndex((tileElement)=>tileElement.move ===null)
            tileId = `tile-${id}`
           
        }
        try{
            const result = await axios.post(`http://localhost:3000/api/trainer/${selectedTrainer.id}/${selectedPokemon.pokemon.id}/moveset`,{moveId: selectedMove.id})
            if(result.data.success === false){
                console.log('successfully added move locally')
                setTileArray(prev=>{
                    return prev.map((tile)=>{
                        
                        return(
                            tile.id ===tileId
                                ? {...tile,move:selectedMove}
                                : tile
                        )})
                        })
                   
                   
            }
            else{
                console.log('adding move to db')
                setDbRefresh(prev=>prev+1)
            }
            setSelectedTileId(null)
            setHighlightId(null)
           
            
            
        }
        catch(error){
            console.log('network error',error.message)
        }




        
    }
    




    
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

