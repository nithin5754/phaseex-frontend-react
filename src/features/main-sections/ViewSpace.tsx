
import { useGetAllSpacesQuery } from "@/app/api/spaceApi";
import { SpaceHome } from "../../components/work-space/index";


const ViewSpace = () => {

  const {data:getAllSpaces,isLoading}=useGetAllSpacesQuery()

  if(isLoading)return <h1>loading.....</h1>
 
  if(getAllSpaces){
    console.log(getAllSpaces,"response data,space");


  }


  


  
  return (
    <SpaceHome allSpaces={getAllSpaces?getAllSpaces:[]} />
  )
}
export default ViewSpace