import { useAppDispatch } from "@/app/store/store"
import { Button } from "./ui/button"
import { logoutUserThunk } from "@/app/thunk/userThunk"
import { logout } from "@/app/slices/authSlice"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"




const DashBoard = () => {
  const axiosPrivate=useAxiosPrivate()
  const dispatch=useAppDispatch()

  useEffect(()=>{
    const controller=new AbortController()
 

    const fetchData=async ()=>{
     try {
      const response = await axiosPrivate.get('/auth/test',{
        signal:controller.signal,
      });
      console.log(response,"hello");

     } catch (error) {
      console.error(error,"hello");
    
     }
    }
    fetchData()

    return ()=>{
      controller.abort()
    }

  },[])

  const onSubmit=()=>{
    dispatch(logoutUserThunk()).then(()=>dispatch(logout()))
  }
  return (
    <div>DashBoard
<Button onClick={()=>onSubmit()}>Logout</Button>
<Link to={'/hello'}>hello</Link>

    </div>
  )
}
export default DashBoard