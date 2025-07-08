
import './App.css'
import PokemonInfo from './PokemonInfo/PokemonInfo'
import Trainers from './Trainers/Trainers'
import { RegionContext } from './context'
import { RegionProvider } from './context'
import OwnedPokemonBar from './ownedPokemonBar/OwnedPokemonBar'
import PokemonDashboard from './PokemonDashboard/PokemonDashboard'
function App() {

 
  return (
    <>
      <RegionProvider>
        <div id="mainContainer">
          <div id="trainerContainer">
            <Trainers />
          </div>

          <div id='middleContainer'>
            <PokemonDashboard/>
          </div>
          
          <div id='infoContainer'>
            <PokemonInfo />
          </div>
        </div>
        {/* <footer>Pokemon</footer> */}
      </RegionProvider>

    </>
  )
}

export default App
