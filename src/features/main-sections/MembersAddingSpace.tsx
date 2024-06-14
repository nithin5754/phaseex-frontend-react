import { MembersList, SearchPeople } from "@/components/memebers/index"



 const MembersAddingSpace = () => {
   return (
    <div className="mb-7 p-0 top-0 flex flex-col  dark:bg-background dark:text-white dark:gap-4 pr-8">
      <SearchPeople/>
      <MembersList/>
     </div>
   )
 }
 export default MembersAddingSpace