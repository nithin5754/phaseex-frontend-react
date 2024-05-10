import { useAppDispatch } from "@/app/store/store"
import { Button } from "./ui/button"
import { logoutUserThunk } from "@/app/thunk/userThunk"
import { logout } from "@/app/slices/authSlice"



const DashBoard = () => {
  const dispatch=useAppDispatch()

  const onSubmit=()=>{
    dispatch(logoutUserThunk()).then(()=>dispatch(logout()))
  }
  return (
    <div>DashBoard
<Button onClick={()=>onSubmit()}>Logout</Button>

    </div>
  )
}
export default DashBoard