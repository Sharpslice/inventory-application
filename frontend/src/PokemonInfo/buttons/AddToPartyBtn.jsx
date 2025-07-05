import axios from "axios";
import { useContext } from "react";
import { RegionContext } from "../../context";

function AddToPartyBtn({pokemon,ownedByTrainer}){
    const {selectedTrainer,setPartyRefresh,setCollectionRefresh} = useContext(RegionContext);

    const isPartyFull = async()=>{
        let partySize;
        try{
            const response = await axios.get(`http://localhost:3000/api/trainer/${selectedTrainer.id}/party`)
            partySize = response.data.length;
        }
        catch(error){
            console.log("unable to fetch party size from api", error.message)
        }

        if(partySize>=6){
            return true
        }
        else{
            return false;
        }
        
    }
    const onAddPokemonToPartyClick =async(pokemon) =>{
        
        if(await isPartyFull()) return;
      
        if(ownedByTrainer){
            try{
                await axios.post(`http://localhost:3000/api/trainer/party/addback`,{trainerId: selectedTrainer.id, pokemonId: pokemon.id})
                console.log("hit")
                setPartyRefresh(prev=>prev+1)
                setCollectionRefresh(prev=>prev+1)
            }catch(error){
                console.log("error sending pokemon to server",error)
            }
        }else{
            try{
                await axios.post(`http://localhost:3000/api/trainer/party`,{trainerId: selectedTrainer.id, pokemonId: pokemon.id})
                setPartyRefresh(prev=>prev+1)
            }catch(error){
                console.log("error sending pokemon to server",error)
            }
        }
        
        
    }


    return(
        <button onClick={()=>onAddPokemonToPartyClick(pokemon)}>{"AddToParty"}</button>
    );
}

export default AddToPartyBtn;