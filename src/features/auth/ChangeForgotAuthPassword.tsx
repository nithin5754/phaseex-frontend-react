


import { ChangePassword ,AuthSideImg} from "../../components/auth/index";

const ChangeForgotAuthPassword = () => {
  return (
    <div className="h-screen flex lg:flex-row flex-col mx-auto ">
    <AuthSideImg/>
     <div className="flex w-full lg:w-1/2 justify-center lg:items-center bg-white m-auto">
   <ChangePassword/>
     </div>
   </div>
  )
}
export default ChangeForgotAuthPassword