import { useGetSearchSpaceCollabMutation } from "@/app/redux/api/searchApi";
import { Input } from "../ui/input";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSearchTodoCollab,
  selectSearchQuery,
  setSearchTodoCollab,
  setSearchTodoQuery,
  setSuggestionClose,
  setSuggestionOpen,
} from "@/app/redux/slice/todoSlice";

const AddTodoCollabInput = () => {
  const { id } = useParams();

  const selectListQuerySearch = useSelector(selectSearchQuery);
  const dispatch = useDispatch();

  const handleFocus = () => {
    dispatch(setSuggestionOpen(true));
  };

  const handleBlur = () => {
    setTimeout(() => {
      dispatch(setSuggestionClose(false));
    }, 200);
  };

  const [getSearchSpaceCollab] = useGetSearchSpaceCollabMutation();
  useEffect(() => {
    fetch();
  }, [selectListQuerySearch]);

  const fetch = async () => {
    dispatch(removeSearchTodoCollab(undefined));
    const response = await getSearchSpaceCollab({
      workspaceId: id ? id : "",
      collabKey: selectListQuerySearch,
    }).unwrap();
    if (response && response.length > 0) {
      dispatch(setSearchTodoCollab(response));
    }
  };

  return (
    <>
      <Input
        placeholder="add list managers and viewers"
        value={selectListQuerySearch}
        onChange={(e) => dispatch(setSearchTodoQuery(e.target.value))}
        className="max-w-sm  w-[300px] border-border  text-primary"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </>
  );
};
export default AddTodoCollabInput;
