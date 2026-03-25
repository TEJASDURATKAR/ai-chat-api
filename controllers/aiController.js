import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";



const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const askAI = async (req, res) => {

  try {

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt required"
      });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: prompt }
      ],
      model: "llama-3.1-8b-instant"
    });

    res.json({
      success: true,
      reply: completion.choices[0].message.content
    });
    console.log("FULL RESPONSE:", completion); // 🔥 full data
    console.log("AI Reply:", completion.choices[0].message.content);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI error"
    });

  }

};