import { UserSearch } from "lucide-react";
import { Input } from "../ui/input"
import UseSpaceRoles from "@/hooks/useSpaceRoles";
import { useParams } from "react-router-dom";
import { lowerCase } from "@/lib/utils.data";


interface Props {
  searchQuery:string
  setSearchQuery:React.Dispatch<React.SetStateAction<string>>;
  inputRef:React.RefObject<HTMLInputElement>,
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
}
    

    const SearchUser = ({searchQuery,setSearchQuery,inputRef,setShowSuggestions}:Props) => {
      const {id}=useParams()

      if(typeof id !=='string'){
         return <h1>loading...</h1>
      }
    
    
        const isSOwner=UseSpaceRoles({workspaceId:id})
    

      const handleFocus = () => {
        setShowSuggestions(true);
      };
    
      const handleBlur = () => {
        setTimeout(() => {
          setShowSuggestions(false);
        }, 200); 
      };   
      return (
    <>

    
   {
    isSOwner&&(
      
<div className="relative p-2">
<UserSearch className="absolute mt-2 w-[18px]  ml-2"/>
<Input 
      className="rounded-md  px-8  "
      placeholder="Type username.."
      value={searchQuery}
      onChange={(e) => setSearchQuery(lowerCase(e.target.value))}
      ref={inputRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
</div>
    )
   }
    
    </>


      )
    }
    export default SearchUser