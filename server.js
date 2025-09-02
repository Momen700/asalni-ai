import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "أنت مساعد ذكي تجيب على أسئلة الطلاب حسب المناهج الفلسطينية بأسلوب مبسط." },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "حدث خطأ في الاتصال بالنموذج" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));