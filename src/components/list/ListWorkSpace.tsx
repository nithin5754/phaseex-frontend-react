import { Plus } from "lucide-react"
import { LottieAnimation } from "../lootie/Lootie"
import { Button } from "../ui/button"
import EmptyList from '../../../public/json/empty-list-1.json'

const ListWorkSpace = () => {
  return (
   
    <div className="bg-white  border rounded-lg h-[400px]  overflow-hidden dark:bg-background dark:text-primary dark:border-border">
        <div className="px-6 py-4 border-b flex justify-between dark:border-border">
            <h2 className="text-lg font-sfpro dark:text-primary">Lists</h2>
            <Plus className="text-slate-500 hover:text-slate-800 dark:text-primary " />
        </div>
        <div className=" py-4">
            <table className="min-w-full leading-normal dark:text-primary">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b dark:border-border border-gray-200 text-left text-xs font-sfpro text-gray-600 dark:text-primary uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-5 py-3 border-b dark:border-border border-gray-200 text-left text-xs font-sfpro text-gray-600 dark:text-primary uppercase tracking-wider">
                            Color
                        </th>
                        <th className="px-5 py-3 border-b dark:border-border border-gray-200 text-left text-xs font-sfpro text-gray-600 dark:text-primary uppercase tracking-wider">
                            Progress
                        </th>
                        <th className="px-5 py-3 border-b dark:border-border border-gray-200 text-left text-xs font-sfpro text-gray-600 dark:text-primary uppercase tracking-wider">
                            Start
                        </th>
                        <th className="px-5 py-3 border-b dark:border-border border-gray-200 text-left text-xs font-sfpro text-gray-600 dark:text-primary uppercase tracking-wider">
                            End
                        </th>
                        <th className="px-5 py-3 border-b dark:border-border border-gray-200 text-left text-xs font-sfpro text-gray-600 dark:text-primary uppercase tracking-wider">
                            Priority
                        </th>
                        <th className="px-5 py-3 border-b dark:border-border border-gray-200 text-left text-xs font-sfpro text-gray-600 dark:text-primary uppercase tracking-wider">
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
                <Button className=" m-2 bg-transparent hover:bg-transparent text-slate-700 text-sm p-2 font-sfpro   dark:text-primary">+ New List</Button>
            </div>
            <div className="flex items-center w-full justify-center text-center">
       <LottieAnimation animationData={EmptyList} height={200} width={200}/>
        </div>
        </div>
    </div>
  )
}
export default ListWorkSpace