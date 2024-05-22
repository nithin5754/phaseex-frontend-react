

import { useSelector } from "react-redux";
import { AuthLogin, AuthSideImg } from "../../components/auth/index";
import { selectCurrentToken } from "./authSlice";
import { useEffect } from "react";



const Login = () => {

const token=useSelector(selectCurrentToken)

   useEffect(()=>{
    if(!token){
    
    }
   })
  

  return (
    <div className="h-screen flex lg:flex-row flex-col mx-auto ">
      <AuthSideImg />
      <div className="flex w-full lg:w-1/2 justify-center lg:items-center bg-white m-auto">

        <AuthLogin />
      </div>
    </div>
  );
};
export default Login;
