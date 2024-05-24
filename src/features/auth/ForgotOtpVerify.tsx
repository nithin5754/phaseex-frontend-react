


import { ForgotOtp,AuthSideImg} from "@/components/auth"





const ForgotOtpVerify = () => {
      
  return (
    <div className="h-screen flex lg:flex-row flex-col mx-auto dark:bg-background dark:text-primary dark:border-border">
    <AuthSideImg/>
     <div className="flex w-full lg:w-1/2 justify-center lg:items-center bg-white m-auto dark:bg-background dark:text-primary dark:border-border">
   <ForgotOtp/>
     </div>
   </div>
  )
}
export default ForgotOtpVerify