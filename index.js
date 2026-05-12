const express = require("express");
const bodyParser = require("body-parser");
const supabaseClient = require("@supabase/supabase-js");
const dotenv = require("dotenv");

const app = express();
dotenv.config()

app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey);

const path = require("path");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home_page.html"));
});

app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search_page.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about_page.html'));
});

app.get('/style', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about_page.html'));
});

//GET from Supabase
app.get('/recipes', async (req, res) => {
    console.log("Getting all recipes");

   try {
        const { data, error } = await supabase.from("recipes").select();

        if (error) throw error;

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

//POST to Supabase
app.post('/recipes', async (req, res) => {
    console.log("adding recipe");
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

//Using external API
app.get("/fruit/:name", async (req, res) => {
    const fruit = req.params.name;

    const nutritionInfo = await fetch(
        `https://fruityvice.com/api/fruit/${fruit}`
    );

    if (!nutritionInfo.ok) {
            return res.status(404).json({
                error: "Fruit not found in Fruityvice API"
            });
        }

    const data = await nutritionInfo.json();

    if (!data || !data.nutritions) {
            return res.status(500).json({
                error: "Invalid API response structure"
            });
        }

    const specificInfo = {
        name: data.name,
        carbs: data.nutritions.carbohydrates,
        protein: data.nutritions.protein,
        fat: data.nutritions.fat,
        calories: data.nutritions.calories,
        sugar: data.nutritions.sugar
    };

    res.json(specificInfo);

});

module.exports = app;