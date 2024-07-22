import { PopoverClose } from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { BookOpenIcon, Eye, EyeOff, X } from "lucide-react";

interface Props {
  handleHideSubmit: (id: string) => Promise<any>;
  id: string;
  text: string;
}

const PopOverWorkSpace = ({ handleHideSubmit, id, text }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        {text === "Do yo want make this hidden ?" ? <EyeOff /> : <Eye />}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 dark:border-border dark:bg-popover">
        <div className="flex justify-between ">
          <h1 className="w-full my-auto">{text}</h1>
          <PopoverClose className="my-auto">
            <X className="w-[16px]" />
          </PopoverClose>
        </div>

        <div className="flex gap-2 justify-center items-center">
          <PopoverClose>
            <BookOpenIcon
              className="cursor-pointer hover:text-green-500 my-auto items-center m-auto"
              onClick={() => handleHideSubmit(id)}
            />
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default PopOverWorkSpace;
