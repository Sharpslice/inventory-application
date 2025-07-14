import axios from "axios";
import { useContext } from "react";
import { RegionContext } from "../../context";

function RemoveFromPartyBtn({pokemon}){

    const {selectedTrainer,setPartyRefresh,setCollectionRefresh} = useContext(RegionContext)
    const onHandleClick = async(pokemon) =>{
        try{
            const result = await axios.patch(`http://localhost:3000/api/trainer/${selectedTrainer.id}/party/${pokemon.id}`)
            if(result.data.success){
                setPartyRefresh(prev=>prev+1)
                setCollectionRefresh(prev=>prev+1)
            }
            else{
                console.error("Error removing pokemon from party")
            }
            
        }catch(error)
        {
            console.log('Network error',error.message)
        }
    }

    return (
        <button onClick={()=>onHandleClick(pokemon)}>{'remove from party'}</button>
    )
}

export default RemoveFromPartyBtn;