
import './App.css'
import PokemonGrid from './PokemonGrid/PokemonGrid'
import RegionBar from './RegionBar/RegionBar'
import { RegionContext } from './context'
import { RegionProvider } from './context'
function App() {
  

  return (
    <>
      <RegionProvider>
        <div id="mainContainer">
          <RegionBar/>
          <PokemonGrid/>
        </div>
        
      </RegionProvider>

    </>
  )
}

export default App
