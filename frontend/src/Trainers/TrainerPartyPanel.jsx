import TrainerPartyTiles from './TrainerPartyTiles';
import './TrainerPartyPanel.css'
function TrainerPartyPanel({visibility,trainerList, pokemonList}){
        
    const createTiles=(list)=>{
        const holder =[]
        for(let i = 0; i < 6;i++)
        {
            if(list[i] === undefined){
                holder.push({name: "test"})
            }
            else{
                holder.push(list[i])
            }
            
        }
        return holder;
    }
        
    return (
    <>
        <div className='header'>
            {visibility?"Select Trainer":"Current Party"}
        </div>
        <div id="wrapper">
            <ul className={visibility?"tileList": "tileList hiddenx"}>
           {createTiles(trainerList).map((item)=>{
                return <TrainerPartyTiles  item = {item}/>
           })}
            </ul>
            <ul className={visibility?'tileList hiddenx':'tileList slideIn'}>
                    {createTiles(pokemonList).map((item)=>{
                    return <TrainerPartyTiles item = {item}/>
                })}
            </ul>
        </div>
        
        
        
        
        
    
    
    </>
    )
}
export default TrainerPartyPanel;