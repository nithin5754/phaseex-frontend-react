import { InboxIcon, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  owner: string | undefined;
  url: string | undefined;
}

const VideoNotification = ({ owner, url }: Props) => {
  return (
    <>
      {owner !== undefined || url !== undefined ? (
        <>
          <div
            id="toast-notification"
            className="w-full max-w-xs p-4 text-gray-900 bg-white  rounded-lg shadow dark:bg-gray-800
             dark:text-gray-300 flex mx-auto flex-col"
            role="alert"
          >
            <div className="flex items-center mb-3">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Invite Notification
              </span>
            </div>
            <div className="flex  items-center ml-7">
              <div className="relative left-2 flex-shrink-0 flex justify-center">
                <span className="absolute bottom-0 right-0 inline-flex items-center 
                justify-center my-auto w-6 h-6 bg-primary-color rounded-full">
                  <InboxIcon size={18} />
                </span>
              </div>
              <div className="ms-3 text-sm font-normal">
                <div className="text-base font-semibold text-gray-900
                 dark:text-white">
                  {owner ? owner : ""}
                </div>
                <div className="text-sm font-normal">
                  <Link to={url ? url : ""} className="dark:text-primary ">
                    is invited to join a video call
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-md text-center font-normal 
          dark:text-primary  ">
            <h1>No Invitation </h1>
          </div>
        </>
      )}
    </>
  );
};
export default VideoNotification;
