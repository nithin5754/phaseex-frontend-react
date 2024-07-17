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
     

      <ColorPicker
        onChange={(v) => {
          setBgColor(v);
        }}
        value={IsbgColor}
      />
      {/* /** * @desc border color picker */ }
      <ColorPicker
        onChange={(v) => {
          setBorColor(v);
        }}
        value={isBorderColor}
      />
      {/* /** * @desc font color changer */ }
      <ColorPicker
        onChange={(v) => {
          setFColor(v);
        }}
        value={IsfontColor}
      />
    </div>
  );
};
