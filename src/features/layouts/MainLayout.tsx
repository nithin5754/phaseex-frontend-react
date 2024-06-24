import { selectSideCloseOpen } from "@/app/redux/slice/uttilSlice"
import { NabBar } from "@/components/nav/NavBar"
import SideBar from "@/components/sidebar/SdeBar"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"





const MainLayout = () => {
  const selectSideBarCloseOpen=useSelector(selectSideCloseOpen)
  return (
    <main className="flex dark:bg-background min-h-screen dark:text-white dark:border-border">
  <>
  {
    (
      <>
        <div className={`${!selectSideBarCloseOpen?'w-0 sm:w-[20%]':'w-0 sm:w-[6%] transition-all duration-1000 ease-in-out'}`}>
    <SideBar/> 
    </div>
      </>
    )
  }
  
  </>
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