import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ArrowBigLeft, MessageCircle, X } from "lucide-react";
import { LottieAnimation } from "@/components/lootie/Lootie";
import helloAnimation from "../../public/json/helloman.json";
import { useState } from "react";
import { ChatModal } from "@/components/modal/chat-modal";
import CallIcon from "../../public/json/call-icon.json";
import { useSocket } from "@/app/socketContext";
import { useGetSingleWorkSpaceQuery } from "@/app/redux/api/spaceApi";

const SpaceLayout = () => {
  const { id } = useParams();
  const { inviteCount } = useSocket();
  const navigate = useNavigate();
  const [isClose, setClose] = useState<boolean>(false);

  const [messageOpen, setMessageOpen] = useState<boolean>(false);
  const location = useLocation();

  const containsRoomPath = location.pathname.includes("/room");

  if (!id) {
    return;
  }

  const { data: sigleWSDetails } = useGetSingleWorkSpaceQuery(id);

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
              {messageOpen && (
                <ChatModal
                  messageOpen={messageOpen}
                  setMessageOpen={setMessageOpen}
                  details={sigleWSDetails!}
                />
              )}

              <div className=" fixed right-0  bottom-0 z-50">
                <div className="flex ">
                  {isClose && (
                    <>
                      <Button
                        className="rounded-full"
                        onClick={() => {
                          setMessageOpen(true);
                          setClose((prev) => !prev);
                        }}
                      >
                        <MessageCircle /> chat with me!
                      </Button>
                      <LottieAnimation
                        animationData={helloAnimation}
                        height={400}
                        width={400}
                      />
                    </>
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
                      <>
                        {!messageOpen && (
                          <Button className="relative flex items-center justify-center w-[40px] bg-transparent ">
                            <LottieAnimation
                              animationData={CallIcon}
                              height={40}
                              width={40}
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
                          </Button>
                        )}
                      </>
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
