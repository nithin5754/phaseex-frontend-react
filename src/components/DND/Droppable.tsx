import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props:any) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
 if(props.id==='C'){
   return(
    <div ref={setNodeRef} style={style} className='fixed left-10 bottom-10 z-50 bg-transparent  w-[400px] h-[100px]' >
    {props.children}
  </div>
   )
  }
}