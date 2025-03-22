import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
}

export function DashBoardWSCard(props: Props) {
  return (
    <div className="group/card rounded-xl  w-full  h-[60px] relative overflow-hidden bg-transparent flex items-center justify-center">
      <div className="absolute w-full  border-1 border-gray-400  h-[40px]    blur-sm rounded-md flex flex-" />
      <span className="dark:text-white text-black z-20 text-sm capitalize font-semibold font-sfpro ">
        {props.title}
      </span>
      <span className="dark:text-white text-black z-20 text-sm ml-4 capitalize font-bold font-sfpro border rounded-sm min-w-8 text-center p-1 ">
        {props.value}
      </span>
    </div>
  );
}
