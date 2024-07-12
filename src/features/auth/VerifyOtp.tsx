import { BackgroundBeams } from "@/components/aceternityuI/Background/background-beams";
import { AuthVerifyOtp, AuthSideImg } from "../../components/auth/index";

const VerifyOtp = () => {
  return (
    <div className="h-screen flex lg:flex-row flex-col mx-auto bg-neutral-950 dark:text-primary dark:border-border ">
      <AuthSideImg />

      <div className="max-w-md w-full m-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black z-50 ">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Forgot otp
        </h2>

        <AuthVerifyOtp />
      </div>
      <BackgroundBeams />
    </div>
  );
};
export default VerifyOtp;
