import { useGetSearchSpaceCollabMutation } from "@/app/redux/api/searchApi";
import { Input } from "../ui/input";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSearchListCollab,
  selectSearchQuery,
  setSearchListCollab,
  setSearchListQuery,
  setSuggestionClose,
  setSuggestionOpen,
} from "@/app/redux/slice/listSlice";

const AddListCollabInput = () => {
  const { id } = useParams();

  const selectListQuerySearch=useSelector(selectSearchQuery)
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
  }, [selectListQuerySearch]);


  const fetch = async () => {
    
    dispatch(removeSearchListCollab(undefined));
    const response = await getSearchSpaceCollab({
      workspaceId: id ? id : "",
      collabKey: selectListQuerySearch,
    }).unwrap();
    if (response && response.length > 0) {
      dispatch(setSearchListCollab(response));
    }
  }





  return (
    <>
      <Input
        placeholder="add list managers and viewers"
        value={selectListQuerySearch}
        onChange={(e) => dispatch(setSearchListQuery(e.target.value))}
        className="max-w-sm  w-[300px] border-border  text-primary"
        onFocus={handleFocus}
        onBlur={handleBlur}
        
      />
    </>
  );
};
export default AddListCollabInput;
