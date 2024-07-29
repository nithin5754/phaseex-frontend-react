import { geminiApi } from "./constant";

import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai'



const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];
const genAI = new GoogleGenerativeAI(geminiApi);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",safetySettings });



export default model