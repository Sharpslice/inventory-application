import Tile from "./Tile"
import './MovesetPanel.css'
import { useEffect, useState } from "react"

function MovesetPanel({selectedMove}){
   
    const [selectedTile, setSelectedTile]= useState(null)

    const addMoveToMoveset = () =>{
         let tileId;

        if(selectedTile)
        {
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
            
        
    }
    

    const [tileArray,setTileArray] = useState([
                                    {id:0,isFilled: false, move:null},
                                    {id:1,isFilled: false, move:null},
                                    {id:2,isFilled: false, move:null},
                                    {id:3,isFilled: false, move:null}
                                        
                                    ])

    
    useEffect(()=>{
        if(!selectedMove) return; //bug if this is removed
        addMoveToMoveset()
      

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedMove])


    
    return(
        <div id='moveset-panel'>
            {tileArray.map((tile)=>
                {
                    return <Tile key={tile.id} id={tile.id} move={tile.move} setSelectedTile={setSelectedTile}/>
                }
            )}
        </div>
    )
}
export default MovesetPanel

// for (const [index,tileElement] of tileArray.entries()){
//             if(!tileElement.isFilled){
//               setTileArray(prev=>{
//                 return prev.map((tile)=>{
//                     return(
//                         tile.id ===index
//                             ? {...tile,isFilled:true,move:selectedMove}
//                             : tile
//                     )})
//                  })
//               break;
//             }
        
//        }