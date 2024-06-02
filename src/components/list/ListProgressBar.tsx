



import * as React from "react"

import { Progress } from "@/components/ui/progress"


interface Props {
  percentage:number
}


export function ListProgressBar({percentage}:Props) {
  const [progress, setProgress] = React.useState(0)



  let isPercentage:number=percentage?percentage:0

  React.useEffect(() => {


    
    const timer = setTimeout(() => setProgress(isPercentage), 2000)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className={`w-[100%]`} />
}
