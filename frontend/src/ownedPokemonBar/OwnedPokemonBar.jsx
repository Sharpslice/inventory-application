import './OwnedPokemonBar.css'

function OwnedPokemonBar({setInventoryFlag}){
    return(
        <button id='ownedPokemonBar' onClick={()=>setInventoryFlag(prev=>!prev)}>
            {'Owned'}
        </button>
    )
}

export default OwnedPokemonBar