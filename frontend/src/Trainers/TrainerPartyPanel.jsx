import TrainerPartyTiles from './PartyTiles/TrainerPartyTiles';
import './TrainerPartyPanel.css'
import './PartyTiles/partyTiles.css'
import './EmptyTiles/emptyTiles.css'
import TrainerEmptyTile from './EmptyTiles/TrainerEmptyTile';
import PokemonEmptyTile from './EmptyTiles/PokemonEmptyTile';
import PokemonPartyTiles from './PartyTiles/PokemonPartyTiles';
import { useContext } from 'react';
import { RegionContext } from '../context';
function TrainerPartyPanel({updateVisibility,visibility,trainerList, partyList}){
        
    const createTiles=(list)=>{
        const holder =[]
        for(let i = 0; i < 6;i++)
        {
            if(list[i] === undefined){
                holder.push(undefined)
            }
            else{
                holder.push(list[i])
            }
            
        }
        return holder;
    }

    const {setSelectedPokemon} = useContext(RegionContext)
    const {setSelectedTrainer} = useContext(RegionContext)

    const onSelectTrainerClick = (trainer) =>{
        
        setSelectedTrainer(trainer)
        updateVisibility(prev=>!prev)
    }
    const onSelectPokemonClick = (pokemon) =>{
        
        setSelectedPokemon({pokemon: pokemon, source: 'party'})
    }
    
        
    return (
    <>
        <div className='header'>
            {visibility?"Select Trainer":"Current Party"}
        </div>
        <div id="wrapper">
            <ul className={visibility?"tileList": "tileList hiddenx"}>
           {createTiles(trainerList).map((item,index)=>{
                return (
                
                item
                ?<TrainerPartyTiles key ={`trainer-${item.id}`}  item = {item} onSelectTrainerClick={onSelectTrainerClick}/>
                :<TrainerEmptyTile key= {`trainer_empty-${index}`} />
           )})}
            </ul>
            <ul className={visibility?'tileList hiddenx':'tileList slideIn'}>
                    {createTiles(partyList).map((item,index)=>{
                    return (
                        item
                    ?<PokemonPartyTiles key={`pokemon-${item.id}`} item = {item} onSelectPokemonClick ={onSelectPokemonClick}/>
                    :<PokemonEmptyTile key={`pokemon_empty-${index}` } />
                )
                })}
            </ul>
        </div>
        
        
        
        
        
    
    
    </>
    )
}
export default TrainerPartyPanel;