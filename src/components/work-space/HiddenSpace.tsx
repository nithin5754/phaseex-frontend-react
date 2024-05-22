
import { ResponseWorkspaceDataType } from "@/app/api/spaceApi";
import { EyeIcon, GlobeIcon, LockIcon } from "lucide-react";




interface Props {
  space: ResponseWorkspaceDataType;
  handleHideSubmit: (id: string) => Promise<any>; 
}


const HiddenSpace = ({space,handleHideSubmit}:Props) => {


  if (space.active) { 
    return null;
  }
  let color = "bg-orange-500";

  if (/^([a-c])/i.test(space.title[0].toLowerCase())) {
    color = "bg-blue-500";
  } else if (/^([d-g])/i.test(space.title[0].toLowerCase())) {
    color = "bg-green-500";
  } else if (/^([h-k])/i.test(space.title[0].toLowerCase())) {
    color = "bg-yellow-500";
  } else if (/^([l-o])/i.test(space.title[0].toLowerCase())) {
    color = "bg-red-500";
  } else if (/^([p-z])/i.test(space.title[0].toLowerCase())) {
    color = "bg-purple-500";
  }

  
  const truncateTitle = (title:string) => {
    return title.length > 10 ? title.substring(0, 8) + '...' : title;
  };

  const truncateDesc = (desc:string) => {
    return desc.length > 10 ? desc.substring(0, 12) + '...' : desc;
  };

  return (
    
<div key={space.id} className="w-[300px] border bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 ${color} rounded-sm flex items-center justify-center text-white mr-4 text-xl font-semibold`}
              aria-label={`${space.title.charAt(0).toUpperCase()}`}
            >
              {space.title.charAt(0)}
            </div>
            <div>
              <div className="flex items-center">
                <h2 className="text-lg font-bold text-gray-900">{truncateTitle(space.title)}</h2>
                {space.workspaceType === 'private' ? (
                  <LockIcon className="w-5 h-5 text-gray-500 ml-2" />
                ) : (
                  <GlobeIcon className="w-5 h-5 text-gray-500 ml-2" />
                )}
              </div>
              <p className="text-gray-600">{truncateDesc(space.workspace_description)}</p>
            </div>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => handleHideSubmit(space.id)}
          >
            <EyeIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="px-6 py-4 border-t lex items-center justify-between">
        <div className="flex items-center">
          <div
            className={`w-6 h-6 ${color} rounded-full flex items-center justify-center text-white mr-2 text-sm font-semibold`}
            aria-label={`${space.title.charAt(0).toUpperCase()}`}
          >
            {space.title.charAt(0)}
          </div>
  
        </div>
        <span className="text-gray-500 text-sm">{space.workspaceType} · 1 member</span>
      </div>
    </div>
  )
}
export default HiddenSpace