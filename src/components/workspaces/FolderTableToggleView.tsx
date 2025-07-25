

import { Menu,  Grid } from "lucide-react";
import { FC } from "react";

const FolderTableToggleView:FC<{handleToggle:(data: "table-view" | "folder-view") => void ,name:string}> = ({handleToggle,name}) => {
  return (
    <div className=" flex items-center border rounded-full overflow-hidden ">
      <button className={`px-4 py-2 border-r  w-[50px] ${name==='table-view'?'bg-blue-50 h-full text-black':''}`}>
        <Menu size={18} onClick={()=>handleToggle('table-view')}/>
      </button>
      <button className={`px-3   w-[50px] rounded-r-full flex items-center gap-2 ${name==='folder-view' ?'bg-blue-50 h-full text-black':''}`}>
      
        <Grid  size={18} onClick={()=>handleToggle('folder-view')}/>
      </button>
    </div>
  );
};

export default FolderTableToggleView;
