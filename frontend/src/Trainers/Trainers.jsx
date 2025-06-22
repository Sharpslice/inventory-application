import axios from "axios"
import { useEffect,useState } from "react"
import PartyTiles from "./TrainerPartyTiles"
import TrainerPartyPanel from "./TrainerPartyPanel"
import DropdownBtn from "../components/DropdownBtn"


function Trainers(){

    const [trainer,setTrainer] =useState(null)

    const [visibility,setvisibility] = useState(false)
    useEffect(()=>{
        const fetchData =async() =>{
            try{
                const response = await axios.get('http://localhost:3000/api/trainer')
                console.log(response.data)
                setTrainer(response.data)
            }catch(error){
                console.log("Unable to fetch trainers",error)
            }
        }
        fetchData();
    },[])

    const onHandleClick = () =>{
        console.log('click')
       setvisibility(prev=>!prev)
    }
    if(!trainer) return;
    const testArray = [{name: 'pikachu'},{name: 'charizard'}, {name: 'squirtle'}]
    return(
        <>
            
            <button id="trainerBtn" onClick={onHandleClick}>{"trainer"} </button>
            <TrainerPartyPanel visibility={visibility} trainerList={trainer} pokemonList={testArray}/>
                   
               
            
        
        
        
        </>
    )
}

export default Trainers