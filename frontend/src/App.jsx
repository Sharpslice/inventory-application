
import './App.css'
import PokemonGrid from './PokemonGrid/PokemonGrid'
import PokemonInfo from './PokemonInfo/PokemonInfo'
import RegionBar from './RegionBar/RegionBar'
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
          
          <PokemonInfo />
          
        </div>
        
      </RegionProvider>

    </>
  )
}

export default App
