import { FirstTwoCharacter } from "@/lib/FirstTwoCharacter";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Trash } from "lucide-react";
import { ReceiveCollaboratorType, useDeleteCollaboratorMutation, useGetAllCollabInSpaceQuery } from "@/app/redux/api/spaceApi";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import EmptyMembers from "./EmptyMembers";
import useAuth from "@/hooks/useAuth";





const MembersList = () => {

  const {id}=useParams()

  const user=useAuth()

  if(!id||typeof id !=='string'){
    return <h1>loading....</h1>
  }

  const {data:getAllCollab,error}=useGetAllCollabInSpaceQuery(id, {
    pollingInterval:120000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })


  console.log(getAllCollab,"after delete");
  console.log(error,"error in updating");
  
  


  const [deleteCollaborator]=useDeleteCollaboratorMutation()


   const handleDelete=async (workspaceId:string,collaboratorId:string)=>{
      try {
      let response= await deleteCollaborator({workspaceId,collaboratorId}).unwrap()
      console.log(response,"response, collab-delete");
      } catch (error) {
        console.log(error,"delete collaborator");
        
      }
   }

  return (


<Card
x-chunk="dashboard-01-chunk-5 "
className="dark:border dark:border-none"
>
<CardHeader>
        <CardTitle>Invited members</CardTitle>
 
      </CardHeader>
<CardContent className="grid gap-8">
  <>
  {getAllCollab && getAllCollab.length > 0 ? (
          getAllCollab.map((collab) => (
            <div key={collab.id} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>{FirstTwoCharacter(collab.assignee)}</AvatarFallback>
              </Avatar>
              <div className="flex gap-2 ">
                <p className="text-sm font-sfpro leading-none">{collab.assignee}</p>
 
              </div>
       
              <>
         {collab.verified?(<h1 className="text-green-800">Accepted</h1>):(<h1 className="border border-border rounded-md text-sm w-[100px] px-[5px] text-red-800">not Accepted</h1>)}
               </>

               {/* <div className="flex gap-2 ">
                <p className="text-sm font-medium leading-none">{collab.id===user?.userId.toString()?"owner":"developer"}</p>
 
              </div> */}
            
              <div className="ml-auto font-medium">
                <button className="text-gray-500 hover:text-gray-700" onClick={() => handleDelete(id, collab.id)}>
                  <Trash size={17} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <EmptyMembers/>
        )}
  </>
</CardContent>
</Card>
  )
}
export default MembersList