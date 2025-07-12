import React, { useContext } from "react";
import { Navbar } from "./Navbar";
import { Button } from "@/components/ui/button";
import {
  CompassIcon,
  Lightbulb,
  MessageCircle,
  Code,
  Send,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import  { GeminiContext } from "../context/context";
import { assets } from "../assets/assets";
export  function Main() {
  const cardItems = [
    {
      text: "What is the weather like in Douala City in Cameroon today?",
      icon: CompassIcon,
    },
    {
      text: "What are some creative ideas for a birthday party?",
      icon: Lightbulb,
    },
    {
      text: "Tips to manage a Dev team in a startup.",
      icon: MessageCircle,
    },
    {
      text: "Between Software skills and AI skills what is highly demanded in Cameroon?",
      icon: Code,
    },
  ];
  const {
    input,
    setInput,
    onSent,
    result,
    loading,
    setRecent,
    resultData,
    recent,
  } = useContext(GeminiContext);
  console.log("resultData", resultData);

  return (
    <div className="flex flex-col justify-between gap-3 px-4 h-screen w-full">
      <Navbar />
      {!result ? (
        <>
          <div className="px-2 flex flex-col gap-y-2">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-400 text-xl md:text-8xl font-bold">
              Hello Pola.
            </p>

            <p className="text-gray-400 text-xl md:text-3xl ">
              How can I help you today?
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {cardItems.map((c, i) => (
              <Card
                key={i}
                className="hover:cursor-pointer hover:shadow-r-sm hover:shadow-blue-500 max-w-sm"
              >
                <CardContent onClick={() => {
                    setRecent(c.text);
                    
                    onSent(c.text);
                  }} className="text-start gap-y-3 flex flex-col h-full justify-between ">
            
                 <p>{c.text}</p>
                  <p className="flex items-end justify-end rounded-full animate-pulse">
                    {c.icon && <c.icon />}
                  </p>
              
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col  gap-3 px-4 h-screen w-full max-w-7xl ">
          <div className="flex gap-x-3">
            <img
              src={assets.user_profile}
              className="w-10 rounded-full"
              alt="user profile"
            />

            <p>{recent}</p>
          </div>
          <div className="flex-grow">
            {loading ? (
             <div className="w-full h-full flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center gap-2 w-full max-w-xl px-4">
                <p>Searching...</p>
                <hr className="bg-blue-500 rounded-2xl" />
                <hr className="bg-blue-500 rounded-2xl" />
                <hr className="bg-blue-500 rounded-2xl" />
              </div>
            </div>
            ) : (
              <div
              className="result pt-4"
              dangerouslySetInnerHTML={{ __html: resultData }}
            />
            
            )}
          </div>
        </div>
      )}

<div className="area flex flex-col md:flex-row rounded-xl border mt-4 md:mt-2 p-5 md:p-2 justify-between items-end w-full gap-2">
  <textarea
    onChange={(e) => setInput(e.target.value)}
    value={input}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSent();
      }
    }}
    className="outline-0 flex-grow resize-none w-full md:w-auto pt-4"
    placeholder="Enter your prompt here"
    rows={1}
  />
  <Send
  size={20}
    className="hover:scale-105 cursor-pointer "
    onClick={() => onSent()}
  />
</div>

      <footer className="text-center text-sm font-mono text-gray-500 py-4">
        &copy; 2024-{new Date().getFullYear()} — Done by POLA · Web Developer at
        Techsprint
      </footer>
    </div>
  );
}
