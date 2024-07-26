import { IconArrowLeft, IconSettings } from "@tabler/icons-react";
import { HomeIcon, MessageCircleHeart } from "lucide-react";


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
    href: "/phaseex-ai/ai-chat",
    icon: (
      <MessageCircleHeart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "#",
    icon: (
      <IconSettings  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "back",
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