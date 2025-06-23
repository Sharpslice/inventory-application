function AddTrainerModal(){
    const [name,setName] = uesState(null);


    return(
        <div>
            <form>
                <label>Trainer Name:
                <input
                    type="text"
                    value={name}
                />
                </label>   
                <button type="submit">submit</button>
            </form>      
            
        </div>
    )
}

export default AddTrainerModal;