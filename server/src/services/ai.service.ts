// services/ai.service.ts
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const MODEL = 'mistralai/mistral-7b-instruct';

export const askAI = async (question: string): Promise<string> => {
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: MODEL,
      messages: [
        {
          role: 'user',
          content: `Answer this question: ${question}`,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content;
};
