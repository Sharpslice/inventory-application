import MovesTile from "./MovesTile";

function MovesetGrid({moveset,setSelectedMove}){
    return(
        <div id ='moveset-grid'>
                {moveset.map((move)=>(
                <MovesTile
                    key ={move.id}
                    move ={move}
                    setSelectedMove={setSelectedMove}
                />
                ))}
            </div>
    )
}

export default MovesetGrid;