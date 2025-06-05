const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function analyzeProduct(url) {
  const prompt = `
Act as a smart AI shopping expert called "Buy Smart with Tom".

You do not actually browse the internet — but you **simulate** what an intelligent assistant would do if they could. Your job is to help a customer make smarter purchase decisions.

The user has sent you this product link: ${url}

You must:
- Imagine you're searching Amazon, AliExpress, Temu, and Alibaba to find if this product exists under different names.
- Judge whether the product seems like a white-label item.
- Pretend to review the product features, price, and see if similar items are sold for much cheaper.
- Based on your knowledge, guess what comparable products exist and suggest better options if available.
- Simulate checking reviews: whether they are fake or suspicious, and whether the site’s customer numbers seem real.

Structure your answer with helpful sections (📌 Overview, 🔍 Product Match, 💸 Price Check, ✅ Recommendation). Respond in warm, helpful, clear tone — like a shopping-savvy friend helping out.

Always return a full detailed answer, even if you’re only “simulating” the research.
`;


  try {
    const chat = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4"
    });

    return chat.choices[0].message.content;
  } catch (err) {
  console.error("🔴 OpenAI error:", err.response ? err.response.data : err.message);
  return "Oops! I had trouble analyzing this product. Please try again later.";
}
}

module.exports = { analyzeProduct };
