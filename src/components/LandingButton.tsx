
import { ArrowRight } from "lucide-react";
import { Button } from "./aceternityuI/moving-border";


export function LandingPageButton() {
  return (
    <div>
      <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 font-sfpro text-center "
      >
      Start here <ArrowRight className="ml-4" size={16}/>
      </Button>
    </div>
  );
}
