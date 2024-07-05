

import { Link } from "react-router-dom";



const components: { title: string; href: string; description: string }[] = [
  {
    title: "overview",
    href: "",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "folders",
    href: "/folders",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "lists",
    href: "/lists",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "members",
    href: "/members",
    description: "Visually or semantically separates content.",
  }
]


interface Props {
  id:string
}

export function WorkSpaceNav({id}:Props) {
  return (

<nav className="bg-white  border-gray-200   dark:bg-background dark:text-white">
  <div className="max-w-screen-xl flex flex-wrap items-start justify-start mx-auto  p-4 ">
    <div className="mr-4  ">
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-sfpro flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-background dark:text-white">
        {
           components.map((component,index)=>{
            return(

              <div key={component.href}>
   <Link   to={`/space/${id}${component.href}`}>
   <li key={component.title}>
          <h1>{component.title}</h1>
        </li>
   </Link>

              </div>
            )
           })
        }
   
       
      </ul>
    </div>
</div>
  </div>
</nav>

  )
}

