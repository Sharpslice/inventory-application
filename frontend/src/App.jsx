
import './App.css'
import PokemonGrid from './PokemonGrid/PokemonGrid'
import PokemonInfo from './PokemonInfo/PokemonInfo'
import RegionBar from './RegionBar/RegionBar'
import Trainers from './Trainers/Trainers'
import { RegionContext } from './context'
import { RegionProvider } from './context'
function App() {
  

  return (
    <>
      
      <RegionProvider>
        <div id="mainContainer">

          <div id="trainerContainer">
            <Trainers/>
          </div>

          <RegionBar/>
          <PokemonGrid/>

          <PokemonInfo/>
        </div>
        
      </RegionProvider>

    </>
  )
}

export default App
