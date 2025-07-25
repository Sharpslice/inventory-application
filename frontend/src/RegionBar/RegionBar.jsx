import "./RegionBar.css"
import {useEffect,useState} from 'react'
import axios from 'axios';
import triangleLeft from '../assets/triangle-left.svg';
import triangleRight from '../assets/triangle-right.svg';
import { RegionContext } from "../context";

function RegionBar({setCurrentRegion}){
    const [regions,setRegions] = useState(null)
    const [currentIndex,setCurrentIndex] = useState(0);
    

    
    useEffect(()=>{
        const getRegionData = async()=>{
            try{
                const result = await axios.get('http://localhost:3000/api/region');
                if(result.data.success){
                    setRegions(result.data.data)
                }
                else{
                    console.error('unable to fetch region')
                }
                
            } catch(error){
                console.log("Network error",error.message)
            }
        }
        getRegionData()
        
    },[])

    useEffect(()=>{
        if(!regions) return;
        setCurrentRegion(
            {id: regions[currentIndex].id,
            region: regions[currentIndex].region
            }
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentIndex,regions])

    const incrementClick = ()=>{
        
        setCurrentIndex((currentIndex+1) % regions.length)
    }

    const deincrementClick =()=>{
        if(currentIndex-1 <0){
            setCurrentIndex(regions.length-1)
        }
        else{
            setCurrentIndex(currentIndex-1)
        }
        
    }
    

    if(!regions) return <div>loading...</div>
    
    return(
        <>
            <div id="regionBar">
                <button onClick={deincrementClick}>
                    <img src={triangleLeft}></img>
                </button>
                <div className="regionText">
                    {
                        regions[currentIndex].region
                    }
                </div>
                <button onClick={incrementClick}>
                    <img src={triangleRight}></img>
                </button>

            </div>
        
        </>
    )
}

export default RegionBar