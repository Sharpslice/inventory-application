function MovesetModeBtn({setMovesMode}){
    return(
        <button onClick={()=>{setMovesMode(prev=>!prev)}}>
            {"swap mode"}
        </button>
    )
    
}
export default MovesetModeBtn