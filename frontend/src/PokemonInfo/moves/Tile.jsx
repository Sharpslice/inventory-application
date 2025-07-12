function Tile({id,move,setSelectedTile}){
    const onSelectClick=()=>{
        setSelectedTile(id)
        console.log("tile: "+id)
    }

    return(
        
        <div className='moveset-panel__tile' onClick={onSelectClick}>
            {move? move.name:'empty'}

        </div>
       
        
    )
}
export default Tile