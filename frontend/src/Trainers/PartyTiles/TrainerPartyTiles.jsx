// eslint-disable-next-line no-unused-vars
import {motion} from "motion/react"
function TrainerPartyTiles({item,onSelectTrainerClick}){

    return(
        <>
            <motion.li className='trainerParty'>
                <div className="trainerParty__tile" onClick={item?()=>onSelectTrainerClick(item):null}>
                    <div className="trainerParty__tile-name">
                        {item?item.name:'add'}
                    </div>
                   
                </div>
            </motion.li>
        
        </>
    )
}

export default TrainerPartyTiles;