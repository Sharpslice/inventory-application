import axios from "axios"
import { useContext } from "react"
import { RegionContext } from "../../context"

function DeleteFromCollectionBtn({pokemon}){
    const {selectedTrainer,setCollectionRefresh} = useContext(RegionContext)
    const onHandleClick = async() =>{

        try{
            await axios.delete(`http://localhost:3000/api/trainer/${selectedTrainer.id}/pokemonCollection/${pokemon.id}`,)
            console.log('deleting' ,pokemon.name)
            setCollectionRefresh(prev=>prev+1)
        }catch(error)
        {
            console.log(`unable to delete ${pokemon.name}`,error.message)
        }

        
        
    }

    return(
        <button onClick={()=>onHandleClick(pokemon)}>
            {'Delete from collection'}
        </button>
    )
}

export default DeleteFromCollectionBtn;