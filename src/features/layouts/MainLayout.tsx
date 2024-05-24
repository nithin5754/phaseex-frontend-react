import { NabBar } from "@/components/nav/NavBar"
import SideBar from "@/components/sidebar/SdeBar"
import { Outlet } from "react-router-dom"





const MainLayout = () => {
  return (
    <main className="flex dark:bg-background min-h-screen dark:text-white dark:border-border">
    <div className="w-0 sm:w-[20%]">
    <SideBar/> 
    </div>
    <div className="flex-1 flex-col   mx-auto flex">
  <div className="hidden md:block">
  <NabBar/>
  </div>
      <div className="">
      <Outlet/>
      </div>
    </div>

  
    </main>
  )
}
export default MainLayout