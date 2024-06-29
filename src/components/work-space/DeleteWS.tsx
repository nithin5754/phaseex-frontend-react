import { useDeleteWorkSpaceMutation } from "@/app/redux/api/spaceApi"
import { toast } from "../ui/use-toast"
import { Delete, DeleteIcon, Trash } from "lucide-react"


interface Props {
  workspaceId:string
}


const DeleteWS = ({workspaceId}:Props) => {

  
  const [deleteWorkSpace]=useDeleteWorkSpaceMutation()

const handleDelete=async()=>{
  try {

    await deleteWorkSpace({workspaceId}).unwrap()
    
  } catch (error:any) {
    if (!error.status) {
      toast({
        title: "no response",
        variant: "destructive",
      });
    } else if (error.status) {
      toast({
        title: `${error.data.message}`,
        variant: "destructive",
      });
    }
    
    
  }
}

  return (
   <Trash size={18} onClick={handleDelete}/>
  )
}
export default DeleteWS