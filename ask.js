export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Question is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // مفتاحك موجود كبيئة سرية
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "أجب عن أسئلة الطلاب بالاعتماد على المنهج الفلسطيني فقط." },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "لم أستطع العثور على جواب.";

    res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطأ في الاتصال مع الذكاء الاصطناعي" });
  }
}