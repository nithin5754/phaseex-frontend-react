


import { ForgotOtp,AuthSideImg} from "@/components/auth"





const ForgotOtpVerify = () => {
      
  return (
    <div className="h-screen flex lg:flex-row flex-col mx-auto ">
    <AuthSideImg/>
     <div className="flex w-full lg:w-1/2 justify-center lg:items-center bg-white m-auto">
   <ForgotOtp/>
     </div>
   </div>
  )
}
export default ForgotOtpVerify