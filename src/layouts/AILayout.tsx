import { useEffect, useState } from "react";

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
import { useDispatch, useSelector } from "react-redux";

import { links } from "@/lib/aiSideBarLink";

import { Outlet, useNavigate } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
import { useGetAllGroupQuery } from "@/app/redux/api/gtpSlice";
import { GetAllGroupType } from "@/types/chatType";
import {
  addAllGroupToSlice,
  selectAllPrompt,
} from "@/app/redux/slice/geminiSlice";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AILayout() {
  const userName = useSelector(selectCurrentUserName);
  const isProfileImage = useSelector(selectCurrentUserImg);
  const promptList = useSelector(selectAllPrompt);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data: getAllGroup } = useGetAllGroupQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (getAllGroup) {
      let uploadData: {
        groupId: string;
        title: string;
        userId: string;
        prompt: [];
      }[] = getAllGroup.map((grp) => ({
        groupId: grp.id,
        title: grp.title,
        userId: grp.userId,
        prompt: [],
      }));
      dispatch(addAllGroupToSlice(uploadData));
    }
  }, [getAllGroup]);

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
              {links.map((link, idx) => {
                if (link.label === "chat") {
                  if (promptList[0] && promptList[0].groupId) {
                    link.href = `/phaseex-ai/chat/${promptList[0].groupId}`;
                  } else {
                    navigate(-1);
                    return null;
                  }
                }
                return <SidebarLink key={idx} link={link} />;
              })}
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <Separator />

              <ScrollArea className="h-[244px] w-full ">
                <div className="p-4">
                  <h4 className="mb-4 text-sm font-medium leading-none text-center">
                    chat group
                  </h4>
                  <Separator />
                  {getAllGroup !== undefined &&
                    getAllGroup.length > 0 &&
                    getAllGroup.map((grp: GetAllGroupType) => {
                      return (
                        <div className="flex items-center justify-center">
                          <SidebarLink
                            key={grp.id}
                            link={{
                              label: grp.title,
                              href: `/phaseex-ai/chat/${grp.id}`,
                              icon: "",
                            }}
                          />
                        </div>
                      );
                    })}
                </div>
              </ScrollArea>
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
      <Outlet />
    </div>
  );
}
