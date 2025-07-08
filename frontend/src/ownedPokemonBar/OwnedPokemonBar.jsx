import './OwnedPokemonBar.css'

function OwnedPokemonBar({setDisplay}){
    const onHandleClick =()=>{
        setDisplay(prev =>prev === 'region' ? 'owned': 'region')
        
    }
    return(
        <div id='ownedPokemonBar'>
            <button  onClick={onHandleClick}>
                {'Owned'}
            </button>
        </div>
        
    )
}

export default OwnedPokemonBar