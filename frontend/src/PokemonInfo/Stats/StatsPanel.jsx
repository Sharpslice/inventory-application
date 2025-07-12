import StatsTile from "./StatsTile"
function StatsPanel({attribute}){
    return(
        <>
            <StatsTile title = {'HP'} stat={attribute.hp}/>
            <StatsTile title = {'ATTACK'} stat={attribute.attack}/>
            <StatsTile title = {'DEFENSE'} stat={attribute.defense}/>
            <StatsTile title = {'SP. ATK'} stat={attribute.special_attack}/>
            <StatsTile title = {'SP. DEF'} stat={attribute.special_defense}/>
            <StatsTile title = {'SPEED'} stat={attribute.speed}/>
        </>
    )
}
export default StatsPanel