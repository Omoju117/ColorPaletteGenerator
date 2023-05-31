require("dotenv").config();

const openAiModule = require("openai");
const { Configuration, OpenAIApi } = openAiModule;

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// カラーパレット
app.get("/", async (req, res) => {
  // デフォルトカラー
  let colors = [
    { color: "#94D0FA" },
    { color: "#F4DE3D" },
    { color: "#F19A2E" },
    { color: "#D46A2D" },
    { color: "#555A2D" },
    { color: "#2F9BCA" },
    { color: "#EA6D61" },
    { color: "#D4AF37" },
  ];

  // ユーザの入力したテーマカラーがある場合、カラーパレットを生成する
  let theme = req.query.theme;
  if (theme) {
    const generatedColors = await generateColors(theme);
    colors = generatedColors.map((color) => ({ color: color }));
  }
  res.render("index", {
    colors: colors,
  });
});

app.listen(PORT, () => console.log(`Server is running :PORT ${PORT}`));

/**
 * テーマカラーを元にカラーパレットを構成する色の配列を取得する
 * @param {string} theme ユーザが入力したテーマカラー
 * @returns {Promise<Array<string>>} 色の配列
 */
async function generateColors(theme) {
  // Request OpenAI API
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openAi = new OpenAIApi(configuration);
  const prompt = `You are a color palette generating assistant that responds to text prompts for color palettes.
  You should generate color palettes that fit the theme, mood , or instructions in the prompt.
  The palettes should be 8 colors.
  
  Q: Convert the following verbal description of a color palette into a list of colors: a beautiful sunset.
  A: ["#F3D5A2","#F8CB79","#F2A753","#EC892C","#E76E04","#DD5300","#C03B02","#A31D05"]

  Desired Format: a JSON array of hexadecimal color codes

  Q: Convert the following verbal description of a color palette into a list of colors: ${theme}.
  A: 
  `;
  const response = await openAi.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 200,
  });
  const output = response.data.choices[0].text;
  console.log("OpenAI response: ", output);
  return JSON.parse(output);
}
