
import { useState } from 'react'
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
  const [refreshKey,setRefreshKey] = useState(0);
 
  return (
    <>
      
      <RegionProvider>
        <div id="mainContainer">
          <div id="trainerContainer">
            <Trainers refreshKey={refreshKey} />
          </div>

          <div id='middleContainer'>
            <PokemonDashboard/>
          </div>
          

          <PokemonInfo setRefreshKey={setRefreshKey}/>
          
        </div>
        
      </RegionProvider>

    </>
  )
}

export default App
