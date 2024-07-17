import { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { getColor } from "@/lib/colors";

import { ColorPickerButton, ProfileForm } from "../profile/index";
import Theme from "./Theme";
import { ModeToggle } from "../mode-toggle";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { selectBGCurrentColor, selectBorderCurrentColor, selectCurrentColor, selectFontColorCurrentColor } from "@/app/redux/slice/uttilSlice";


const Profile = () => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);


 const bgColor=useSelector(selectBGCurrentColor)
 const borderColor=useSelector(selectBorderCurrentColor)
 const fontColor=useSelector(selectFontColorCurrentColor)
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
                flex items-center justify-center rounded-full `}
                style={{
                  backgroundColor: bgColor,
                  color:fontColor,
                  border: `1px solid ${borderColor}`,
                }}
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

              
         <div className="flex flex-col">
         <h1 className="dark:text-primary mb-4">Custom Colors</h1>
        <ColorPickerButton/>
         </div>


        <ModeToggle />
      </div>
    </div>
  );
};
export default Profile;
