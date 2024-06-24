

import { useGetSearchSpaceCollabMutation } from "@/app/redux/api/searchApi";
import { Input } from "../ui/input";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchQuery,
  setSearchTaskQuery,
  setSuggestionClose,
  setSuggestionOpen,
} from "@/app/redux/slice/taskSlice";
import { removeSearchTaskCollab, setSearchTaskCollab } from "@/app/redux/slice/taskSlice";

const AddTaskCollabInput = () => {
  const { id } = useParams();

  const selectTaskQuerySearch=useSelector(selectSearchQuery)
  const dispatch = useDispatch();


  const handleFocus = () => {
    dispatch( setSuggestionOpen(true))
   };
 
   const handleBlur = () => {
     setTimeout(() => {
       dispatch(setSuggestionClose(false))
     }, 200); 

    }


  const [getSearchSpaceCollab] = useGetSearchSpaceCollabMutation();
  useEffect(() => {
    fetch();
  }, [selectTaskQuerySearch]);


  const fetch = async () => {
    
    dispatch(removeSearchTaskCollab(undefined));
    const response = await getSearchSpaceCollab({
      workspaceId: id ? id : "",
      collabKey: selectTaskQuerySearch,
    }).unwrap();
    if (response && response.length > 0) {
      dispatch(setSearchTaskCollab(response));
    }
  }





  return (
    <>
      <Input
        placeholder="add task managers and viewers"
        value={selectTaskQuerySearch}
        onChange={(e) => dispatch(setSearchTaskQuery(e.target.value))}
        className="max-w-sm  w-[300px] border-border  text-primary"
        onFocus={handleFocus}
        onBlur={handleBlur}
        
      />
    </>
  );
};
export default AddTaskCollabInput;
