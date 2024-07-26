import { SideBarItemsType } from "@/types/sideBarItemsType";
import {
  Bell,
  Globe,
  Home,
  MoreHorizontal,
  PlusCircleIcon,
  Projector,

} from "lucide-react";
import SideBarButton from "./SideBar-btb";
import { useMediaQuery } from "usehooks-ts";
import SideBarDesktop from "./SideBarDesktop";
import SideBarMobile from "./SideBarMobile";
import { OpenModal } from "../modal/box-modal-settings";
import { Link } from "react-router-dom";
import { selectSideCloseOpen } from "@/app/redux/slice/uttilSlice";
import { useSelector } from "react-redux";

const sidebarItems: SideBarItemsType = {
  links: [
    { label: "Home", href: "/homepage", icon: Home },
    { label: "phaeexAI", href: "/phaseex-ai", icon: Globe },
    { label: "Inbox", href: "/hello", icon: Bell },
  ],
  extras: (
    <div className="flex flex-col gap-2">
      <SideBarButton icon={MoreHorizontal} className="w-full">
        More
      </SideBarButton>
      <OpenModal title={"create galaxy"} icon={PlusCircleIcon} />


      <Link to={"/space"}>
        <SideBarButton icon={Projector} className="w-full">
          view more galaxy
        </SideBarButton>
      </Link>
    </div>
  ),
};



const sidebarItemsClose: SideBarItemsType = {
  links: [
    { label: "Home", href: "/homepage", icon: Home },
    { label: "phaeexAI", href: "/phaseex-ai", icon: Globe },
    { label: "Inbox", href: "/hello", icon: Bell },
  ],
  extras: (
    <div className="flex flex-col gap-2">
      <SideBarButton icon={MoreHorizontal} className="w-full">
 
      </SideBarButton>
      <OpenModal title={"create galaxy"} icon={PlusCircleIcon} />

      <Link to={"/space"}>
        <SideBarButton icon={Projector} className="w-full">
    
        </SideBarButton>
      </Link>
    </div>
  ),
};

const SideBar = () => {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  const selectDashOpenClose=useSelector(selectSideCloseOpen)

  if (isDesktop) {
    return <SideBarDesktop sidebarItems={selectDashOpenClose?sidebarItemsClose:sidebarItems}  />;
  }

  return <SideBarMobile sidebarItems={sidebarItems} />;
};
export default SideBar;
