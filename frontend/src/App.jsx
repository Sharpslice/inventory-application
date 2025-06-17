
import './App.css'
import PokemonGrid from './PokemonGrid/PokemonGrid'
import RegionBar from './RegionBar/RegionBar'
import { RegionContext } from './context'
import { RegionProvider } from './context'
function App() {
  

  return (
    <>
      <RegionProvider>
        <RegionBar/>
        <PokemonGrid/>
      </RegionProvider>

    </>
  )
}

export default App
