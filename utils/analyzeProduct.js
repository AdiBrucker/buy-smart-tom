const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function analyzeProduct(url) {
  const prompt = `
היי, אני רוצה שתעזור לי לבדוק מוצר באתר מכירות.

אני אשלח לך לינק ואתה תעשה חיפוש "מדומה" באינטרנט ותגיד לי האם מדובר במוצר ייחודי, או שמדובר ב-white label שמופיע אצל הרבה ספקים אחרים, במיוחד באתרים כמו עליבאבא, טימו או עליאקספרס.

תבדוק אם יש מוצרים מאוד דומים שנראים זהים, אם יש הבדל משמעותי במחיר, ואם כדאי לקנות את המוצר מהאתר ששלחתי או שעדיף אלטרנטיבה.

תנתח גם את הביקורות באתר: האם הן נראות אמינות, האם כמות הלקוחות שצוינה הגיונית בהתאם לזמן פעילות האתר, ועוד.

תשתמש בידע שלך כדי לדמות ניתוח חכם של המחיר, הפיצ'רים, הדמיון למוצרים קיימים, ולתת המלצה אם כדאי לקנות.

הלינק למוצר: ${url}

אם תוכל להמליץ על מוצרים דומים במחיר זול יותר – תעשה זאת.
תענה בצורה ברורה, עם כותרות, טון אישי ועוזר – כאילו אתה הבוט "Buy Smart with Tom" 🛍️
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
