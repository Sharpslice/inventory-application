import axios from "axios"
import { useContext } from "react"
import { RegionContext } from "../../context"

function DeleteFromCollectionBtn({pokemon,setRefreshKey}){
    const {selectedTrainer} = useContext(RegionContext)
    const onHandleClick = async() =>{
        await axios.delete(`http://localhost:3000/api/trainer/${selectedTrainer.id}/pokemonCollection/${pokemon.id}`,)
        setRefreshKey(prev=>prev+1)
    }

    return(
        <button onClick={()=>onHandleClick(pokemon)}>
            {'Delete from collection'}
        </button>
    )
}

export default DeleteFromCollectionBtn;