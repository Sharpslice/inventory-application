import Tile from "./Tile"
import './MovesetPanel.css'
import { useContext, useEffect, useState } from "react"
import { RegionContext } from "../../context"
import axios from "axios"

function MovesetPanel({selectedMove}){
   
    
    const {selectedPokemon} = useContext(RegionContext) 
    const {selectedTrainer} = useContext(RegionContext)
    const [selectedTileId, setSelectedTileId]= useState(null)
   
    const [highlightId, setHighlightId] = useState(null)

    const emptyTiles =  [
                                    {id:0, move:null},
                                    {id:1,move:null},
                                    {id:2,move:null},
                                    {id:3,move:null}
                                    ]
    const [tileArray,setTileArray] = useState(emptyTiles)

   
    const updateTilesFromDb = (moveset)=>{

        console.log(`grabbing 's moveset`,moveset)
        setTileArray(prev=>{
            return prev.map((_,index)=>{
                const move = moveset.find((move)=>move.slots === index)
                return(
                    move
                    ? {id: move.slots,move:move}
                    : {id: index, move: null}
                )
            })
        })
        
    }
    const resetTilesLocally = ()=>{
        setTileArray(emptyTiles)
    }

    const isDuplicate=()=>{
        const result = tileArray.find((tileElement)=>tileElement.move === selectedMove)
        if(result){
            console.log('duplicate move')
            return true;
        }
        else{
            return false;
        }
    }

   const addMoveLocally =()=>{
        const slotId = tileArray.findIndex((tileElement)=>tileElement.move ===null)
        
        if(isDuplicate()) return;
        
        setTileArray(prev=>{    
            return prev.map((tile)=>{
                return(
                    tile.id ===slotId
                        ? {...tile,move:selectedMove}
                        : tile
                )})
                })
   }
   const addMoveToDb = async()=>{
        try{
            
            const result = await axios.post(`http://localhost:3000/api/trainer/${selectedTrainer.id}/${selectedPokemon.pokemon.id}/moveset`,{moveId: selectedMove.id,slotId:selectedTileId})
            
            if(result.data.success === false)
            {
                console.log(result.data.message)
            }
            else{
                const response = await axios.get(`http://localhost:3000/api/trainer/${selectedTrainer.id}/${selectedPokemon.pokemon.id}/moveset`)
                updateTilesFromDb(response.data.data)
            }
            
        }catch(error)
        {
            console.error('Network error', error.message)
        }
   }
    
   const fetchMovesetFromDb=async()=>{
            const response = await axios.get(`http://localhost:3000/api/trainer/${selectedTrainer.id}/${selectedPokemon.pokemon.id}/moveset`)
            if(response.data.success){
               
                updateTilesFromDb(response.data.data)
            }
            else{
                console.log('pokemon has no learned moves')
                resetTilesLocally();
            }
        }

    

    useEffect(()=>{
        if(selectedPokemon.source === 'owned' || selectedPokemon.source === 'party'){
            console.log('grabbing',selectedPokemon.pokemon.name)
            fetchMovesetFromDb()
        }
        else{
            resetTilesLocally()
        }
        console.log(tileArray)
    },[selectedPokemon])

    useEffect(()=>{

    },[tileArray])

   useEffect(()=>{
        if(!selectedMove) return;
        if(selectedPokemon.source === 'owned' || selectedPokemon.source === 'party'){
            addMoveToDb()
        }
        else{
            
           addMoveLocally()
        }
    
   },[selectedMove])


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

