import { useUploadFileToGPTMutation } from "@/app/redux/api/uploadFile";
import { Input } from "@/components/ui/input";

import { Paperclip } from "lucide-react";

interface Props {
  setImageArray: React.Dispatch<React.SetStateAction<[] | string[]>>;
}

const FileUpload = ({ setImageArray }: Props) => {
  const [UploadFileToGPT] = useUploadFileToGPTMutation();

  const HandleUploadFile = async (formData: FormData) => {
    try {
      const response = await UploadFileToGPT(formData).unwrap();

      if (response) {
        console.log(response);
        setImageArray((prev) => [...prev, response]);
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];

      const fileReader = new FileReader();

      fileReader.readAsDataURL(selectedFile);

      const formData = new FormData();
      formData.append("gpt_image", selectedFile);

      HandleUploadFile(formData);
    }
  };

  return (
    <div className="absolute left-[200px] pl-2 bottom-0 z-50 dark:bg-zinc-800 h-12 rounded-l-full flex items-center">
      <label htmlFor="file-upload" className="cursor-pointer">
        <Paperclip size={24} className="text-slate-400" />
      </label>
      <Input
        id="file-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};
export default FileUpload;
