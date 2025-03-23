import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthButton, Box, Header, ImageHero, Phaseex } from "./Landing/index";

export function LandingPage() {
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/space";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [navigate, token, location, from]);
  return (
    <div
      className=" w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] 
        relative flex  items-center justify-center "
    >
      <Phaseex />

      <AuthButton />

      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex flex-col scroll-smooth focus:scroll-auto">
        <Header />

        <ImageHero />

        <h1 className="dark:text-primary text-3xl font-sfpro text-center mt-24 ">
          Features
        </h1>
        <Box />
      </div>
    </div>
  );
}
