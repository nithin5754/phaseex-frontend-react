import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Element } from "../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUserName } from "../auth/authSlice";

function randomID(len: number) {


  let result = "";
  if (result) return result;
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  const maxPos = chars.length;
  let i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

// export function getUrlParams(
//   url = window.location.href
// ) {
//   const urlStr = url.split('?')[1];
//   return new URLSearchParams(urlStr);
// }

export default function VideoCall() {
  const navigate = useNavigate();
  const { roomID } = useParams();
  const currentName=useSelector(selectCurrentUserName)
  console.log(roomID, "roomId");

  if (!roomID) {
    navigate("/home");
    return;
  }
  const myMeeting = async (element: Element) => {
    // generate Kit Token
    const appID = 401444796;
    const serverSecret = "8ccacb2c27266290ccff803858579079";
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
