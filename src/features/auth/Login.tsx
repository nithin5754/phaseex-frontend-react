import { BackgroundBeams } from "@/components/aceternityuI/Background/background-beams";
import { AuthLogin, AuthSideImg } from "../../components/auth/index";
import GoogleAuth from "@/components/auth/google/GoogleAuth";

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
