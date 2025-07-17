import axios from "axios"
import { useContext, useEffect,useState } from "react"
import TrainerPartyPanel from "./TrainerPartyPanel"
import '../App.css'
import { RegionContext } from "../context"

function Trainers(){

    const [trainerList,setTrainerList] =useState(null)

    const [visibility,setvisibility] = useState(false)

    const [party,setParty] =useState([]);

    const {selectedTrainer,partyRefresh} = useContext(RegionContext);
    

    
    useEffect(()=>{
        const fetchData =async() =>{
           try {
                const response = await axios.get('http://localhost:3000/api/trainer');
            
                if (response.data.success) {
                    setTrainerList(response.data.data);
                } else {
                    console.error('Backend error: Trainer fetch failed');
                    // Optionally set an error state for UI display
                }
            } catch (err) {
                console.error('Network error:', err.message);
                // Optionally set a different error state for connection issues
            }
        }
        fetchData();
    },[])

    useEffect(()=>{
        const fetchPartyData = async() =>{
           
            try{
                const result = await axios.get(`http://localhost:3000/api/trainer/${selectedTrainer.id}/party`)
                if(result.data.success){
                    
                    setParty(result.data.data);
                }
                else{
                    console.log('Backend error: Party fetch failed')
                }
              
            }catch(error)
            {
                console.log("Network error: ",error.message)
            }
        }
        fetchPartyData();
    },[selectedTrainer,partyRefresh])

    const onHandleClick = () =>{
       setvisibility(prev=>!prev)
    }
    if(!trainerList) return;
    
    return(
        <>
            
            <button id="trainerBtn" onClick={onHandleClick}>{"trainer"} </button>
            <TrainerPartyPanel updateVisibility={setvisibility} visibility={visibility} trainerList={trainerList} partyList={party}/>
            
        </>
    )
}

export default Trainers