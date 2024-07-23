import space1 from "../../public/png/space1.png";
import space2 from "../../public/png/space2.png";
import space3 from "../../public/png/space-3.png";

import list from "../../public/png/folder.png";
import folder from "../../public/png/list.png";
import todo from "../../public/png/todo.png";

import { useSelector } from "react-redux";
import { HeroParallax } from "./aceternityuI/parallax/hero-parallax";
import { selectCurrentToken } from "@/features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function LandingPage() {
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/homepage";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [navigate, token, location, from]);
  return (
    <div className="dark:bg-background pb-6">
      <HeroParallax products={products} />
    </div>
  );
}
export const products = [
  {
    title: "Galaxy space",
    link: "/space",
    thumbnail: space1,
  },
  {
    title: "Full Galaxy",
    link: "/space",
    thumbnail: space2,
  },
  {
    title: "Empty hidden One",
    link: "/space",
    thumbnail: space3,
  },

  {
    title: "Folder",
    link: "/space",
    thumbnail: folder,
  },

  {
    title: "list",
    link: "/space",
    thumbnail: list,
  },
  {
    title: "Advanced Todo",
    link: "/space",
    thumbnail: todo,
  },

  {
    title: "list",
    link: "/space",
    thumbnail: list,
  },

  {
    title: "list",
    link: "/space",
    thumbnail: list,
  },

  {
    title: "todo",
    link: "/space",
    thumbnail: todo,
  },

  {
    title: "space",
    link: "/space",
    thumbnail: space1,
  },

  {
    title: "folder",
    link: "/space",
    thumbnail: folder,
  },

  {
    title: "empty",
    link: "/space",
    thumbnail: space3,
  },

  {
    title: "Galaxy",
    link: "/space",
    thumbnail: space2,
  },
  {
    title: "todo",
    link: "/space",
    thumbnail: todo,
  },
];
