import { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { ProfileForm } from "../profile/index";
import { Loader2, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { selectBGCurrentColor, selectBorderCurrentColor, selectFontColorCurrentColor } from "@/app/redux/slice/uttilSlice";
import { selectCurrentLoadingImage, selectCurrentUserImg } from "@/features/auth/authSlice";
import { ProfileModal } from "../modal/profile-modal";
import { Button } from "../ui/button";

const PhotoDisplay = () => {
  const [hovered, setHovered] = useState<boolean>(false);
  const isProfileImage = useSelector(selectCurrentUserImg);
  const bgColor = useSelector(selectBGCurrentColor);
  const borderColor = useSelector(selectBorderCurrentColor);
  const fontColor = useSelector(selectFontColorCurrentColor);

  const isImageLoading=useSelector(selectCurrentLoadingImage)

  return (
    <div className="flex flex-col gap-4 my-auto ">
        <h1 className="dark:text-primary text-4xl font-sfpro text-start ">Profile</h1>
      <div
        className="h-full w-32 md:w-48 md:h-48 relative flex items-center mx-auto "
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

<>
            {
isImageLoading?(<>

              <Loader2 className="mr-2 h-48 w-48 animate-spin z-50  flex items-center justify-center rounded-full dark:text-border" />
         
           
</>):(<>

  <Avatar
          className={`h-full w-32  md:w-48 md:h-48 rounded-full overflow-hidden `}
        >



   

          {isProfileImage ? (
            <AvatarImage src={isProfileImage ? isProfileImage : ''} alt="@shadcn" />
          ) : (
            <div
              className={`uppercase h-full w-32 md:w-48 md:h-48 text-6xl 
              flex items-center justify-center rounded-full `}
              style={{
                backgroundColor: bgColor,
                color: fontColor,
                border: `1px solid ${borderColor}`,
              }}
            >
              N
            </div>
          )}
        </Avatar>

</>)
            }
            
            </>

     

        
    <ProfileModal hovered={hovered}/>
        
      </div>
      <div className="flex mx-auto justify-center w-full">
        <ProfileForm />
      </div>
    </div>
  )
}

export default PhotoDisplay;
