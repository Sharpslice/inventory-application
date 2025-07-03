import axios from "axios"
import { useContext } from "react"
import { RegionContext } from "../context"

function DeleteFromCollectionBtn({pokemon}){
    const {selectedTrainer} = useContext(RegionContext)
    const onHandleClick = async() =>{
        await axios.post(`http://localhost:3000/api/trainer/pokemonCollection`,{trainerId: selectedTrainer.id, pokemonId: pokemon.id})
    }

    return(
        <button onClick={()=>onHandleClick(pokemon)}>
            {'Delete from collection'}
        </button>
    )
}

export default DeleteFromCollectionBtn;