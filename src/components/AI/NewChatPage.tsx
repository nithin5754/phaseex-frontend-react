import { AISearchBar, ChatBar, EmptyPage } from "./index";
import { useDispatch, useSelector } from "react-redux";
import {
  addPrompt,
  PromptType,
  selectAllPrompt,
} from "@/app/redux/slice/geminiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllPromptQuery } from "@/app/redux/api/gtpSlice";
import { useEffect } from "react";

const NewChatPage = () => {
  const { groupId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!groupId) {
    navigate(-1);
    return;
  }

  const { data: getAllPrompt } = useGetAllPromptQuery({ groupId });

  useEffect(() => {
    if (
      getAllPrompt &&
      getAllPrompt.promptArray &&
      getAllPrompt.promptArray.length > 0
    ) {
      let data: PromptType[] = getAllPrompt.promptArray.map((prom) => ({
        id: prom.id,
        answer: prom.answer,
        question: prom.question,
        questionType: prom.questionType,
      }));

      dispatch(addPrompt({ prompt: data, groupId: getAllPrompt.id }));
    }
  }, [getAllPrompt]);

  useSelector(selectAllPrompt);

  return (
    <div className="flex flex-col justify-between    lg:w-3/4 m-auto">
      <>
        {getAllPrompt &&
        getAllPrompt.promptArray &&
        getAllPrompt.promptArray.length > 0 &&
        getAllPrompt.id === groupId ? (
          <>
            <ChatBar />
          </>
        ) : (
          <>
            <EmptyPage />
          </>
        )}
      </>

      <AISearchBar />
    </div>
  );
};

export default NewChatPage;
