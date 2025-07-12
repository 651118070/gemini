import { createContext, useState } from "react";
import { chat } from "../config/Gemini";
export const GeminiContext = createContext({});
export const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recent, setRecent] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const delayParam = (index, nextword) =>
    setTimeout(() => {
      setResultData((prev) => prev + nextword);
      if (index === 0) {
        setLoading(false);
      }
    }, 75 * index);
  //     const onSent=async()=>{
  //         setResultData("")
  //         setLoading(true)
  //         setResult(true)
  //         setRecent(input)
  //         setPreviousPrompt((prev) => [
  //             ...prev,
  //             { prompt: input, result: newResponse2 }
  //           ]);

  //         setInput('');
  //         const response= await chat(input)
  //         console.log('response',response)
  //         let responseArray = response.split("**");
  //         let newResponse = ""; // ✅ initialization

  //         for (let i = 0; i < responseArray.length; i++) {
  //             console.log(responseArray[i]);
  //           if (i === 0 || i % 2 !== 1) {
  //             console.log(newResponse)
  //             newResponse += responseArray[i];
  //             console.log("bob",newResponse)
  //           } else {
  //             newResponse += `<span class="text-blue-500 font-bold">${responseArray[i]}</span>`;
  //             console.log('dcs',newResponse)
  //           }
  //         }
  //         let newResponse2=newResponse.split('**').join('<br/>')
  //         let newResponseArray=newResponse2.split(' ');
  //         for(let i=0;i<newResponseArray.length;i++){
  //             delayParam(i,newResponseArray[i]+' ')
  //         }
  //         setLoading(false);
  //         setResultData(newResponse2);

  // }
  const onSent = async (prompt = null) => {
    const finalPrompt = prompt ?? input;

  if (!finalPrompt.trim()) return;
    setResultData("");
    setLoading(true);
    setResult(true);
    setRecent(input);
  

    const response = await chat(finalPrompt);
    console.log("response", response);

    let responseArray = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += `<span class="text-blue-500 font-bold">${responseArray[i]}</span>`;
      }
    }

    let newResponse2 = newResponse.split("**").join("<br/>");
    let newResponseArray = newResponse2.split(" ");

    for (let i = 0; i < newResponseArray.length; i++) {
      delayParam(i, newResponseArray[i] + " ");
    }

    // Now update previousPrompt with newResponse2 (result)
    setPreviousPrompt((prev) => [
      ...prev,
      { prompt: finalPrompt, result: newResponse2 },
    ]);
    setInput("");
    setLoading(false);
    setResultData(newResponse2);
  };

  const value = {
    input,
    setInput,
    onSent,
    result,
    setResult,
    setRecent,
    setResultData,
    loading,
    previousPrompt,
    resultData,
    recent,
  };
  return (
    <GeminiContext.Provider value={value}>{children}</GeminiContext.Provider>
  );
};
