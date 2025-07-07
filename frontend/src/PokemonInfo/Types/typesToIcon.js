import BugIcon from "../../assets/types/bug.svg";
import DarkIcon from "../../assets/types/dark.svg";
import DragonIcon from "../../assets/types/dragon.svg";
import ElectricIcon from "../../assets/types/electric.svg";
import FairyIcon from "../../assets/types/fairy.svg";
import FightingIcon from "../../assets/types/fighting.svg";
import FireIcon from "../../assets/types/fire.svg";
import FlyingIcon from "../../assets/types/flying.svg";
import GhostIcon from "../../assets/types/ghost.svg";
import GrassIcon from "../../assets/types/grass.svg";
import GroundIcon from "../../assets/types/ground.svg";
import IceIcon from "../../assets/types/ice.svg";
import NormalIcon from "../../assets/types/normal.svg";
import PoisonIcon from "../../assets/types/poison.svg";
import PsychicIcon from "../../assets/types/psychic.svg";
import RockIcon from "../../assets/types/rock.svg";
import SteelIcon from "../../assets/types/steel.svg";
import WaterIcon from "../../assets/types/water.svg";

const TypeToIcon = {
    bug: {icon: BugIcon, color: '#92BD2D'},
    dark: {icon: DarkIcon, color: '#595761'},
    dragon: {icon: DragonIcon, color:'#0C6AC8'},
    electric: {icon: ElectricIcon, color:'#F2D94E'},
    fairy: {icon: FairyIcon, color:'#EF90E6'},
    fighting: {icon: FightingIcon, color:'#D3425F'},
    fire: {icon: FireIcon, color: '#FBA64C'},
    flying: {icon: FlyingIcon, color:'#A1BBEC'},
    ghost: {icon: GhostIcon, color: '#5F6DBC'},
    grass: {icon: GrassIcon, color: '#60BD58'},
    ground: {icon: GroundIcon, color:'#DA7C4D' },
    ice: {icon: IceIcon, color: '#76D1C1' },
    normal: {icon: NormalIcon, color: '#A0A29F'},
    poison: {icon: PoisonIcon, color: '#B763CF'},
    psychic: {icon: PsychicIcon, color: '#FA8582'},
    rock: {icon: RockIcon, color: '#C9BC8A'},
    steel: {icon: SteelIcon, color: '#5795A3'},
    water: {icon: WaterIcon, color: '#539DDF'},
}

function getTypeIcon(type){
    console.log(TypeToIcon[type])
    return TypeToIcon[type];
}

export default getTypeIcon