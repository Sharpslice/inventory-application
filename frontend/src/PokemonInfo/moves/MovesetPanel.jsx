import Tile from "./Tile"
import './MovesetPanel.css'
import { useContext, useEffect, useState } from "react"
import { RegionContext } from "../../context"

function MovesetPanel({selectedMove}){
   
    
    const {selectedPokemon} = useContext(RegionContext) 
    // has to be pulled from database.
    const [selectedTile, setSelectedTile]= useState(null)

    const addMoveToMoveset = () =>{
         let tileId;

        if(selectedTile!== null)
        {
            console.log("changing tile: "+selectedTile)
            tileId= selectedTile;
            setSelectedTile(null)
        }
        else{
            tileId = tileArray.findIndex((tileElement)=>tileElement.isFilled ===false)
        }
        setTileArray(prev=>{
        return prev.map((tile)=>{
           
            return(
                tile.id ===tileId
                    ? {...tile,isFilled:true,move:selectedMove}
                    : tile
            )})
            })
            
        setHighlightId(null)
    }
    

    const [tileArray,setTileArray] = useState([
                                    {id:0,isFilled: false, move:null},
                                    {id:1,isFilled: false, move:null},
                                    {id:2,isFilled: false, move:null},
                                    {id:3,isFilled: false, move:null}
                                        
                                    ])


    

    
    useEffect(()=>{
        if(!selectedMove ) return; //bug if this is removed
        addMoveToMoveset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedMove])

    useEffect(()=>{
        setTileArray([{id:0,isFilled: false, move:null},
                                    {id:1,isFilled: false, move:null},
                                    {id:2,isFilled: false, move:null},
                                    {id:3,isFilled: false, move:null}])
        setSelectedTile(null)
    },[selectedPokemon])


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

