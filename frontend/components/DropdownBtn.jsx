import './DropdownBtn.css'

function DropdownBtn({title,data}){


    return(
        <>
            <div id="dropDownBtn">
                <button>
                    {title}
                </button>
                {data.map((trainer)=>
                    <li key = {trainer.id}>
                        {trainer.name}
                    </li>
                )}
            </div>
        </>
    )
}

export default DropdownBtn;