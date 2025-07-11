import {getTypeIcon} from "../PokemonInfo/Types/typesToIcon";
import './MovesetDashboard.css'
function MovesTile({move,setSelectedMove}){

    const type = getTypeIcon(move.type);
    const onSelectClick=()=>{
        setSelectedMove(move)
        console.log(move)
    }
    return(
        <div className="moveset-grid__tile" style={{backgroundColor: type.color}} onClick={onSelectClick}>
            <div className="moveset-grid__tile-icon" style={{backgroundColor : type.color}}>
                <img src={type.icon} alt="type-icon" />
            </div>
            <div className = 'moveset-grid__tile-text'>
                <div>{move.name}</div>
            </div>
        </div>

    )
}
export default MovesTile;