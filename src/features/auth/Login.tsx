import { BackgroundBeams } from "@/components/aceternityuI/Background/background-beams";
import { AuthLogin, AuthSideImg } from "../../components/auth/index";
import GoogleAuth from "@/components/auth/google/GoogleAuth";
import { Copy } from "lucide-react";
import UseHandleCopyLink from "@/hooks/useLinkCopy";

const Login = () => {
  return (
    <div className="h-screen flex lg:flex-row flex-col mx-auto bg-neutral-950 dark:text-primary ">
      <AuthSideImg />
      <div className="h-auto max-w-md w-full m-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black z-50">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Phaseex.com
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login to phaseex app that replace them all other apps
        </p>

        <div className="my-4 flex flex-col gap-2">
          {" "}
     <div className="flex ">
     <h1 className="text-bold"> <span className="text-sm">Email:</span> phaseex@gmail.com</h1>
          <Copy
            size={14}
            className="cursor-pointer "
            onClick={() => UseHandleCopyLink("phaseex@gmail.com")}
          />
     </div>
         <div className="flex">
         <h2 className="text-bold"> <span className="text-sm">Password:</span> password:Nivin@1234</h2>
         <Copy
            size={14}
            className="cursor-pointer "
            onClick={() => UseHandleCopyLink("Nivin@1234")}
          />
         </div>
      
        </div>

        <AuthLogin />
        <h3 className="text-center font-sfpro  text-slate-600 my-4">
          or you can continue with{" "}
        </h3>
        <GoogleAuth />
      </div>

      <BackgroundBeams />
    </div>
  );
};
export default Login;
