import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ArrowBigLeft, X } from "lucide-react";
import { LottieAnimation } from "@/components/lootie/Lootie";
import helloAnimation from "../../public/json/helloman.json";
import { useState } from "react";
import { VideoChatModal } from "@/components/modal/chat-modal";
import CallIcon from "../../public/json/call-icon.json";
import { useSocket } from "@/app/socketContext";


const SpaceLayout = () => {
  const { id } = useParams();
  const { inviteCount } = useSocket();
  const navigate = useNavigate();
  const [isClose, setClose] = useState<boolean>(false);

  const location = useLocation();

  const containsRoomPath = location.pathname.includes("/room");

  if (!id) {
    return;
  }

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      {!containsRoomPath && (
        <>
        
     
              <Button
                className="bg-transparent hover:bg-transparent border-none text-slate-600"
                onClick={goBack}
              >
                {" "}
                <ArrowBigLeft />
              </Button>
            </>
        
   
      )}

      <div className="">
        <>
          {!containsRoomPath && (
            <>
              {isClose && <VideoChatModal />}
              <div className=" fixed right-0 bottom-0 z-50">
                <div className="flex ">
                  {isClose && (
                    <LottieAnimation
                      animationData={helloAnimation}
                      height={400}
                      width={160}
                    />
                  )}
                  <Button
                    className={
                      isClose
                        ? "bg-transparent text-slate-600 border-0 hover:bg-transparent"
                        : "bg-transparent mb-[6rem] mr-[2rem] hover:bg-transparent"
                    }
                    onClick={() => setClose(!isClose)}
                  >
                    {isClose ? (
                      <X />
                    ) : (
                      <div className="relative flex items-center justify-center">
                        <LottieAnimation
                          animationData={CallIcon}
                          height={100}
                          width={100}
                        />
                        <>
                          {inviteCount.workspaceId === id &&
                            inviteCount.count > 0 && (
                              <span
                                className="absolute flex items-center justify-center w-6 h-6 text-white bg-green-500 rounded-full shadow-lg"
                                style={{
                                  top: 9,
                                  right: 6,
                                  transform: "translate(50%, -50%)",
                                }}
                              >
                                {inviteCount.count}
                              </span>
                            )}
                        </>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </>

        <Outlet />
      </div>
    </>
  );
};
export default SpaceLayout;
