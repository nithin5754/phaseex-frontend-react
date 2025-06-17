import { OpenModal as CreateTaskModal } from "../../components/modal/Task-create-modal";
import TemplateAbout from "../template/About/TemplateAbout";
import { Plus } from "lucide-react";
import { useContext } from "react";
import { ListsContext } from "@/app/context/lists.context";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";




interface Props {
  permission: boolean;
}

const ListHistory = ({ permission = false }: Props) => {

  const { lists, isLoading } = useContext(ListsContext);



  if (isLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="flex flex-row w-full  gap-2  items-center justify-around ">
      <div
        className="w-full bg-white text-black border border-gray-200 rounded-lg p-6 h-auto dark:text-primary dark:bg-background 
  dark:border-border flex flex-row justify-between"
      >
        {lists && (
          <TemplateAbout
            templateAbout={{
              title: lists?.list_title,
              description: lists.list_description,
              owner_name: "",
              date: `${lists.createdAt}`,
              type: "list",
            }}
          />
        )}

        { permission ? (
          <CreateTaskModal
            title={""}
            icon={Plus}
            isManagerExists={permission}
          />
        ) : (
          <Button
            className="bg-transparent hover:bg-transparent"
            onClick={() =>
              toast({
                title: "Manager missing!",
                description:
                  "A manager must be added to the list before assigning a developer.",
                variant: "destructive",
              })
            }
          >
            <Plus color="gray" />
          </Button>
        )}
      </div>
    </div>
  );
};
export default ListHistory;
