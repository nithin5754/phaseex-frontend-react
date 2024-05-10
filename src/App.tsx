import { Route, Routes } from "react-router-dom";
import { Login, Register, VerifyOtp } from "./features/auth/index";
import LandingPage from "./components/LandingPage";


import DashBoard from "./components/DashBoard";
import RequireAuth from "./components/auth/RequireAuth";
import ForgotAuth from "./features/auth/ForgotAuth";
import ForgotOtpVerify from "./features/auth/ForgotOtpVerify";
import ChangeForgotAuthPassword from "./features/auth/ChangeForgotAuthPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="verify-auth-forgot-password" element={<ForgotAuth/>}/>
          <Route path="verify-auth-forgot-otp" element={<ForgotOtpVerify/>}/>
          <Route path="change-forgot-password" element={<ChangeForgotAuthPassword/>}/>
          <Route path="dashboard" element={<RequireAuth/>}>
          <Route index element={<DashBoard />} />
            
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
