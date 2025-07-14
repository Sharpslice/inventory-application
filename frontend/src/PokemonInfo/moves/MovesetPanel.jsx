import Tile from "./Tile"
import './MovesetPanel.css'
import { useContext, useEffect, useState } from "react"
import { RegionContext } from "../../context"
import axios from "axios"

function MovesetPanel({selectedMove}){
   
    
    const {selectedPokemon} = useContext(RegionContext) 
    const {selectedTrainer} = useContext(RegionContext)
    const [selectedTile, setSelectedTile]= useState(null)
    const [tileArray,setTileArray] = useState([
                                    {id:'w', move:null},
                                    {id:'x',move:null},
                                    {id:'y',move:null},
                                    {id:'z',move:null}
        
                                    ])

    const addMovesetToArray = (moveset)=>{
        console.log(moveset)
        setTileArray(prev=>{
            return prev.map((tile,index)=>{
                if(moveset?.[index]!== undefined){
                    console.log('hit')
                    return {id:moveset[index].id,move:moveset[index]}
                }
                else{
                    return tile
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

         const result = tileArray.find((tileElement)=>tileElement.move === selectedMove)
         if(result)
         {
            console.log('error. pokemon already learned',selectedMove)
            return;
         }

        if(selectedTile !== null )
        {
            console.log("changing tile: "+selectedTile)
            tileId= selectedTile;
            
        }
        else{
            tileId = tileArray.findIndex((tileElement)=>tileElement.move ===null)
        }
        
        setTileArray(prev=>{
        return prev.map((tile)=>{
           
            return(
                tile.id ===tileId
                    ? {...tile,move:selectedMove}
                    : tile
            )})
            })
        setSelectedTile(null)
        setHighlightId(null)
    }
    useEffect(()=>{
        if(!selectedMove ) return; //bug if this is removed
        addMoveToMoveset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedMove])


    // useEffect(()=>{
    //     setTileArray([{id:0,isFilled: false, move:null},
    //                                 {id:1,isFilled: false, move:null},
    //                                 {id:2,isFilled: false, move:null},
    //                                 {id:3,isFilled: false, move:null}])
    //     setSelectedTile(null)
    // },[selectedPokemon])


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
                            setSelectedTile={setSelectedTile}
                            />
                }
            )}
        </div>
    )
}
export default MovesetPanel

