import { colors, colorSets } from "@/lib/colors";
import { useEffect, useState } from "react";


import { useAppDispatch } from "@/app/redux/api/store";
import {
  bgColor,
  borderColor,
  fontColor,
} from "@/app/redux/slice/uttilSlice";

const Theme = () => {
  const [_isColors, setColors] = useState<string[] | []>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setColors(colors);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="dark:text-primary">Colors</h1>
      <div className="flex flex-center gap-4">
        <>
          {colorSets.map((color, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  dispatch(bgColor(color.bg));
                  dispatch(borderColor(color.border));
                  dispatch(fontColor(color.fontColor));
                }}
                className={`uppercase h-12 w-12 flex items-center justify-center rounded-full`}
                style={{
                  backgroundColor: color.bg,
                  color: color.fontColor,
                  border: `1px solid ${color.border}`,
                }}
              ></button>
            );
          })}
        </>
      </div>
    </div>
  );
};
export default Theme;
