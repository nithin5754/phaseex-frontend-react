import LootieEmptyMembers from '../../../public/json/boxing.json'
import { LottieAnimation } from '../lootie/Lootie'

 const EmptyMembers = () => {
   return (
     <LottieAnimation animationData={LootieEmptyMembers} height={200} width={200}/>
   )
 }
 export default EmptyMembers