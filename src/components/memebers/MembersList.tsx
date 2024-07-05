
import { useGetAllCollabInSpaceQuery } from "@/app/redux/api/spaceApi";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import EmptyMembers from "./EmptyMembers";

import {SingleMembers} from "./index";





const MembersList = () => {

  const {id}=useParams()



  if(!id||typeof id !=='string'){
    return <h1>loading....</h1>
  }

  const {data:getAllCollab,error}=useGetAllCollabInSpaceQuery(id, {
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
  {getAllCollab && getAllCollab.length > 0 ? (
          getAllCollab.map((collab) => (
          <SingleMembers collab={collab} workspaceId={id}/>
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