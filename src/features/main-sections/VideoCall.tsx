import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Element } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUserName } from "../auth/authSlice";
import { zegoCloudScrect } from "@/lib/constant";
import { randomID } from "@/lib/randomId";


export default function VideoCall() {
  const navigate = useNavigate();
  const { roomID } = useParams();
  const currentName=useSelector(selectCurrentUserName)


  if (!roomID) {
    navigate("/space");
    return;
  }
  const myMeeting = async (element: Element) => {
    // generate Kit Token
    const appID:number =1621200118;
    const serverSecret =zegoCloudScrect;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      currentName?currentName:"nithin"
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "group video link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname
        },

      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  };

  return (
    <div
      className="myCallContainer  min-h-screen h-[50vh]  p-0   flex dark:bg-primary  dark:text-white dark:gap-4 "
      ref={myMeeting}
    ></div>
  );
}
