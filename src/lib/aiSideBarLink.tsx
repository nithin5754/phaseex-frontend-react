import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";


export const links:AIlinksType[] = [
  {
    label: "Dashboard",
    href: "#",
    icon: (
      <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Profile",
    href: "#",
    icon: (
      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
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