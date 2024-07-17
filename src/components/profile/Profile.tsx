import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getColor } from "@/lib/colors";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ProfileForm } from "../profile/index";
import Theme from "./Theme";
import { ModeToggle } from "../mode-toggle";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentColor } from "@/app/redux/slice/uttilSlice";

const Profile = () => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
 const isSelectedColor=useSelector(selectCurrentColor)
  return (
    <div className="grid grid-cols-2 ">
      <div
        className="h-full w-32 md:w-48 md:h-48 relative flex items-center m-auto "
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Avatar
          className={`h-full w-32  md:w-48 md:h-48 rounded-full overflow-hidden `}
        >
          {image ? (
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          ) : (
            <div
              className={`uppercase h-full w-32 md:w-48 md:h-48 text-6xl 
                border-[1px] flex items-center justify-center rounded-full ${getColor(
                isSelectedColor
              )}`}
            >
              N
            </div>
          )}
        </Avatar>
        <Plus
        size={74}
        className={`absolute z-50 text-white  ${hovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`} // Show on hover
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} 
      />
      </div>
      <div className="w-[600px] flex flex-col gap-4">
        <ProfileForm />
        <Theme />

        <ModeToggle />
      </div>
    </div>
  );
};
export default Profile;
