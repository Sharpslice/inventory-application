import axios from "axios"
import { useEffect,useState } from "react"
import PartyTiles from "./PartyTiles"
import Party from "./Party"
import DropdownBtn from "../../components/DropdownBtn"

function Trainers(){

    const [trainer,setTrainer] =useState(null)
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

    return(
        <>
            <div>
                <DropdownBtn title ={"Trainer"} data = {trainer}/>
                {/* <Party
                    trainer={trainer}
                /> */}
                   
               
            </div>
        
        
        
        </>
    )
}

export default Trainers