import { PlusIcon, UserIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const AuthButton = () => {
  return (
    <div className=" top-6 right-4 z-50 font-sfpro fixed">
      <Link to={'/login'}>
    <Button  className="text-sm   bg-slate-800 opacity-80 text-white mr-2 hover:opacity-100 hover:text-black transition-all ease-in-out ">

      Login
    </Button>
      </Link>
         <Link to={'/register'}>
    <Button  className="text-sm   bg-slate-800 opacity-80 text-white hover:opacity-100 hover:text-black transition-all ease-in-out">
         new
      <UserIcon className="ml-2" size={18}/> 
      <PlusIcon size={14}/>
      
    </Button>
      </Link>
  </div>
  )
}
export default AuthButton