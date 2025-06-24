import TrainerPartyTiles from './TrainerPartyTiles';
import './TrainerPartyPanel.css'
import TrainerEmptyTile from './TrainerEmptyTile';
import PokemonEmptyTile from './PokemonEmptyTile';
import { useState } from 'react';
function TrainerPartyPanel({visibility,trainerList, pokemonList}){
        
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
    const onHandleClick = () =>{
        console.log('click')
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
                ?<TrainerPartyTiles key ={`trainer-${item.id}`}  item = {item}/>
                :<TrainerEmptyTile key= {`trainer_empty-${index}`} />
           )})}
            </ul>
            <ul className={visibility?'tileList hiddenx':'tileList slideIn'}>
                    {createTiles(pokemonList).map((item,index)=>{
                    return (
                        item
                    ?<TrainerPartyTiles key={`pokemon-${item.id}`} item = {item}/>
                    :<PokemonEmptyTile key={`pokemon_empty-${index}` } />
                )
                })}
            </ul>
        </div>
        
        
        
        
        
    
    
    </>
    )
}
export default TrainerPartyPanel;