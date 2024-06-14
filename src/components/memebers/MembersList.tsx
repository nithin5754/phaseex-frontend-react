import { FirstTwoCharacter } from "@/lib/FirstTwoCharacter";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Trash } from "lucide-react";
import { ReceiveCollaboratorType, useGetAllCollabInSpaceQuery } from "@/app/redux/api/spaceApi";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";





const MembersList = () => {

  const {id}=useParams()

  if(!id||typeof id !=='string'){
    return <h1>loading....</h1>
  }

  const {data:getAllCollab}=useGetAllCollabInSpaceQuery(id, {
    pollingInterval:120000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

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
    {getAllCollab &&
      getAllCollab.length > 0 &&
      getAllCollab.map((collab: ReceiveCollaboratorType) => {
        return (
    <div className="flex items-center gap-4">
    <Avatar className="hidden h-9 w-9 sm:flex"  >
      <AvatarImage src="/avatars/01.png" alt="Avatar" />
      <AvatarFallback>{FirstTwoCharacter(collab.assignee)}</AvatarFallback>
    </Avatar>
    <div className="grid gap-1">
      <p className="text-sm font-medium leading-none">
      {collab.assignee}
      </p>
    </div>
    <div className="ml-auto font-medium">   <button className="text-gray-500 hover:text-gray-700">
<Trash size={17} />
</button></div>
  </div>
        );
      })}
  </>
</CardContent>
</Card>
  )
}
export default MembersList