const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home_page.html"));
});

app.get("/recipes", async (req, res) => {
  try {
    const { data, error } = await supabase.from("recipes").select();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/recipes", async (req, res) => {
  try {
    const { recipe_name, ingredients, instructions } = req.body;

    const { data, error } = await supabase
      .from("recipes")
      .insert([{ recipe_name, ingredients, instructions }])
      .select();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/fruit/:name", async (req, res) => {
  const fruit = req.params.name;

  const response = await fetch(`https://fruityvice.com/api/fruit/${fruit}`);

  if (!response.ok) {
    return res.status(404).json({ error: "Fruit not found" });
  }

  const data = await response.json();

  res.json({
    name: data.name,
    carbs: data.nutritions.carbohydrates,
    protein: data.nutritions.protein,
    fat: data.nutritions.fat,
    calories: data.nutritions.calories,
    sugar: data.nutritions.sugar
  });
});

module.exports = app;