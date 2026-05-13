const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home_page.html"));
});

app.get("/search", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "search_page.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "about_page.html"));
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

app.get("/recipes/:fruit", async (req, res) => {
    const fruit = req.params.fruit;

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${fruit}`);
        const data = await response.json();
        
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/userHistory", async (req, res) => {
    const { fruit } = req.body;
    const { data, error } = await supabase.from("userHistory").insert([{ fruit: fruit }]);

    if (error) {
        return res.status(500).json({ error });
    }

    res.json(data);
});

app.get("/userHistory", async (req, res) => {
    const { data, error } = await supabase.from("userHistory").select("*");

     if (error) {
        return res.status(500).json({ error });
    }
    
    res.json(data);
})

module.exports = app;