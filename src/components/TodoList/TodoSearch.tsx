import { TodoSearchInput } from "../search/index";
import { useEffect } from "react";

import { useGetSearchTodoMutation } from "@/app/redux/api/searchApi";
import { useParams } from "react-router-dom";
import { sendTodoSearchType } from "@/types/searchType";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTodoItem,
  selectTodoQuery,
  setRecentlySearched,
  setSearchTodoItem,
} from "@/app/redux/slice/todoSlice";

import { RecentlySearch } from "./index";

const TodoSearch = () => {
  const { id, folderId, listId, taskId } = useParams();

  const dispatch = useDispatch();
  const searchTodoItem = useSelector(selectTodoItem);
  const searchTodoQuery = useSelector(selectTodoQuery);



  const [getSearchTodo] = useGetSearchTodoMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTodoQuery]);

  const fetch = async () => {
    dispatch(setSearchTodoItem(null));

    if (
      id &&
      folderId &&
      listId &&
      taskId &&
      searchTodoQuery &&
      typeof id === "string" &&
      typeof folderId === "string" &&
      typeof listId === "string" &&
      typeof taskId === "string" &&
      typeof searchTodoQuery === "string"
    ) {
      let fetchData: sendTodoSearchType = {
        workspaceId: id,
        folderId,
        listId,
        taskId,
        todoKey: searchTodoQuery,
      };
      const response = await getSearchTodo(fetchData).unwrap();

      if (response && response.length > 0) {
        dispatch(setSearchTodoItem(response));
      }
    }

    dispatch(setRecentlySearched(searchTodoQuery));
  };

  return (
    <div className="flex flex-col">
      <TodoSearchInput />
      <RecentlySearch />
    </div>
  );
};
export default TodoSearch;
