import { LottieAnimation } from "@/components/lootie/Lootie";
import EmptyWokSpace from "../../../public/json/empty-work-1.json";
import EmptyRecent from "../../../public/json/empty-work-2.json";

const HomePage = () => {
  return (
    <>
      <div className="container min-h-[600px] mx-auto p-4 flex  dark:bg-background dark:text-white dark:gap-4 ">
        <div className="min-h-[500px] flex flex-wrap gap-4 w-full dark:bg-card dark:text-white  dark:border dark:border-border dark:rounded-sm">
          <div className="w-full max-w-lg p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">My Work</h1>
              <div className="flex space-x-2"></div>
            </div>
            <div className="flex min-h-[500px] flex-col my-auto items-center justify-center h-64 bg-gray-50 rounded-lg dark:bg-card dark:text-white ">
              <div className="flex flex-col items-center mb-4">
                <LottieAnimation
                  animationData={EmptyWokSpace}
                  height={400}
                  width={400}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-[500px] flex flex-wrap gap-4 w-full  dark:text-white dark:border  dark:border-border dark:rounded-sm">
          <div className="w-full max-w-lg p-4 rounded-lg shadow-md ">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">Recent Work</h1>
              <div className="flex space-x-2"></div>
            </div>
            <div className="flex min-h-[500px] flex-col my-auto items-center justify-center h-64 bg-gray-50 rounded-lg dark:bg-card dark:text-white">
              <div className="flex flex-col items-center mb-4">
                <LottieAnimation
                  animationData={EmptyRecent}
                  height={400}
                  width={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
