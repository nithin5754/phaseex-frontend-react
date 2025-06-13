import { selectSideCloseOpen } from "@/app/redux/slice/uttilSlice";

import SideBar from "@/components/sidebar/SdeBar";
import { Separator } from "@/components/ui/separator";


import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const selectSideBarCloseOpen = useSelector(selectSideCloseOpen);
  const location = useLocation();

  const containsRoomPath = location.pathname.includes("/phaseex-ai");
  return (
    <main className="flex h-screen  dark:text-primary dark:bg-background  dark:text-white dark:border-border ">
      <>
        {
          <>
            {!containsRoomPath && (
              <>
                <div
                  className={`${
                    !selectSideBarCloseOpen
                      ? "w-0 sm:w-[20%]"
                      : "w-0 sm:w-[6%] transition-all duration-1000 ease-in-out"
                  }`}
                >
                  <SideBar />
                </div>
              </>
            )}
          </>
        }
      </>
      <div className="flex flex-col flex-1 max-h-screen">
  
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container mt-4 text-accent-foreground">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};
export default MainLayout;
