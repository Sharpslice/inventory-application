function TrainerPartyTiles({item,onSelectTrainerClick}){

    return(
        <>
            <li>
                <div className="tiles" onClick={()=>onSelectTrainerClick(item)}>
                    <div className="trainerTileName">{item.name}</div>
                   
                </div>
            </li>
        
        </>
    )
}

export default TrainerPartyTiles;