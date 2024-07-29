import { SetStateAction, useEffect, useState } from "react";
import { PlaceholdersAndVanishInput } from "../aceternityuI/search/placeholders-and-vanish-input";
import usePromptGemini from "@/hooks/usePromtGemini";
import { useDispatch } from "react-redux";
import { addAnswer, addQuestion } from "@/app/redux/slice/geminiSlice";
import FileUpload from "./Chat/FileUpload";
import { useParams } from "react-router-dom";
import {
  useAddAnswerApiMutation,
  useAddQuestionApiMutation,
} from "@/app/redux/api/gtpSlice";
import { SendPromptAnsType, SendPromptQusType } from "@/types/chatType";

export function AISearchBar() {
  const { groupId } = useParams();

  const [isTextChange, setTextChange] = useState<string>("");
  const [isTextSubmit, setTextSubmit] = useState<string | null>(null);
  const [addAnswerApi] = useAddAnswerApiMutation();
  const [addQuestionApi] = useAddQuestionApiMutation();
  const [promptId, setPromtId] = useState<string | null>(null);

  const dispatch = useDispatch();
  const placeholders = [
    "my name is phassex ai",
    "what is phaseex ai",
    "hello phaseex ai",
  ];

  const { data } = usePromptGemini(isTextSubmit ? isTextSubmit : null);

  useEffect(() => {
    if (data && isTextSubmit && groupId) {
      dispatch(addAnswer({ question: isTextSubmit, answer: data, groupId }));
      addFetchAns();
    }
  }, [data]);

  const addFetchAns = async () => {
    if (promptId && groupId && isTextSubmit && data) {
      let ansData: SendPromptAnsType = {
        promptId,
        groupId,
        question: isTextSubmit,
        answer: data,
      };
      await addAnswerApi(ansData).unwrap();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextChange(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (groupId && isTextChange) {
      setTextSubmit(isTextChange);
      dispatch(addQuestion({ question: isTextChange, groupId }));

      let data: SendPromptQusType = {
        groupId,
        questionType: "text",
        question: isTextChange,
      };

      let isCreated = await addQuestionApi(data).unwrap();

      if (isCreated) {
        setPromtId(isCreated.promptId);
      }
    }
  };
  return (
    <div className="h-[8rem] flex flex-col justify-end items-end px-4 relative">
      <FileUpload
        setImageArray={function (_value: SetStateAction<string[] | []>): void {
          throw new Error("Function not implemented.");
        }}
      />
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
