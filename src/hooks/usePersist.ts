import { useEffect, useState } from "react"



const usePersist=()=>{
  const persistedValue = localStorage.getItem("persist");
const initialPersist = persistedValue ? JSON.parse(persistedValue) : false;
  const [persist,setPersist]=useState(initialPersist||false)

  useEffect(()=>{
    localStorage.setItem("persist",JSON.stringify(persist))
  },[persist])

  return [persist, setPersist]
}


export default usePersist