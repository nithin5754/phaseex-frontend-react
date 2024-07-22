import { PopOverWorkSpace } from "@/components/work-space/index";
import { cn } from "../../../lib/utils";
import { Earth, Lock } from "lucide-react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn(" gap-4 max-w-6xl mx-auto ", className)}>{children}</div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  type,
  id,
  handleHideSubmit,
}: {
  className?: string;
  id: string;
  title?: string;
  description?: string | React.ReactNode;
  handleHideSubmit: (id: string) => Promise<any>;
  header?: React.ReactNode;
  type: string;
}) => {
  let color = "bg-orange-500";

  if (title) {
    if (/^([a-c])/i.test(title[0].toLowerCase())) {
      color = "bg-blue-500";
    } else if (/^([d-g])/i.test(title[0].toLowerCase())) {
      color = "bg-green-500";
    } else if (/^([h-k])/i.test(title[0].toLowerCase())) {
      color = "bg-yellow-500";
    } else if (/^([l-o])/i.test(title[0].toLowerCase())) {
      color = "bg-red-500";
    } else if (/^([p-z])/i.test(title[0].toLowerCase())) {
      color = "bg-purple-500";
    }
  }



  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 w-[260px]",
        className
      )}
    >
      {header}

      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="flex justify-between ">
          <div
            className={`w-10 h-10 ${color} rounded-sm flex items-center justify-center text-primary  mr-4 text-xl font-semibold`}
            aria-label={`${title?.charAt(0).toUpperCase()}`}
          >
            {title?.charAt(0)?.toLocaleUpperCase()}
          </div>
          <PopOverWorkSpace
            handleHideSubmit={handleHideSubmit}
            id={id}
            text={"Do yo want make this visible ?"}
          />
        </div>
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 mb-2">
          {description}
        </div>
        <div className="flex gap-2 justify-end">
          <h6>
            {type === "shared" ? (
              <Earth className="w-4" />
            ) : (
              <Lock className="w-4" />
            )}{" "}
          </h6>
          <h1 className="">{type}</h1>
        </div>
      </div>
    </div>
  );
};
