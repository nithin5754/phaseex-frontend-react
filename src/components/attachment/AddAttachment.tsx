import { useState } from "react";

import { Input } from "../ui/input";
import { useOnCreateAttachMentMutation } from "@/app/redux/api/attachmentApi";

import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Loader } from "lucide-react";
import { toast } from "../ui/use-toast";

interface Props {
  handleClose: () => void;
}

const AddAttachment = ({ handleClose }: Props) => {
  const [isFileName, setFileName] = useState<string>("");
  const [isFdescription, setFileDescription] = useState<string>("");
  const [isFile, setFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { id, folderId, listId, taskId } = useParams();

  const [onCreateAttachMent] = useOnCreateAttachMentMutation();

  const formData = new FormData();

  const attachmentUpload = async () => {
    setLoading(true);

    try {
      if (formData && id && folderId && listId && taskId && isFile) {
        formData.append("attachmentFile", isFile);
        formData.append("workspaceId", id);
        formData.append("folderId", folderId);
        formData.append("listId", listId);
        formData.append("taskId", taskId);
        formData.append("attachmentName", isFileName);
        formData.append("attachment_description", isFdescription);
        const response = await onCreateAttachMent(formData).unwrap();
        if (response) {
          handleClose();
          setLoading(false);
          toast({
            title: "new file uploaded ",
            variant: "destructive",
          });
        }
      }
    } catch (error:any) {
      if (!error.status) {
        toast({
          title: "no response",
          variant: "destructive",
        });
      } else if (error.status) {
        toast({
          title: `${error.data.message}`,
          variant: "destructive",
        });
      }

    } finally {
      handleClose();
      setLoading(false);

    
    }
  };

  const handleAttachmentChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
    }
  };
  return (
    <div className="shadow-lg flex flex-col items-center justify-center rounded-lg
     p-6 mt-6 bg-background gap-3  ">
      <div className="grid w-full max-w-sm items-center gap-2.5">
        <Label htmlFor="fileNAME" className="dark:text-primary mb-2">
          File Name
        </Label>
        <Input
          id="fileNAME"
          type="text"
          placeholder="Enter name of the file"
          className="dark:text-primary"
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-2.5">
        <Label htmlFor="description" className="dark:text-primary mt-2">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Enter description for the file"
          className="dark:text-primary"
          onChange={(e) => setFileDescription(e.target.value)}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-2.5">
        <Label htmlFor="picture" className="dark:text-primary mt-2">
          Picture
        </Label>
        <Input
          id="picture"
          type="file"
          accept="image/*"
          className="dark:text-primary"
          onChange={handleAttachmentChange}
        />
      </div>

      <h1 className="text-slate-500 text-xs text-start">
        ** accept .jpg,jpeg file only
      </h1>
      {isLoading ? (
        <>
          <Loader className="animate-spin dark:text-primary" size={22} />
        </>
      ) : (
        <Button
          onClick={attachmentUpload}
          className="px-4 py-2 transition duration-200 mt-4"
        >
          Upload file
        </Button>
      )}
    </div>
  );
};
export default AddAttachment;
