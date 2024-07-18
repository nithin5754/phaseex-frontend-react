import { useEffect, useState } from "react";
import { ColorPicker } from "./ColorPicker";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBGCurrentColor,
  selectBorderCurrentColor,
  selectFontColorCurrentColor,
} from "@/app/redux/slice/uttilSlice";
import { bgColor, borderColor, fontColor } from "@/app/redux/slice/uttilSlice";

export const ColorPickerButton = () => {
  const backGroundColor = useSelector(selectBGCurrentColor);
  const borColor = useSelector(selectBorderCurrentColor);
  const textColor = useSelector(selectFontColorCurrentColor);

  const dispatch = useDispatch();

  const [IsbgColor, setBgColor] = useState<string>(backGroundColor);
  const [IsfontColor, setFColor] = useState(textColor);
  const [isBorderColor, setBorColor] = useState(borColor);

  useEffect(() => {
    dispatch(bgColor(IsbgColor));
  }, [dispatch, bgColor, IsbgColor,setBgColor]);

  useEffect(() => {
    dispatch(borderColor(isBorderColor));
  }, [dispatch, borderColor, isBorderColor,setBorColor]);


  useEffect(() => {
    dispatch(fontColor(IsfontColor));
  }, [dispatch, IsfontColor, fontColor,setFColor]);

  return (
    <div className="flex flex-row gap-4">
      {/* /** * @desc background color picker */ }
     

  <div className="flex flex-col gap-4">
  <ColorPicker
        onChange={(v) => {
          setBgColor(v);
        }}
        value={IsbgColor}
      />
      <h1 className="text-border">bg </h1>
  </div>

      {/* /** * @desc border color picker */ }

      <div className="flex flex-col gap-4">
      <ColorPicker
        onChange={(v) => {
          setBorColor(v);
        }}
        value={isBorderColor}
      />
      <h1 className="text-border">border </h1>
  </div>
  
      {/* /** * @desc font color changer */ }

      <div className="flex flex-col gap-4 ">
      <ColorPicker
        onChange={(v) => {
          setFColor(v);
        }}
        value={IsfontColor}
      />
      <h1 className="text-border">font </h1>
  </div>

    </div>
  );
};
