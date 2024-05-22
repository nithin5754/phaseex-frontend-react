import { useGetSingleWorkSpaceQuery } from "@/app/api/spaceApi";
import { Link, useParams } from "react-router-dom";
import EmptyFolder from '../../../public/json/empty-folder-1.json'
import EmptyList from '../../../public/json/empty-list-1.json'
import { LottieAnimation } from "../lootie/Lootie";
import { Folder, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { OpenModal } from "../modal/FolderModal";
import { useGetAllFolderQuery } from "@/app/api/FolderApi";

const WorkSpaceDeatils = () => {
  const { id } = useParams();

  if (!id) {
    return <h1>loading....</h1>;
  }

  const { data: singleWorkSpace, isLoading } = useGetSingleWorkSpaceQuery(id);
  const { data: getAllFolder} = useGetAllFolderQuery(id);

  
  
  if (isLoading) {
      return <h1>loading........</h1>;
    }


  return (
  <div className="flex flex-col gap-6 p-4">

      <div className="flex flex-row w-full gap-2 items-center  justify-center ">
      <div className="flex items-center w-full justify-center bg-white border border-gray-200 rounded-lg h-[100px]">
        <div className="text-center">
          <h1 className="font-sfpro text-lg"></h1>
          <OpenModal  title={"create new Folder"} icon={Plus} spaceId={id}/> 
        </div>
      </div>

      <div className="flex items-center w-full justify-center bg-white border border-gray-200 rounded-lg h-[100px]">
        <div className="text-center">
          <h1 className="font-sfpro text-lg">create new List</h1>
        </div>
      </div>

      <div className="flex items-center w-full justify-center bg-white border border-gray-200 rounded-lg h-[100px]">
        <div className="text-center">
          <h1 className="font-sfpro text-lg">upload Resources</h1>
        </div>
      </div>
      </div>
{/* /**
 folder section overview here
 */ }

    <div className=" bg-white border border-gray-200 rounded-lg h-[250px]">
      <div className="flex justify-between p-4 ">
      <h1 className="text-xl font-sfpro ">Folder </h1>
      <OpenModal title={""} icon={Plus} spaceId={id}/> 
      </div>
            {
                getAllFolder&&getAllFolder.length>0?(

                   <>
                       <div className="flex flex-wrap gap-2 m-2 justify-center">
                    {
                     getAllFolder.slice(0, 6).map((folder) => {
                        return (
                          <div key={folder.id} className="bg-white w-full md:w-[300px] border rounded-md h-[40px] overflow-hidden flex items-center justify-between px-4 py-1 mx-auto mb-2">
                            <span className="text-slate-400">
                              <Folder/>
                            </span>
                            <h1 className="font-sfpro text-slate-600 text-center">
                              {folder.folder_title}
                            </h1>
                          </div>
                        )
                      })
                    }

                  
                  </div>
                   <span>
                    { getAllFolder.length>6&&(
                      <>
                         <Link  to={`/space/${id}/folders`}>
                          <h3 className="font-sfpro text-center">view more</h3>
                         </Link>
                      </>
                    )}
                </span>
                   </>
                
               
                  
               ):(
                   <div className="flex items-center w-full justify-center text-center">
                   
                   <LottieAnimation animationData={EmptyFolder} height={200} width={200}/>
        </div>
               )
            }
       
      

       

      </div>


    {/* list section over view */}

    <div className="bg-white  border rounded-lg h-[400px]  overflow-hidden">
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
                            Color
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
                {/* <tbody>
                    <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            List
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div className="text-xs font-sfpro inline-block text-gray-600">0/0</div>
                                </div>
                                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                                    <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500" ></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </td>
                    </tr>
                </tbody> */}
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
  );
};
export default WorkSpaceDeatils;
