import { ArrowRight } from "lucide-react";
import { Button } from "./aceternityuI/moving-border";
import { useNavigate } from "react-router-dom";

export function LandingPageButton() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
   
      <Button
        borderRadius=".50rem"
        className="bg-white px-4 py-2 dark:bg-slate-900 text-black dark:text-white border-neutral-200
         dark:border-slate-800 font-sfpro text-center "
        onClick={handleNavigate}
      >
        Start here <ArrowRight className="ml-4" size={16} />
      </Button>

  );
}
