import { InputAuth,AuthSideImg} from "@/components/auth/index"





const ForgotAuth = () => {
  return (
    <div className="h-screen flex lg:flex-row flex-col mx-auto ">
    <AuthSideImg/>
     <div className="flex w-full lg:w-1/2 justify-center lg:items-center bg-white m-auto">
   <InputAuth/>
     </div>
   </div>
  )
}
export default ForgotAuth