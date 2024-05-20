import { LottieAnimation } from '@/components/lootie/Lootie'
import workspaceLootie from '../../../public/json/workspace-1.json'
import { WorkspaceForm } from '@/components/work-space/index'

const CreateSpace = () => {
  return (
    <div className="flex-1 p-4 lg:order-1 ">
    <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-sfpro ">Let's  build a Workspace</h1>
   
    </div>
 
    <div className="flex flex-col  bg-white border border-gray-200 rounded-lg h-[500px] p-4">
      <div className="">
    
       <p className='font-sfpro'>  We are creating a dedicated space for your project within our tool signifies the inception of a strategic journey towards achieving your objectives</p>
      </div>
          <div className="flex flex-row items-center justify-center">
    <span className='lg:block hidden'>
    <LottieAnimation animationData={workspaceLootie} height={400} width={400} />
    </span >
           <WorkspaceForm handleClose={undefined}/>
          </div>
    </div>
</div>
  )
}
export default CreateSpace