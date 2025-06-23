import plus from '../assets/plus.svg'

function TrainerEmptyTile(){

    const onHandleClick=()=>{
        console.log('click')
    }

    return(
    <>
    <li>
        <button className="emptyTile" onClick={onHandleClick}>
            <img src={plus} alt="" />
        </button>
    </li>
        
    
    
    </>)
}

export default TrainerEmptyTile;