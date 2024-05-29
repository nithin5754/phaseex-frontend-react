



import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function ListProgressBar() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(20), 2000)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-[100%]" />
}
