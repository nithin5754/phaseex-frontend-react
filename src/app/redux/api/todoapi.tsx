import {  SendDeleteTodoTask, SendEditTodoTask, SendTodoCheckBox, SendTodoTask, TodoType } from "@/types/TodoType";
import { apiSlice } from "./apiSlice";
import { deleteTodo, updateTodoName, updateTodoStatus } from "../slice/todoSlice";



export const todoTaskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAllTodoTask: builder.query<
    TodoType[],
    { workspaceId: string;folderId:string,listId:string,taskId:string }
  >({
    query: ({ workspaceId, folderId,listId,taskId }) => ({
      url: `/todo/get-all-todo-task?workspaceId=${workspaceId}&folderId=${folderId}&listId=${listId}&taskId=${taskId}`,
      validateStatus: (
        response: { status: number },
        result: { isError: any }
      ) => {
        return response.status === 200 && !result.isError;
      },
 
    }),
         providesTags: (_result, _error, { workspaceId, folderId, listId,taskId }) => [
        { type: 'TodoTask', id: `${workspaceId}-${folderId}-${listId}-${taskId}` },
      ],

   
  }),



  onCreateTaskTodo: builder.mutation<TodoType ,SendTodoTask>({
    query: (credentials) => ({
      url: "/todo/create-todo-task",
      method: "POST",
      body: { ...credentials },
    }),
    invalidatesTags: ["TodoTask"],

  }),



     onUpdateStatusTodo: builder.mutation<boolean,SendTodoCheckBox>({
    query: (credentials) => ({
      url: `/todo/update-todo-checkbox/${credentials.id}`,
      method: "PATCH",
      body: { ...credentials },
    }),

    invalidatesTags: (_result, _error,{ workspaceId, folderId, listId,taskId }) => [
      { type: 'TodoTask', id: `${workspaceId}-${folderId}-${listId}-${taskId}` },
    ],

    onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const {id,todo_status}=args
          queryFulfilled.then(() => {
        dispatch(updateTodoStatus({ id, todo_status })); 
      }).catch(error => {
        console.error("Failed to update status", error);
      });
    },


 
  }),


  onUpdateTaskTodo: builder.mutation<boolean,SendEditTodoTask>({
    query: (credentials) => ({
      url: `/todo/update-todo-task/${credentials.todoId}`,
      method: "PATCH",
      body: { ...credentials },
    }),

    invalidatesTags: (_result, _error,{ workspaceId, folderId, listId,taskId }) => [
      { type: 'TodoTask', id: `${workspaceId}-${folderId}-${listId}-${taskId}` },
    ],
    onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
      const {todoId,todo}=args
        queryFulfilled.then(() => {
      dispatch(updateTodoName({ id:todoId, todo })); 
    }).catch(error => {
      console.error("Failed to update status", error);
    });
  },

 
  }),


  onDeleteTaskTodo: builder.mutation<boolean,SendDeleteTodoTask>({
    query: (credentials) => ({
      url: `/todo/delete-todo-task/${credentials.todoId}`,
      method: "DELETE",
      body: { ...credentials },
    }),

    invalidatesTags: (_result, _error, { workspaceId, folderId, listId,taskId }) => [
      { type: 'TodoTask', id: `${workspaceId}-${folderId}-${listId}-${taskId}` },
    ],

    onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
      const {todoId}=args
    queryFulfilled.then(() => {
      dispatch(deleteTodo(todoId)); 
    }).catch(error => {
      console.error("Failed to update status", error);
    });
  },
 
  }),

















  })

})


export const {

  useGetAllTodoTaskQuery,
  useOnCreateTaskTodoMutation,
  useOnUpdateStatusTodoMutation,
  useOnUpdateTaskTodoMutation,
  useOnDeleteTaskTodoMutation,
  
  
  
  } = todoTaskApiSlice;



