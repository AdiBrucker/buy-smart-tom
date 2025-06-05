
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function analyzeProduct(url) {
  const prompt = `
You are a smart shopping assistant. A user gave you this product link: ${url}
Your job is to:
- Detect if the product is likely a white-label or generic (Alibaba-style) product.
- Check if it is sold cheaper on AliExpress, Amazon, or Temu.
- Analyze if the reviews on the page look fake.
Give your full answer in a friendly way that helps the user decide if they should buy or not.
  `;

  try {
    const chat = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4"
    });

    return chat.choices[0].message.content;
  } catch (err) {
    console.error("OpenAI error:", err);
    return "Oops, I had trouble analyzing this product. Try again later!";
  }
}

module.exports = { analyzeProduct };
