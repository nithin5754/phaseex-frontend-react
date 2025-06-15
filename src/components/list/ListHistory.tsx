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
    { workspaceId, folderId, listId }
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
