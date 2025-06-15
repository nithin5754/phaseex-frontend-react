
import * as React from "react"

import { Progress } from "@/components/ui/progress"

interface Props{
  total:number;
  completed:number
}

export function TaskProgressTodo({total,completed}:Props) {
  let percentage=(completed/total)*100

  
  const [progress, setProgress] = React.useState(0)

  React.useEffect(()=>{
    setProgress(percentage)
  },[percentage])



  return <Progress value={progress} className="w-[60%]" />
}
