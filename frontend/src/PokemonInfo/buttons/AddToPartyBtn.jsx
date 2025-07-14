import axios from "axios";
import { useContext } from "react";
import { RegionContext } from "../../context";

function AddToPartyBtn({pokemon}){
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

            try{
                const result = await axios.post(`http://localhost:3000/api/trainer/${selectedTrainer.id}/party`,{pokemonId: pokemon.id})
                if(result.data.success){
                    if(result.data.action ==='inserted'){
                        console.log('inserted')
                        setPartyRefresh(prev=>prev+1)
                    }
                    else{
                        console.log('update')
                        setPartyRefresh(prev=>prev+1)
                        setCollectionRefresh(prev=>prev+1)
                    }
                    
                }
                else{
                    console.log('backend error in adding pokemon')
                }
                
            }catch(error){
                console.log("Network error",error.message)
            }
        
    }


    return(
        <button onClick={()=>onAddPokemonToPartyClick(pokemon)}>{"AddToParty"}</button>
    );
}

export default AddToPartyBtn;