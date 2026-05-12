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

//GET from Supabase
app.get('/recipes', async (req, res) => {
    console.log("Getting all recipes");

    const { data, error } = await supabase.from("recipes").select();

    console.log("received data", data);
    res.json(data);
});

//POST to Supabase
app.post('/recipes', async (req, res) => {
    console.log("adding recipe");
    console.log(`request: ${JSON.stringify(req.body)}`);
    
    const recipe_name = req.body.recipe_name;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;

    const { data, error } = await supabase.from("recipes").insert({
        recipe_name: recipe_name,
        ingredients: ingredients,
        instructions: instructions
    }).select();

    res.json(data);
});

//Using external API
app.get("/fruit/:name", async (req, res) => {
    const fruit = req.params.name;

    const nutritionInfo = await fetch(
        `https://fruityvice.com/api/fruit/${fruit}`
    );

    const data = await nutritionInfo.json();

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