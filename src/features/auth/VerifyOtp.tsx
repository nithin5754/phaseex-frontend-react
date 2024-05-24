
import { AuthVerifyOtp ,AuthSideImg} from "../../components/auth/index";

const VerifyOtp = () => {

 



 
  

  return (
    <div className="h-screen flex lg:flex-row flex-col mx-auto dark:bg-background dark:text-primary dark:border-border ">
    <AuthSideImg/>
     <div className="flex w-full lg:w-1/2 justify-center lg:items-center bg-white m-auto dark:bg-background dark:text-primary dark:border-border">
   <AuthVerifyOtp/>
     </div>
   </div>
  )
}
export default VerifyOtp