export default function handler(req, res) {
  if (req.method === "POST") {
    const { question } = req.body;

    res.status(200).json({
      answer: `📖 سؤالك كان: "${question}" \n✅ وهذا مثال لجواب تجريبي من الخادم.`
    });
  } else {
    res.status(405).json({ message: "الطريقة غير مسموحة" });
  }
}
