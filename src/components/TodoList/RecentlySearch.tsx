import { Search } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../ui/command"

import { LottieAnimation } from "../lootie/Lootie"

import noSearchUser from '../../../public/json/empty-user-1.json'
import { useSelector } from "react-redux"
import {  selectRecentlySearchQuery, selectShowRecently, setSearchTodoQuery } from "@/app/redux/slice/todoSlice"
import { useAppDispatch } from "@/app/redux/api/store"

  const RecentlySearch = () => {
    const recentlySearchItem=useSelector(selectRecentlySearchQuery)
    const recentlySuggestionOpen=useSelector(selectShowRecently)

const dispatch=useAppDispatch()
  
    return (
   <>
 
{
 recentlySuggestionOpen&&(
    <div className="border dark:border-border  m-auto  rounded-md absolute w-[300px] mt-12 z-50    ">
    <Command>
      <CommandList >
        <CommandGroup heading="Recently search" className="bg-slate-900" >
          {recentlySearchItem && recentlySearchItem.length > 0? (
            recentlySearchItem.map((query) => (
              <CommandItem >
              <Search size={18} className="mr-4" onClick={() => dispatch(setSearchTodoQuery(query))}/>
              {query}
            </CommandItem>
            ))
          ) : (
            <CommandEmpty>
              <LottieAnimation
                animationData={noSearchUser}
                height={100}
                width={300}
              />
            </CommandEmpty>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
    </div>
  )
}

   
   </>
    )
  }
  export default RecentlySearch