import { CreateNewGPTChat } from "@/components/AI"


const CreateFormPage = () => {
  return (

       <div className="h-auto max-w-md w-full m-auto rounded-none md:rounded-xl p-4 md:p-8 shadow-input bg-white dark:bg-black z-50">
        <h2 className="font-medium text-xl text-neutral-800 dark:text-neutral-200 mb-6 text-center">
         Create new chat 
        </h2>
   

        <CreateNewGPTChat/>
   

      </div>

  )
}
export default CreateFormPage