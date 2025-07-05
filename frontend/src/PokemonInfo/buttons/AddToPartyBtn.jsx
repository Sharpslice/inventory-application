import axios from "axios";
import { useContext } from "react";
import { RegionContext } from "../../context";

function AddToPartyBtn({pokemon,setRefreshKey}){
    const {selectedTrainer} = useContext(RegionContext);
    const onAddPokemonToPartyClick =async(pokemon) =>{
        let partySize;
        try{
            const response = await axios.get(`http://localhost:3000/api/trainer/${selectedTrainer.id}/party`)
            partySize = response.data.length;
        }
        catch(error){
            console.log("unable to fetch party size from api", error.message)
        }
        if(partySize>=6){
            console.log("party full")
        }
        try{
            await axios.post(`http://localhost:3000/api/trainer/party`,{trainerId: selectedTrainer.id, pokemonId: pokemon.id})
            setRefreshKey(prev=>prev+1)
        }catch(error){
            console.log("error sending pokemon to server",error)
        }
        
    }


    return(
        <button onClick={()=>onAddPokemonToPartyClick(pokemon)}>{"AddToParty"}</button>
    );
}

export default AddToPartyBtn;