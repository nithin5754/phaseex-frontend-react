import { createAsyncThunk } from "@reduxjs/toolkit";
// import spaceApi, { createNewSpaceApiProps } from "../api/spaceApi";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { createNewSpaceApiProps } from "../api/spaceApi";

// const { createNewSpaceApi } = spaceApi()


export const createNewSpaceThunk= createAsyncThunk("space/createNewSpaceThunk", async (userData:createNewSpaceApiProps) => {     
     
  const axiosPrivate=useAxiosPrivate()
  // const response=await createNewSpaceApi(userData)
  
  try {
    const response=await axiosPrivate.post('/space/create-workspace',{userData})
     return response.data
  } catch (error) {
    console.log(error);
    throw new Error("error");
    
    
  }
});