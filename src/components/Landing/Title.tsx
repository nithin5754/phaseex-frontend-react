import { TypewriterEffect } from "../aceternityuI/typing/typewriter-effect";
import { LandingPageButton } from "../LandingButton";


export function Title() {
  const words = [
    {
      text: "One",

    },
    {
      text: "App",
    },
    {
      text: ",",
    },
    {
      text: "Replace",
      className:"text-blue-500 dark:text-blue-500",
    
    },
    {
      text: "them",
     
    },
    {
      text: "all.",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[43rem] px-4   ">

      <TypewriterEffect words={words} />

      <div className="flex flex-col justify-center items-center mx-auto mt-8 w-full">
        <div className="font-sfpro dark:text-primary">
        Supercharge productivity. Streamline work by doing it, and seeing it, in one place.
        </div>

 <div className="mt-4">
   <LandingPageButton/>
 </div>

  </div>

    </div>
  );
}
