import { ArrowRight } from "lucide-react";
import { Button } from "./aceternityuI/moving-border";
import { useNavigate } from "react-router-dom";

export function LandingPageButton() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div>
      <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 font-sfpro text-center "
        onClick={handleNavigate}
      >
        Start here <ArrowRight className="ml-4" size={16} />
      </Button>
    </div>
  );
}
