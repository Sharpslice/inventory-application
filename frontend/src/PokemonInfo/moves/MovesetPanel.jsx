import Tile from "./Tile"
import './MovesetPanel.css'
import { useContext, useEffect, useState } from "react"
import { RegionContext } from "../../context"
import axios from "axios"

function MovesetPanel({selectedMove}){
   
    
    const {selectedPokemon} = useContext(RegionContext) 
    const {selectedTrainer} = useContext(RegionContext)
    const [selectedTileId, setSelectedTileId]= useState(null)
   
    const emptyTiles =  [
                                    {id:0, move:null},
                                    {id:1,move:null},
                                    {id:2,move:null},
                                    {id:3,move:null}
                                    ]
    const [tileArray,setTileArray] = useState(emptyTiles)

   
    const updateTilesFromDb = (moveset)=>{

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
        let slotId;
        if(selectedTileId){
             slotId = selectedTileId
            
        }
        else{
            slotId = tileArray.findIndex((tileElement)=>tileElement.move ===null)
        }
        
        
        if(isDuplicate()) return;
        
        setTileArray(prev=>{    
            return prev.map((tile)=>{
                return(
                    tile.id ===slotId
                        ? {...tile,move:selectedMove}
                        : tile
                )})
                })
        console.log('adding move locally')
   }
   const addMoveToDb = async()=>{
    
        try{
            
            await axios.post(`http://localhost:3000/api/trainer/${selectedTrainer.id}/${selectedPokemon.pokemon.id}/moveset`,{moveId: selectedMove.id,slotId:selectedTileId})
            console.log(`Adding ${selectedMove.name}: ${selectedMove.id} to slot:${selectedTileId}`)
            
            try{
              
                const response = await axios.get(`http://localhost:3000/api/trainer/${selectedTrainer.id}/${selectedPokemon.pokemon.id}/moveset`)
                console.log('updating tiles from db')
                updateTilesFromDb(response.data)
            }catch(error){
                if(error.response){
                    console.log(error.response.data)
                }else{
                    console.error('Network error', error.message)
                }
            }
        }catch(error)
        {
            if(error.response)
            {
                console.log(error.response.data)
            }
            else{
                 console.error('Network error', error.message)
            }   
           
        }
   }
    
   const fetchMovesetFromDb=async()=>{
    try{
        const response = await axios.get(`http://localhost:3000/api/trainer/${selectedTrainer.id}/${selectedPokemon.pokemon.id}/moveset`)
        if(response.data.length===0){
            console.log('pokemon has no learned moves')
            resetTilesLocally();
        }
        else{
            updateTilesFromDb(response.data)
        }
        
        
    }catch(error){
        if(error.response){
            console.log(error.response.data)
        }
        else{
            console.log('Network error',error.message)
        }
    }
        }

    

    useEffect(()=>{
        if(selectedPokemon.source === 'owned' || selectedPokemon.source === 'party'){
            
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
        if(selectedTileId!=null){
            setSelectedTileId(null)
        }
    
   },[selectedMove])


    return(
        <div id='moveset-panel'>
            {tileArray.map((tile)=>
                {
                    return <Tile 
                            key={tile.id} 
                            id={tile.id} 
                            move={tile.move} 
                            selectedTileId={selectedTileId}
                            setSelectedTileId={setSelectedTileId}
                            />
                }
            )}
        </div>
    )
}
export default MovesetPanel

