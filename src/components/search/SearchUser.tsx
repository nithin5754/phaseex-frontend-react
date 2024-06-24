import { Search, UserSearch } from "lucide-react";
import { Input } from "../ui/input"


interface Props {
  searchQuery:string
  setSearchQuery:React.Dispatch<React.SetStateAction<string>>;
  inputRef:React.RefObject<HTMLInputElement>,
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
}
    

    const SearchUser = ({searchQuery,setSearchQuery,inputRef,setShowSuggestions}:Props) => {
      const handleFocus = () => {
        setShowSuggestions(true);
      };
    
      const handleBlur = () => {
        setTimeout(() => {
          setShowSuggestions(false);
        }, 200); 
      };   
      return (
<div className="relative p-2">
  <UserSearch className="absolute mt-2 w-[18px]  ml-2"/>
<Input
        className="rounded-full px-8  "
        placeholder="Type username.."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
</div>
      )
    }
    export default SearchUser