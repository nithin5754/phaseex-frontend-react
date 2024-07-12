import { BackgroundBeams } from "@/components/aceternityuI/Background/background-beams";
import { AuthRegister ,AuthSideImg} from "../../components/auth/index";

const Register = () => {
  return (


<div className="h-screen flex lg:flex-row flex-col mx-auto bg-neutral-950 dark:text-primary dark:border-border">
<AuthSideImg />


<div className="max-w-md w-full m-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black z-50">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        SIGN UP to Phaseex.com
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
       register to phaseex app that replace them all other apps
      </p>
 
      <AuthRegister/>
   
    </div>
  <BackgroundBeams />
</div>
  )
}
export default Register