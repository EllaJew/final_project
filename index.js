const express = require("express");
const bodyParser = require("body-parser");
const supabaseClient = require("@supabase/supabase-js");
const dotenv = require("dotenv");

const app = express();
const port = 3000;
dotenv.config()

app.use(bodyParser.json());

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey);

app.get('/recipes', async (req, res) => {
    console.log("Getting all recipes");

    const { data, error } = await supabase.from("recipes").select();
    
    console.log("received data", data);
    res.json(data);
});

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

app.listen(port, () => {
    console.log(`App is available on port ${port}`);
});