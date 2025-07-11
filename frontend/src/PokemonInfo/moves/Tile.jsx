function Tile({move}){
    return(
        
        <div className='moveset-panel__tile'>
            {move? move.name:'empty'}

        </div>
       
        
    )
}
export default Tile