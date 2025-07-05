import axios from "axios";
import { useContext } from "react";
import { RegionContext } from "../../context";

function DeleteFromPartyBtn({pokemon}){

    const {selectedTrainer,setPartyRefresh,setCollectionRefresh} = useContext(RegionContext)
    const onHandleClick = async(pokemon) =>{
        try{
            await axios.post(`http://localhost:3000/api/trainer/party/remove`,{trainerId: selectedTrainer.id, pokemonId: pokemon.id})
            setPartyRefresh(prev=>prev+1)
            setCollectionRefresh(prev=>prev+1)
        }catch(error)
        {
            console.log('unable to post removal of pokemon from party',error)
        }
    }

    return (
        <button onClick={()=>onHandleClick(pokemon)}>{'remove from party'}</button>
    )
}

export default DeleteFromPartyBtn;