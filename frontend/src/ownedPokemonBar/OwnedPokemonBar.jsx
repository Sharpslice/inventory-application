import './OwnedPokemonBar.css'

function OwnedPokemonBar({setDisplay,setRefreshKey}){
    const onHandleClick =()=>{
        setDisplay(prev =>prev === 'region' ? 'owned': 'region')
        setRefreshKey(prev=>prev+1)
    }
    return(
        <button id='ownedPokemonBar' onClick={onHandleClick}>
            {'Owned'}
        
        </button>
    )
}

export default OwnedPokemonBar