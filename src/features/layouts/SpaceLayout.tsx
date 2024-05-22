
import { Outlet, useParams } from "react-router-dom"
import { WorkSpaceNav } from "../../components/work-space/index"

const SpaceLayout = () => {
  const { id } = useParams();
   
  if(!id){
    return 
  }

  return (
    <>
      <WorkSpaceNav id={id} />
      <Outlet/>
    </>
    
  )
}
export default SpaceLayout