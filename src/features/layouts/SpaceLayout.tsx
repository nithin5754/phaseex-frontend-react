
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { WorkSpaceNav } from "../../components/work-space/index"
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";

const SpaceLayout = () => {
  const { id,folderId } = useParams();
const navigate=useNavigate()
   
  if(!id){
    return 
  }
    
  const goBack = () => {
    navigate(-1); 
  };
  return (
    <>
    {
      folderId?(
        <>
        <Button className="bg-transparent hover:bg-transparent border-none text-slate-600" onClick={goBack}> <ArrowBigLeft/></Button>
        </>
      ):(<WorkSpaceNav id={id} />)
    }
      
      <Outlet/>
    </>
    
  )
}
export default SpaceLayout