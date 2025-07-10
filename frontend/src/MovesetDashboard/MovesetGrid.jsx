import MovesTile from "./MovesTile";

function MovesetGrid({moveset}){
    return(
        <div id ='movesGrid'>
                {moveset.map((move)=>(
                <MovesTile
                    key ={move.id}
                    move ={move}
                />
                ))}
            </div>
    )
}

export default MovesetGrid;