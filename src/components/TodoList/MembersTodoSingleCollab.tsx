
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { SendAddCollabTodoTask, TodoCollabType } from "@/features/types/TodoType";

import { DeleteTodoCollab } from "./index";


interface Props {
  collabList: TodoCollabType;
  checkingDetails:SendAddCollabTodoTask
}

const MembersTodoSingleCollab = ({ collabList,checkingDetails }: Props) => {



  return (
    <li className="pb-3 sm:pb-4 w-full">
      <div className="flex justify-between items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-shrink-0">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="w-14 h-14"
            />
            <AvatarFallback>{collabList.fullName.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-row justify-between items-center w-full min-w-0">
          <div className="flex flex-col">
            <p className="text-sm font-thin text-gray-900 truncate dark:text-white">
              {collabList.fullName}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {collabList.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* <UpdateRoleMemberCollab role={isRole} setIsRole={setIsRole} /> */}
            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
         <DeleteTodoCollab checkingDetails={checkingDetails} collabList={collabList} />
         
        
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
export default MembersTodoSingleCollab;
