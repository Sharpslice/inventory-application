import axios from "axios"
import { useContext } from "react"
import { RegionContext } from "../../context"

function DeleteFromCollectionBtn({pokemon}){
    const {selectedTrainer,setCollectionRefresh} = useContext(RegionContext)
    const onHandleClick = async() =>{
       
        try{
            const result = await axios.delete(`http://localhost:3000/api/trainer/${selectedTrainer.id}/pokemonCollection/${pokemon.id}`)
           
            if(result.data.success){
                
                setCollectionRefresh(prev=>prev+1)
                
            }
            else{
                
                console.log("backend error: unable to delete pokemon from collection")
            }
            
        }catch(error)
        {
            console.error(`unable to delete ${pokemon.name}`,error.message)
        }

        
        
    }

    return(
        <button onClick={()=>onHandleClick()}>
            {'Delete from collection'}
        </button>
    )
}

export default DeleteFromCollectionBtn;