import { BoxCard } from "../card/index";
import { PhaseexAi } from "./index";

const EmptyPage = () => {
  return (
    <>
      <div className="flex items-center  justify-center mb-[60px]">
        <PhaseexAi />
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <BoxCard
          title={"Developers"}
          description={"add code to the input for analyzing,debugging,testing"}
        />
        <BoxCard
          title={"Email Template"}
          description={"give prompt to create email for professional"}
        />
        <BoxCard
          title={"Story Creation"}
          description={"give prompt to create a wonderful story"}
        />
      </div>
    </>
  );
};
export default EmptyPage;
