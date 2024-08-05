import model from "@/lib/gemini";
import { useState, useEffect } from "react";

function usePromptGemini(question: string | null) {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (question) {
          const result = await model.generateContent(question);
          const response = await result.response;
          const textResponse = response.text();

          if (textResponse) {
            setData(textResponse);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [question]);

  return { data };
}

export default usePromptGemini;
