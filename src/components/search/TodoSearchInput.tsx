import { useDispatch, useSelector } from "react-redux"
import { Input } from "../ui/input"
import { selectTodoQuery, setSearchTodoQuery, setTodoRecentlySearchSuggestion } from "@/app/redux/slice/todoSlice"






 const TodoSearchInput = () => {
  const dispatch=useDispatch()
  const searchTodoQuery=useSelector(selectTodoQuery)



  const handleFocus = () => {
   dispatch( setTodoRecentlySearchSuggestion(true))
  };

  const handleBlur = () => {
    setTimeout(() => {
      dispatch(setTodoRecentlySearchSuggestion(false))
    }, 200); 
  };
   return (
    <Input
    placeholder="Filter todo list here..."
    value={searchTodoQuery}
    onChange={(e) =>
     dispatch(setSearchTodoQuery(e.target.value))
    }
    onFocus={handleFocus}
    onBlur={handleBlur}
    className="max-w-sm h-8 w-[300px]"
  />
   )
 }
 export default TodoSearchInput