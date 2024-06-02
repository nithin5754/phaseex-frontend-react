import { Folder, Plus } from "lucide-react"
import { OpenModal } from "../modal/FolderModal"
import { Link, useParams } from "react-router-dom"
import { LottieAnimation } from "../lootie/Lootie"
import EmptyFolder from '../../../public/json/empty-folder-1.json'
import { ResponseFolderDataType } from "@/app/redux/api/FolderApi"



interface Props {
  getAllFolder:ResponseFolderDataType[],
  
}
const WorkSpaceFolder = ({getAllFolder}:Props) => {
  const { id } = useParams();

  if (!id) {
    return <h1>loading....</h1>;
  }

  return (
    <div className=" bg-white border border-gray-200 rounded-lg h-[250px] dark:bg-background dark:text-primary dark:border-border">
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
                        <Link  key={folder.id} to={`/space/${id}/folders/${folder.id}`}>
                        
                        <div className="bg-white w-full md:w-[300px] border rounded-md h-[40px] overflow-hidden flex items-center justify-between px-4 py-1 mx-auto mb-2 dark:bg-secondary dark:border-border dark:text-primary dark:hover:bg-card">
                          <span className="text-slate-400 dark:text-primary">
                            <Folder/>
                          </span>
                          <h1 className="font-sfpro text-slate-600 text-center dark:text-primary">
                            {folder.folder_title}
                          </h1>
                        </div>
                        </Link>
                    
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
  )
}
export default WorkSpaceFolder