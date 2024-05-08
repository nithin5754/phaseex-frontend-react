import { AuthVerifyOtp ,AuthSideImg} from "../../components/auth/index";

const VerifyOtp = () => {
  return (
    <div className="h-screen flex lg:flex-row flex-col mx-auto ">
    <AuthSideImg/>
     <div className="flex w-full lg:w-1/2 justify-center lg:items-center bg-white m-auto">
   <AuthVerifyOtp/>
     </div>
   </div>
  )
}
export default VerifyOtp