import { Route, Routes } from "react-router-dom";
import { Login,Register,VerifyOtp } from "./features/auth/index";
import LandingPage from "./components/LandingPage";



function App() {
  return (
  
    <div className="App">
          <Routes>
        <Route path="/">
       
          <Route index element={<LandingPage />}/>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-otp" element={<VerifyOtp />} />

        </Route>


               
          </Routes>
    </div>
  )
}

export default App
