import { isValidElement, useState } from 'react';
import './DropdownBtn.css'

function DropdownBtn({dropDownTitle,listClassName,valueList}){
    const [visibility,setVisibility] = useState(false)
    const onHandleClick = ()=>{
        setVisibility(prev => !prev)
        console.log('click')
    }

   
    return(
        <>
            <div id = 'dropDownMenu'>
                <button className={"dropDownBtn"} onClick={onHandleClick}>
                    {dropDownTitle}
                </button>
                <ul className={visibility? listClassName: `${listClassName} hidden`}>
                    {valueList.map((item)=>{
                        
                        return(
                            <li key = {item.id}>
                            {isValidElement(item.component) 
                                ? item.component 
                                : <button onClick={item.function}>
                                    {item.title}
                                    </button>}
                            
                            </li>  
                        )
                        
                        
                    })}

                </ul>
            </div>
            
                
            
        </>
    )
}

export default DropdownBtn;