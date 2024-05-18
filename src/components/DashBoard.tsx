

import { useGetDashBoardQuery, useGetTestingQuery } from "@/app/api/AuthApi"


import { useEffect } from "react"
import { Link } from "react-router-dom"








const DashBoard = () => {
//   const {
//     data,
//     isLoading,
//     isSuccess,
//     isError,
//     error
// }=useGetTestingQuery(undefined,{
//   pollingInterval:60000,
//   refetchOnFocus:true,
//   refetchOnMountOrArgChange:true
// })




// if(isLoading)return <h1>loading</h1>
// {error &&<h1>something went wrong</h1>}


  // console.log(data,"dashboard data");
  
  return (



    <div className="p-8">
     <Link to={'/hello'}>hello</Link>
     <Link to={'/login'}>login</Link>

    
    <Link to={'/'}>workspace</Link>
      
    </div>



      )



}
export default DashBoard