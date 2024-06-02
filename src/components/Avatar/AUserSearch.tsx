import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"



 const AUserSearch = () => {
   return (
    <Avatar className="w-[24px] h-[24px] mr-4">
    <AvatarImage className="" src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
   )
 }
 export default AUserSearch