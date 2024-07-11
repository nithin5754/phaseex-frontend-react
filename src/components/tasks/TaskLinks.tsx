import { TaskLinkType } from '@/features/types/taskType';

import { SingleLinks } from "../Links/index";




interface Props {
  links:TaskLinkType[]
}

const TaskLinks = ({ links }:Props) => {
  return (
    <div className='mt-4'>
      <h1 className="font-sfpro text-lg mb-2">Links</h1>
      <ul className='flex flex-wrap gap-4'>
        {links.map((link:TaskLinkType) => (
<SingleLinks link={link}/>
        ))}
      </ul>
    </div>
  );
};

export default TaskLinks;
