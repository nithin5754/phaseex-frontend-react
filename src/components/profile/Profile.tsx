
import {  ColorPickerButton, PhotoDisplay } from "../profile/index";
import Theme from "./Theme";
import { ModeToggle } from "../mode-toggle";

const Profile = () => {

  return (
    <div className="grid grid-cols-2 w-full m-auto border min-h-[500px] ml-4 rounded-md p-4 dark:border-border">

    

      <PhotoDisplay/>

      <div className="w-full flex flex-col gap-4 my-auto">
    
  
     
          <Theme />

              
         <div className="flex flex-col ">
         <h1 className="dark:text-primary mb-4">Custom Colors</h1>
        <ColorPickerButton/>
         </div>


        <ModeToggle />
      </div>
    </div>
  );
};
export default Profile;
