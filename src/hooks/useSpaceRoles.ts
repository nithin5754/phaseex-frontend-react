import { useGetSingleWorkSpaceQuery } from "@/app/redux/api/spaceApi";
import useAuth from "./useAuth";

interface Props {
  workspaceId:string|null;
}


const UseSpaceRoles = ({workspaceId}:Props) => {

   if(workspaceId){
    const {data:getSingleSpace}=useGetSingleWorkSpaceQuery(workspaceId,{
      pollingInterval:60000,
      refetchOnFocus:true,
      refetchOnMountOrArgChange:true
    })

    console.log(getSingleSpace,"space details")
    const userId=useAuth()

  
  
    if(!getSingleSpace){
  return false
    }
  
    if(getSingleSpace.workspaceOwner===userId?.userId){
      return true
    }else{
      return false

    }
   }


}
export default UseSpaceRoles