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
    <div className="dark:bg-background">
      <HeroParallax products={products} />
    </div>
  );
}
export const products = [
  {
    title: "Galaxy space",
    link: "http://localhost:5173/space",
    thumbnail: space1,
  },
  {
    title: "Full Galaxy",
    link: "http://localhost:5173/space",
    thumbnail: space2,
  },
  {
    title: "Empty hidden One",
    link: "http://localhost:5173/space",
    thumbnail: space3,
  },

  {
    title: "Folder",
    link: "http://localhost:5173/space",
    thumbnail: folder,
  },

  {
    title: "list",
    link: "http://localhost:5173/space",
    thumbnail: list,
  },
  {
    title: "Advanced Todo",
    link: "http://localhost:5173/space",
    thumbnail: todo,
  },

  {
    title: "list",
    link: "http://localhost:5173/space",
    thumbnail: list,
  },

  {
    title: "list",
    link: "http://localhost:5173/space",
    thumbnail: list,
  },

  {
    title: "todo",
    link: "http://localhost:5173/space",
    thumbnail: todo,
  },

  {
    title: "space",
    link: "http://localhost:5173/space",
    thumbnail: space1,
  },

  {
    title: "folder",
    link: "http://localhost:5173/space",
    thumbnail: folder,
  },

  {
    title: "empty",
    link: "http://localhost:5173/space",
    thumbnail: space3,
  },

  {
    title: "Galaxy",
    link: "http://localhost:5173/space",
    thumbnail: space2,
  },
  {
    title: "todo",
    link: "http://localhost:5173/space",
    thumbnail: todo,
  },
];
