




import * as React from "react"
import { Input } from "../ui/input";
import { Search } from "lucide-react";




const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NabBar() {
  return (

<nav className="bg-white  border-gray-200 dark:bg-background dark:text-white ">
  <div className="max-w-screen-xl flex flex-wrap items-end justify-end mx-auto  p-4 ">
    <div className="mr-4  ">
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-background">
        <li>
        <div className="relative ">
        <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
         <Search className="h-5  w-5" />
        </div>
      <Input placeholder="search here..." className="pl-10 h-8"/>
      
    </div>
        </li>
       
      </ul>
    </div>
</div>
  </div>
</nav>

  )
}

