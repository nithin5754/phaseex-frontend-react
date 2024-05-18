import { Route, Routes } from "react-router-dom";
import {
  Login,
  Register,
  VerifyOtp,
  ChangeForgotAuthPassword,
  ForgotAuth,
  ForgotOtpVerify,
  RequireAuth,
} from "./features/auth/index";
import{HomePage,ViewSpace} from './features/main-sections/index'

import DashBoard from "./components/DashBoard";
import LandingPage from "./components/LandingPage";

import Hello from "./components/Hello";
import PersistLogin from "./features/auth/PersistLogin";
import { MainLayout } from "./features/layouts/index";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="verify-auth-forgot-password" element={<ForgotAuth />} />
          <Route path="verify-auth-forgot-otp" element={<ForgotOtpVerify />} />
          <Route
            path="change-forgot-password"
            element={<ChangeForgotAuthPassword />}
          />


   {/* <Route element={<PersistLogin />}> */}
   {/* <Route element={<RequireAuth />}> */}
   <Route  element={<MainLayout/>}>
          <Route path="homepage" element={<HomePage />}/>
          <Route path="space" element={< ViewSpace/>}/>
          
             
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="hello" element={<Hello />} />
          </Route>
   </Route>
        

   {/* </Route> */}
       
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
