import './StatsTile.css'
function StatsTile({title,stat}){
    return(
    <div className = 'statsTile'>
        <span className="statsTitle">{title}</span>
        <span className="statsValue">{stat}</span>
    </div>
    )
}

export default StatsTile;