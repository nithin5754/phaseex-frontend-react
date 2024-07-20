import { useAddProfileMutation } from "@/app/redux/api/UserApi";
import {
  selectCurrentUserImg,
  setLoadingImg,
  setUserImg,
} from "@/features/auth/authSlice";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";

const AddProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectCurrentUserImg);

  const [previewUrl, setPreviewUrl] = useState<string | null>(profile);

  const [AddProfile] = useAddProfileMutation();

  const imageUpload = async (formData: FormData) => {
    try {
      dispatch(setLoadingImg(true));

      const response = await AddProfile(formData).unwrap();

      if (response) {
        dispatch(setUserImg(response.profile_image));
        dispatch(setLoadingImg(false));
      }

    } catch (error) {
      console.error("Failed to upload image:", error);
      dispatch(setLoadingImg(false));
    }finally{
      dispatch(setLoadingImg(false));
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };

      fileReader.readAsDataURL(selectedFile);

      const formData = new FormData();
      formData.append("profile_image", selectedFile);

      imageUpload(formData);
    }
  };
  return (
    <div className=" shadow-sm relative flex flex-col items-center justify-center rounded-md py-8 mt-3">
      <img
        className="inline-block h-40 w-40 rounded-full ring-2 ring-white"
        src={previewUrl ? previewUrl : ""}
        alt=""
      />

      <Input
        type="file"
        accept="image/*"
        className="w-full h-full top-0 left-0 absolute opacity-0"
        onChange={handleImageChange}
      />
    </div>


  );
};
export default AddProfile;
