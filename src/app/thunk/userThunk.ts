import { createAsyncThunk } from "@reduxjs/toolkit";

import { UserData } from "@/components/auth/AuthRegister";
import userAPI from "../api/authApi";





export const registerUser = createAsyncThunk("users/registerUser", async (userData:UserData) => {       
  const response=await userAPI.createNewUser(userData)
  return response
});


export const VerifyUserThunk = createAsyncThunk("users/VerifyUserThunk", async ({tokenId,otp}:{tokenId:string,otp:string}) => {       
  const response=await userAPI.verifyUser({tokenId,otp})
  return response
});


export const loginUserThunk=createAsyncThunk("users/loginUserThunk",async ({email,password}:{email:string,password:string})=>{  
  const response=await userAPI.loginUser({email,password})

  
  return response
})


export const logoutUserThunk=createAsyncThunk("users/logoutUserThunk",async()=>{  
  const response=await userAPI.logoutUser()
  return response
})


export const forgotPasswordVerifyThunk=createAsyncThunk("users/forgotPasswordVerifyThunk",async(email:string)=>{  
  const response=await userAPI.forgotPasswordVerify(email)
  return response
})


export const verifyOtpFOrgotPasswordThunk=createAsyncThunk("users/verifyOtpFOrgotPasswordThunk",async( {otp,tokenId}:{otp:string,tokenId:string})=>{
  const response=await userAPI.verifyForgotOtp({otp,tokenId})
  return response
})


export const verifyToChangePassword=createAsyncThunk("users/verifyToChangePassword",async( {password,tokenId}:{password:string,tokenId:string})=>{
  const response=await userAPI.verifyChangePassword({password,tokenId})
  return response
})




export const resendOTPThunk=createAsyncThunk("users/resendOTPThunk",async(tokenId:string)=>{
  const response=await userAPI.resendOTP(tokenId)
  return response
})



export const fetchTimerDateThunk=createAsyncThunk("users/fetchTimerDateThunk",async(tokenId:string)=>{
  const response=await userAPI.fetchTimerDate(tokenId)
  return response
})




