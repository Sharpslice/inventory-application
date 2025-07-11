import Tile from "./Tile"
import './MovesetPanel.css'
import { useEffect, useState } from "react"

function MovesetPanel({selectedMove}){
   

    

    const [tileArray,setTileArray] = useState([
                                    {id:0,isFilled: false, move:null},
                                    {id:1,isFilled: false, move:null},
                                    {id:2,isFilled: false, move:null},
                                    {id:3,isFilled: false, move:null}
                                        
                                    ])
    useEffect(()=>{
        if(!selectedMove) return;
       for (const [index,tileElement] of tileArray.entries()){
            
            if(!tileElement.isFilled){
              setTileArray(prev=>{
                return prev.map((tile)=>{
                    return(
                        tile.id ===index
                            ? {...tile,isFilled:true,move:selectedMove}
                            : tile
                    )
                    
                })
              })
              break;
                

            }
        
       }
      
       
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedMove])


    
    return(
        <div id='moveset-panel'>
            {tileArray.map((tile)=>
                {
                    return <Tile key={tile.id} move={tile.move}/>
                }
            )}
        </div>
    )
}
export default MovesetPanel