import getTypeIcon from "../PokemonInfo/Types/typesToIcon";
import './MovesetDashboard.css'
function MovesTile({move}){

    const type = getTypeIcon(move.type);
    return(
        <div className="moveTile" style={{backgroundColor: type.color}}>
            <div style={{backgroundColor : type.color}}>
                <img src={type.icon} alt="" />
            </div>
            <div className = 'moveText'>
                <div>{move.name}</div>
            </div>
        </div>

    )
}
export default MovesTile;