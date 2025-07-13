import axios from "axios";
import { useContext } from "react";
import { RegionContext } from "../../context";

function AddToPartyBtn({pokemon,isOwnedByTrainer}){
    const {selectedTrainer,setPartyRefresh,setCollectionRefresh} = useContext(RegionContext);

    const isPartyFull = async()=>{
        
        try{
            const partySize = await axios.get(`http://localhost:3000/api/trainer/${selectedTrainer.id}/party`)
            if(partySize.data.success){
                if(partySize.data.data.length < 6){
                    console.log("party is not full")
                    return true;
                }
                else{
                    console.log("party is full")
                    return false;
                }
            }
            else{
                console.log("Backend error in fetching party")
            }
        }
        catch(error){
            console.log("Network error", error.message)
        }

        
    }
    const onAddPokemonToPartyClick =async(pokemon) =>{
        
        if(! (await isPartyFull())) return;
      
        if(isOwnedByTrainer){
            try{
                await axios.post(`http://localhost:3000/api/trainer/party/addback`,{trainerId: selectedTrainer.id, pokemonId: pokemon.id})
                
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