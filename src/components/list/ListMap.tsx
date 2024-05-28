import { ResponseListDataType } from "@/app/redux/api/listapi"
import { PriorityListSetting, UpdateDateList } from "../list/index";
import moment from 'moment'


interface Props {
  list:ResponseListDataType,
  index:number
  folderId:string,
  workspaceId:string
}



const ListMap = ({list,index,folderId,workspaceId}:Props) => {
  const start_date = moment(list.list_start_date, 'MMMM D, YYYY - h:mm a').toDate();
  const due_date = moment(list.list_due_date, 'MMMM D, YYYY - h:mm a').toDate();
  return (
<tr key={list.id} className="border-b border-gray-200 dark:border-border">
  <td className="px-5 py-3 text-sm bg-white dark:bg-background">
    {index+1}
  </td>
  <td className="px-5 py-3 text-sm bg-white dark:bg-background">
    {list.list_title}
  </td>
  <td className="px-5 py-3 text-sm bg-white dark:bg-background">
    {list.list_description}
  </td>
  <td className="px-5 py-3 text-sm bg-white dark:bg-background">
    list
  </td>
  <td className="flex px-5 py-3 my-auto text-[12px] dark:bg-background">

    {list.list_start_date}

      <UpdateDateList start_date={start_date} due_date={due_date} folderId={folderId} workspaceId={workspaceId} listId={list.id}/>
   
    
  </td>
  <td className="flex px-5 py-3 my-auto text-[12px]  dark:bg-background">
    {list.list_due_date}
   
  </td>
  <td className="px-5 py-3 text-sm bg-white dark:bg-background">
    <PriorityListSetting priority={list.priority_list} id={list.id} folderId={folderId} workspaceId={workspaceId}/>
  </td>
</tr>

  )
}
export default ListMap