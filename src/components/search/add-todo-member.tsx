import { useGetSearchTodoCollabMutation } from "@/app/redux/api/searchApi";
import { Input } from "../ui/input";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSearchTodoCollab,
  selectTodoCollabQuery,
  setSearchTodoCollab,
  setSearchTodoCollabQuery,
  setSuggestionClose,
  setSuggestionOpen,
} from "@/app/redux/slice/todoSlice";


interface Props {
  taskId:string
}

const AddTodoCollabInput = ({taskId}:Props) => {
  const { id,folderId,listId } = useParams();

  const selectListQuerySearch = useSelector(selectTodoCollabQuery);
  const dispatch = useDispatch();

  const handleFocus = () => {
    dispatch(setSuggestionOpen(true));
  };

  const handleBlur = () => {
    setTimeout(() => {
      dispatch(setSuggestionClose(false));
    }, 200);
  };

  const [getSearchTodoCollab] = useGetSearchTodoCollabMutation();
  useEffect(() => {
    fetch();
  }, [selectListQuerySearch]);

  const fetch = async () => {
    dispatch(removeSearchTodoCollab(undefined));
    const response = await getSearchTodoCollab({
      workspaceId: id ? id : "",
      folderId:folderId?folderId:"",
      listId:listId?listId:"",
      taskId:taskId?taskId:"",
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
        onChange={(e) => dispatch(setSearchTodoCollabQuery(e.target.value))}
        className="max-w-sm  w-[300px] border-border  text-primary"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </>
  );
};
export default AddTodoCollabInput;
