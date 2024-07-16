
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props:any) {
  const {attributes, listeners, setNodeRef, transform={x:50,y:50}} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className={' bg-blue-950 text-center absolute bottom-10 right-10'}>
      {props.children}
    </button>
  );
}