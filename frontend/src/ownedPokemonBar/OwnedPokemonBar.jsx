import './OwnedPokemonBar.css'

function OwnedPokemonBar({setDisplay}){
    const onHandleClick =()=>{
        setDisplay(prev =>prev === 'region' ? 'owned': 'region')
        
    }
    return(
        <button id='ownedPokemonBar' onClick={onHandleClick}>
            {'Owned'}
        
        </button>
    )
}

export default OwnedPokemonBar