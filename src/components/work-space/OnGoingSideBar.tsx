import { ResponseWorkspaceDataType } from "@/app/redux/api/spaceApi";
import EmptyBoxLottie from "../../../public/json/emptyBox.json";
import { LottieAnimation } from "../lootie/Lootie";
import { Link } from "react-router-dom";
import PopOverWorkSpace from "./PopOverWorkSpace";
import { DeleteWS } from "./index";
import useAuth from "@/hooks/useAuth";

interface Props {
  getOnGoingSpace: ResponseWorkspaceDataType[] | [];
  handleHideSubmit: (id: string) => Promise<any>;
}

const OnGoingSideBar = ({ getOnGoingSpace, handleHideSubmit }: Props) => {
  const user = useAuth();
  return (
    // <h2 className="font-sfpro text-lg mb-4 ">OnGoing Galaxy</h2>
    <>
      {getOnGoingSpace.length > 0 &&
      getOnGoingSpace.some((space) => space.active) ? (
        <ul className="w-full p-4">
          {getOnGoingSpace.map((space) => {
            if (!space.active) {
              return null;
            }
            let color = "bg-orange-400";

            if (/^([a-c])/i.test(space.title[0].toLowerCase())) {
              color = "bg-blue-400";
            } else if (/^([d-g])/i.test(space.title[0].toLowerCase())) {
              color = "bg-green-400";
            } else if (/^([h-k])/i.test(space.title[0].toLowerCase())) {
              color = "bg-yellow-400";
            } else if (/^([l-o])/i.test(space.title[0].toLowerCase())) {
              color = "bg-red-400";
            } else if (/^([p-z])/i.test(space.title[0].toLowerCase())) {
              color = "bg-purple-400";
            }
            const truncateTitle = (title: string) => {
              return title.length > 10 ? title.substring(0, 10) + "..." : title;
            };

            return (
              <li
                key={space.id}
                className="mb-2 w-full flex justify-between   hover:bg-slate-100 hover:rounded-md px-3 dark:hover:bg-secondary"
              >
                <div className="flex ">
                  <div className="flex flex-row gap-2 my-auto p-2">
                    <div
                      className={`w-6 h-6 ${color} rounded-full flex items-center justify-center text-[14px] font-sfpro hover:bg-slate-600 dark:hover:bg-secondary`}
                    >
                      {space.title[0].toUpperCase()}
                    </div>
                    <Link to={`/space/${space.id}`}>
                      <span>{truncateTitle(space.title)}</span>
                    </Link>
                  </div>
                </div>
                {user?.userId === space.workspaceOwner && (
                  <>
                    <div className="flex items-center justify-center gap-4">
                      <DeleteWS workspaceId={space.id} />
                      <PopOverWorkSpace
                        handleHideSubmit={handleHideSubmit}
                        id={space.id}
                        text={"Do yo want make this hidden ?"}
                      />
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex justify-center m-auto">
          <LottieAnimation
            animationData={EmptyBoxLottie}
            height={200}
            width={200}
          />
        </div>
      )}
    </>
  );
};
export default OnGoingSideBar;
