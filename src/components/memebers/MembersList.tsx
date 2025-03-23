
import { ReceiveCollaboratorType } from "@/app/redux/api/spaceApi";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import EmptyMembers from "./EmptyMembers";

import {SingleMembers} from "./index";
import { FC } from "react";





const MembersList:FC<{data: [] | ReceiveCollaboratorType[],id:string ,title:string}> = ({data,id,title}) => {


  return (


    <Card className=" h-[52vh] border border-transparent">
<CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
<CardContent className="grid gap-8">
  <>
  {data && data.length > 0 ? (
          data.map((collab) => (
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