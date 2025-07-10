
import './App.css'
import './animation.css'
import PokemonInfo from './PokemonInfo/PokemonInfo'
import Trainers from './Trainers/Trainers'

import { RegionProvider } from './context'

import PokemonDashboard from './PokemonDashboard/PokemonDashboard'
import { useState } from 'react'
import MovesetDashboard from './MovesetDashboard/MovesetDashboard'
function App() {

  const [movesMode,setMovesMode] = useState(false);
 
  return (
    <>
      <RegionProvider>
        <div id="mainContainer">

          {movesMode && <MovesetDashboard/>}

          <div id="trainerContainer" className={movesMode? 'hide': null}>
            <Trainers />
          </div>

          <div id='middleContainer' className={movesMode? 'hide': null}>
            <PokemonDashboard/>
          </div>
          
          <div id='infoContainer'>
            <PokemonInfo setMovesMode={setMovesMode}/>
          </div>
        </div>
        {/* <footer>Pokemon</footer> */}
      </RegionProvider>

    </>
  )
}

export default App
