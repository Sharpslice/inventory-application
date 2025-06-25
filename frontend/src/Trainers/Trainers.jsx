import axios from "axios"
import { useContext, useEffect,useState } from "react"
import PartyTiles from "./TrainerPartyTiles"
import TrainerPartyPanel from "./TrainerPartyPanel"
import DropdownBtn from "../components/DropdownBtn"
import '../App.css'
import { RegionContext } from "../context"

function Trainers({refreshKey}){

    const [trainerList,setTrainerList] =useState(null)

    const [visibility,setvisibility] = useState(false)

    const [party,setParty] =useState([]);

    

    const {selectedTrainer} = useContext(RegionContext);
    useEffect(()=>{
        const fetchData =async() =>{
            try{
                const response = await axios.get('http://localhost:3000/api/trainer')
                console.log(response.data)
                setTrainerList(response.data)
            }catch(error){
                console.log("Unable to fetch trainers",error)
            }
        }
        fetchData();
    },[])

    useEffect(()=>{
        const fetchPartyData = async() =>{
           console.log('useEffect ran')
            try{
                const result = await axios.get(`http://localhost:3000/api/trainer/${selectedTrainer.id}/party`)
                console.log(result.data)
                setParty(result.data);
            }catch(error)
            {
                console.log("unable to fetch party",error)
            }
        }
        fetchPartyData();
    },[selectedTrainer,refreshKey])

    const onHandleClick = () =>{
    console.log('click')
       setvisibility(prev=>!prev)
    }
    if(!trainerList) return;
    //const testArray = [{name: 'pikachu',id:1},{name: 'charizard',id:2}, {name: 'squirtle',id:3}]
    return(
        <>
            
            <button id="trainerBtn" onClick={onHandleClick}>{"trainer"} </button>
            <TrainerPartyPanel updateVisibility={setvisibility} visibility={visibility} trainerList={trainerList} pokemonList={party}/>
            
        </>
    )
}

export default Trainers