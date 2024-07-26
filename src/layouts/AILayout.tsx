import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  SideBar,
  SidebarBody,
  SidebarLink,
} from "../components/aceternityuI/sideBar/acernitySideBar";
import { Logo, LogOutIcon } from "../components/AI/SideBar/index";

import {
  selectCurrentUserImg,
  selectCurrentUserName,
} from "@/features/auth/authSlice";
import { useSelector } from "react-redux";

import { AIlinksType, links } from "@/lib/aiSideBarLink";

import { Outlet } from "react-router-dom";
import { Dot, ListChecks } from "lucide-react";
import { Separator } from "@/components/ui/separator";


export function AILayout() {
  const userName = useSelector(selectCurrentUserName);
  const isProfileImage = useSelector(selectCurrentUserImg);

  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "fixed flex flex-col md:flex-row bg-gray-100 dark:bg-background w-screen flex-1  mx-auto overflow-hidden",
        "h-[100vh] "
      )}
    >
      <SideBar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 dark:bg-background border-r dark:border-border">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogOutIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link: AIlinksType, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <Separator/>

     <SidebarLink link={{
  label:"Recent Chat",
  href: '/',
  icon:''
}}/>
          
            
                        <SidebarLink link={{
  label:"first chat",
  href: '/',
  icon:''
}}/>
                        <SidebarLink link={{
  label:"first chat",
  href: '/',
  icon:''
}}/>
                        <SidebarLink link={{
  label:"first chat",
  href: '/',
  icon:''
}}/>
                        <SidebarLink link={{
  label:"first chat",
  href: '/',
  icon:''
}}/>





            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: userName,
                href: "/profile",
                icon: (
                  <img
                    src={
                      isProfileImage
                        ? isProfileImage
                        : "https://github.com/max-programming.png"
                    }
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </SideBar>
 <Outlet/>
    </div>
  );
}
