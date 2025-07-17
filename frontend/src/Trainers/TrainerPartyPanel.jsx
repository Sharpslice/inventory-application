
import TrainerPartyTiles from './PartyTiles/TrainerPartyTiles';
import './TrainerPartyPanel.css'
import './PartyTiles/partyTiles.css'
import PokemonPartyTiles from './PartyTiles/PokemonPartyTiles';
import { useContext, useEffect} from 'react';
import { RegionContext } from '../context';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react'

function TrainerPartyPanel({updateVisibility,visibility,trainerList, partyList}){
        
    

    const {setSelectedPokemon} = useContext(RegionContext)
    const {setSelectedTrainer} = useContext(RegionContext)
   

    const onSelectTrainerClick = (trainer) =>{
        
        setSelectedTrainer(trainer)
        updateVisibility(prev=>!prev)
    }
    const onSelectPokemonClick = (pokemon) =>{
        
        setSelectedPokemon({pokemon: pokemon, source: 'party'})
    }

    
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
 
    useEffect(()=>{
       
        
       
       
    },[visibility])
        
    return (
    <>
        <div className='header'>
            {visibility?"Select Trainer":"Current Party"}
        </div>
       <div id="wrapper">
        <AnimatePresence initial={false} mode='sync'>
            {visibility
                ?<motion.ul className='tileList'
                    key='trainerList'
                    initial={{x:-400}}
                    animate={{x:0}}
                    transition= {{duration:0.5}}
                    exit={{x:-400}}
                
                >
                      {createTiles(trainerList).map((item,index)=>{
                            return (
                                <TrainerPartyTiles 
                                    key ={`trainer-${index}`}  
                                    item = {item} 
                                    onSelectTrainerClick={onSelectTrainerClick}
                                    
                                />
                            
                            )})}
            </motion.ul>
            :<motion.ul className='tileList'
            key='pokemonList'
                    initial={{x:-400}}
                    animate={{x:0}}
                    exit={{x:-400}}
                    transition= {{duration:0.5}}>
                {createTiles(partyList).map((item,index)=>{
                        return (
                        
                            <PokemonPartyTiles 
                                key={`pokemon-${index}`} 
                                item = {item} 
                                onSelectPokemonClick ={onSelectPokemonClick}
                                
                                />
                        )}
                        )}

            </motion.ul>
        }
        </AnimatePresence>
        </div>
        
        
        
        
        
        
    
    
    </>
    )
}
export default TrainerPartyPanel;

{/* <div id="wrapper">
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
         */}


        //  createTiles(trainerList).map((item,index)=>{
        //             const className=visibility?"trainerParty slideIn ":"trainerParty"
                   
        //             return (
        //                 item
        //                 ?<TrainerPartyTiles 
        //                     key ={`trainer-${item.id}`} 
        //                     className={className}  
        //                     item = {item} 
        //                     onSelectTrainerClick={onSelectTrainerClick}
        //                 />
        //                 :<TrainerEmptyTile 
        //                     key= {`trainer_empty-${index}`} 
        //                     className={className} 
        //                 />
        //             )
        //             })