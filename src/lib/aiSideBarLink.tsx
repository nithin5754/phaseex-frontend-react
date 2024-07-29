import { IconArrowLeft} from "@tabler/icons-react";
import { HomeIcon, MessageCircleHeart, Plus } from "lucide-react";


export const links:AIlinksType[] = [
  {
    label: "AI Home",
    href: "/phaseex-ai",
    icon: (
      <HomeIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "chat",
    href: "/phaseex-ai/chat",
    icon: (
      <MessageCircleHeart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "create new chat",
    href: "/phaseex-ai/create",
    icon: (
      <Plus  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "exist",
    href: "/space",
    icon: (
      <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];


export interface AIlinksType {
  label: string ;
  href: string;
  icon: JSX.Element;
}