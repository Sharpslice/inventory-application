
import { useState } from 'react'
import './App.css'
import PokemonGrid from './PokemonGrid/PokemonGrid'
import PokemonInfo from './PokemonInfo/PokemonInfo'
import RegionBar from './RegionBar/RegionBar'
import Trainers from './Trainers/Trainers'
import { RegionContext } from './context'
import { RegionProvider } from './context'
import OwnedPokemonBar from './ownedPokemonBar/OwnedPokemonBar'
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
            <div id='navBar'>
              <RegionBar/>
              <OwnedPokemonBar/>
            </div>
            <PokemonGrid/>
          </div>
          

          <PokemonInfo setRefreshKey={setRefreshKey}/>
          
        </div>
        
      </RegionProvider>

    </>
  )
}

export default App
