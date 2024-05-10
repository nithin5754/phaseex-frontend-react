
import { createSlice } from "@reduxjs/toolkit";


import { VerifyUserThunk, forgotPasswordVerifyThunk, loginUserThunk, logoutUserThunk, registerUser, resendOTPThunk, verifyOtpFOrgotPasswordThunk, verifyToChangePassword } from "../thunk/userThunk";





// export const loginUser = createAsyncThunk(
//   "user/login",
//   async (data) => {
//     const response = await axios.post(`${USERS_URL}/auth`, data,{
//     withCredentials: true,
//   });
//     return response.data;
//   }
// );

// export const logoutUser = createAsyncThunk("user/logout", async () => {
//   const response = await axios.post(`${USERS_URL}/logout`);
//   return response.status === 200;
// });



// export const updateUser = createAsyncThunk("user/update", async data => {
//   const response = await axios.put(`${USERS_URL}/profile`, data, {
//     withCredentials: true,
//   });
//   const user = response.data;
//   return user;
// });


interface UsersState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  error:string|null
}


const initialState:UsersState={
  loading: 'idle',
  error:null
}

const userSlice = createSlice({
  name:'users',
  initialState,
 reducers:{},
 extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending,(state)=>{
      state.loading='pending'
    })
    .addCase(registerUser.fulfilled,(state,action)=>{
      state.loading='succeeded'

      console.log(action.payload,"register"); 
    })
    .addCase(registerUser.rejected,(state,action)=>{
      state.loading='failed',

      state.error=action.payload as string
    })

    .addCase(VerifyUserThunk.pending,(state)=>{
      state.loading='pending'
    })
    .addCase(VerifyUserThunk.fulfilled,(state,action)=>{
      state.loading='idle'


    })
    .addCase(VerifyUserThunk.rejected,(state,action)=>{
      state.loading='failed'
      state.error=action.payload as string
    })



    .addCase(loginUserThunk.pending,(state)=>{
      state.loading='pending'
    })
    .addCase(loginUserThunk.fulfilled,(state,action)=>{
      if (action.payload instanceof Error) {
        const errorMessage = action.payload.message;
        state.error = errorMessage;
        state.loading='failed'
      } else {
        state.loading='succeeded'
      }
  
    })
    .addCase(loginUserThunk.rejected,(state,action)=>{
      state.loading='failed',
      state.error=action.payload as string
    })

    .addCase(logoutUserThunk.fulfilled,(state,_action)=>{
        state.loading='succeeded'
    })

    .addCase(forgotPasswordVerifyThunk.pending,(state,_action)=>{
      state.loading='pending'
  })
  .addCase(forgotPasswordVerifyThunk.fulfilled,(state,_action)=>{
    state.loading='succeeded'
})
.addCase(forgotPasswordVerifyThunk.rejected,(state,_action)=>{
  state.loading='failed'
})


.addCase(verifyOtpFOrgotPasswordThunk.pending,(state,_action)=>{
  state.loading='pending'
})
.addCase(verifyOtpFOrgotPasswordThunk.fulfilled,(state,_action)=>{
state.loading='succeeded'
})
.addCase(verifyOtpFOrgotPasswordThunk.rejected,(state,_action)=>{
state.loading='failed'
})




.addCase(verifyToChangePassword.pending,(state,_action)=>{
  state.loading='pending'
})
.addCase(verifyToChangePassword.fulfilled,(state,_action)=>{
state.loading='succeeded'
})
.addCase(verifyToChangePassword.rejected,(state,_action)=>{
state.loading='failed'
})



.addCase(resendOTPThunk.pending,(state,_action)=>{
  state.loading='pending'
})
.addCase(resendOTPThunk.fulfilled,(state,_action)=>{
state.loading='succeeded'
})
.addCase(resendOTPThunk.rejected,(state,_action)=>{
state.loading='failed'
})

 }
  }
)

export default userSlice.reducer