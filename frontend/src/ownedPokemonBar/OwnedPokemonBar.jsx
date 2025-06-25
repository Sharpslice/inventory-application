import './OwnedPokemonBar.css'

function OwnedPokemonBar({setInventoryFlag}){
    return(
        <button id='ownedPokemonBar' onClick={()=>setInventoryFlag(true)}>
            {'Owned'}
        </button>
    )
}

export default OwnedPokemonBar