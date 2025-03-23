
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

import SearchPeople from "./SearchPeople";


const FindMembers = () => {


  return (
    <Card className=" h-full border border-transparent">
    <CardHeader>
      <CardTitle>Find Members</CardTitle>
    </CardHeader>
      

    <CardContent className="space-y-2">
  <SearchPeople/>

 
    </CardContent>
  </Card>
  )
}
export default FindMembers