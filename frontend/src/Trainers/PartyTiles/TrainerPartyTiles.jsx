function TrainerPartyTiles({item,onSelectTrainerClick}){

    return(
        <>
            <li>
                <div className="tiles" onClick={()=>onSelectTrainerClick(item)}>
                    {item.name}
                   
                </div>
            </li>
        
        </>
    )
}

export default TrainerPartyTiles;