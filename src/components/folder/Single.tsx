

import { useGetSingleFolderQuery } from "@/app/api/FolderApi";

import { useParams } from "react-router-dom";
import { LottieAnimation } from "../lootie/Lootie";
import EmptyList from '../../../public/json/empty-list-1.json'
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { OpenModal } from "../modal/folderEdit-modal";






const Single = () => {

  
  
  const { id ,folderId } = useParams();


if(!folderId||!id){
  return <h1>loading....</h1>
}



  const { data:singleFolder, error, isLoading } = useGetSingleFolderQuery({ spaceId:id, folderId });


  if(isLoading){
    return <h1>loading...</h1>
  }

  const truncateDesc = (desc: string) => {
    return desc.length > 10 ? desc.substring(0, 10) + "..." : desc;
  };

  
  return (
    
<div className="flex flex-col w-full">





<div className="flex flex-row w-full gap-2  items-center justify-around mx-4">


  <div className="flex w-[600px] bg-white border border-gray-200 rounded-lg h-36 p-4">
    {singleFolder && (
   <div className="flex flex-row">
       <div className="flex flex-col justify-between h-full">
        <h1 className="font-sfpro text-lg mb-2">Folder {singleFolder.folder_title}</h1>
        <p className="text-gray-600 text-sm font-sfpro mb-4">Description: {truncateDesc(singleFolder.folder_description)}</p>
        <h1 className="text-slate-600 text-sm font-sfpro">Created at {singleFolder.createdAt}</h1>
      </div>
      <OpenModal title={"edit"} icon={Plus} spaceId={id}/> 
    
   </div>
    )}
  </div>


  <div className="flex items-center w-[350px] justify-center bg-white border border-gray-200 rounded-lg h-36">
    <div className="text-center">
      <h1 className="font-sfpro text-lg">Create New List</h1>
    </div>
  </div>


  <div className="flex items-center w-full justify-center bg-white border border-gray-200 rounded-lg h-36">
  <div className="flex flex-col items-center justify-center">
    <Label htmlFor="picture" className="font-sfpro text-md mb-4">Upload resource for this folder</Label>
    <Input id="picture" type="file"  />
  </div>
</div>

</div>











    <div className="bg-white m-[50px]  border rounded-lg h-[400px]  overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between ">
            <h2 className="text-lg font-sfpro">Lists</h2>
            <Plus className="text-slate-500 hover:text-slate-800"/>
        </div>
        <div className=" py-4">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b border-gray-200 text-left text-xs font-sfpro text-gray-600 uppercase tracking-wider">
                            Name
                        </th>
                     
                        <th className="px-5 py-3 border-b border-gray-200 text-left text-xs font-sfpro text-gray-600 uppercase tracking-wider">
                            Progress
                        </th>
                        <th className="px-5 py-3 border-b border-gray-200 text-left text-xs font-sfpro text-gray-600 uppercase tracking-wider">
                            Start
                        </th>
                        <th className="px-5 py-3 border-b border-gray-200 text-left text-xs font-sfpro text-gray-600 uppercase tracking-wider">
                            End
                        </th>
                        <th className="px-5 py-3 border-b border-gray-200 text-left text-xs font-sfpro text-gray-600 uppercase tracking-wider">
                            Priority
                        </th>
                        <th className="px-5 py-3 border-b border-gray-200 text-left text-xs font-sfpro text-gray-600 uppercase tracking-wider">
                            Owner
                        </th>
                    </tr>
                </thead>
               
            </table>
            <div className="mt-4">
                <Button className=" m-2 bg-transparent hover:bg-transparent text-slate-700 text-sm p-2 font-sfpro">+ New List</Button>
            </div>
            <div className="flex items-center w-full justify-center text-center">
       <LottieAnimation animationData={EmptyList} height={200} width={200}/>
        </div>
        </div>
    </div>
</div>
  )
}
export default Single



