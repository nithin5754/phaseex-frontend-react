
import { BentoGrid, BentoGridItem } from "../components/aceternityuI/cards/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export function DashBoard() {
  return (
    <BentoGrid className="max-w-6xl mx-auto md:grid-cols-3 lg:grid-cols-4 gap-4  md:auto-rows-[10rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description} id={""} handleHideSubmit={function (id: string): Promise<any> {
            throw new Error("Function not implemented.");
          } } type={""}       
          // icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",

   
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },

];



