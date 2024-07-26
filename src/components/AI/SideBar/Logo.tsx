import { Link } from "react-router-dom";
import logo from '../../../../public/favicon/favicon.ico'

export const Logo = () => {
  return (
    <Link
      to="#"
      className="font-bold flex space-x-2 items-center text-sm text-black dark:text-primary  py-1 relative z-20"
    >
    <img src={logo} alt="" className="w-[30px] h-[30px]"/>
      <div className="h-5 w-2  rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0 text-black dark:text-primary" />
      PhaseEx Ai
   
    </Link>
  );
};