// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
    GoogleGenAI,
  } from '@google/genai';
  
 export async function chat(prompt) {
    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_API_KEY,
    });
    const tools = [
      {
        googleSearch: {
        }
      },
    ];
    const config = {
      thinkingConfig: {
        thinkingBudget: 5,
      },
      tools,
      responseMimeType: 'text/plain',
    };
    const model = 'gemini-2.5-pro';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];
  console.log("hel",contents)
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });
    let result = '';
    for await (const chunk of response) {
      result += chunk.text;
    }
  
    return result;
    // let fileIndex = 0;
    // for await (const chunk of response) {
    //   console.log(chunk.text);
    // }
  }
  
  
  