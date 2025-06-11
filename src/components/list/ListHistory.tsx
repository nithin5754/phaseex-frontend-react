import { useGetSingleListQuery } from "@/app/redux/api/listapi";
import { OpenModal as CreateTaskModal } from "../../components/modal/Task-create-modal";
import TemplateAbout from "../template/About/TemplateAbout";
import { Plus } from "lucide-react";
interface Props {
  workspaceId: string;
  folderId: string;
  listId: string;
}

const ListHistory = ({ workspaceId, folderId, listId }: Props) => {
  const {
    data: singleList,

    isLoading: isSingleListLoading,
  } = useGetSingleListQuery(
    { workspaceId, folderId, listId },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  if (isSingleListLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="flex flex-row w-full  gap-2  items-center justify-around ">
      <div
        className="w-full bg-white text-black border border-gray-200 rounded-lg p-6 h-auto dark:text-primary dark:bg-background 
  dark:border-border flex flex-row justify-between"
      >
        {singleList && (
          // <div className="flex flex-row p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
          //   <div className="flex flex-col justify-between w-full">

          //     <div className="flex flex-row justify-between items-center">
          //       <div className="flex items-center text-lg font-medium text-gray-800 dark:text-white gap-3">
          //         <List size={18} className="text-primary" />
          //         {
          //           upperCase(singleList.list_title)
          //         }

          //       </div>
          //       <div className="flex items-center">

          //       </div>
          //     </div>

          //     <p className="text-gray-600 text-sm mt-2 dark:text-gray-300">
          //       <span className="font-medium">Description:</span> {truncateDesc(singleList.list_description)}
          //     </p>

          //     <h1 className="text-gray-500 text-sm mt-2 dark:text-gray-400">
          //       Created at {singleList.createdAt}
          //     </h1>
          //   </div>
          // </div>
          <TemplateAbout
            templateAbout={{
              title: singleList?.list_title,
              description: singleList.list_description,
              owner_name: "",
              date: `${singleList.createdAt}`,
              type: "list",
            }}
          />
        )}

        <CreateTaskModal
          title={""}
          spaceId={workspaceId}
          folderId={folderId}
          icon={Plus}
          listId={listId}
        />
      </div>
    </div>
  );
};
export default ListHistory;
