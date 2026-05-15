# final_project
Final Project for INST377

# Title
Fruit for Thought

# Description
People want accurate nutrition data regarding healthier snack alternatives (like fruit) but information is inconsistent or scattered across the Internet.  Fruit for Thought focuses on helping individuals find accurate nutrition data regarding healthier snack alternatives, such as fruit. However, we recognize that this kind of information is inconsistent or scattered across the Internet, so we decided to consolidate all of it into this project to make things easier for you. On Fruit for Thought, you will find nutritional information for nearly all kinds of fruit, along with some recipes to help with your dietary journey.

# Target Browsers
`npx browserlist` was run in the terminal to determine which browsers Fruit for Thought currently supports. This includes:

and_chr 147, and_ff 150, and_qq 14.9, and_uc 15.5, android 147, chrome 148, chrome 147, chrome 146, chrome 145, chrome 142, chrome 112, chrome 109, edge 147, edge 146 firefox 150, firefox 149, firefox 140, ios_saf 26.4, ios_saf 26.3, ios_saf 26.2, ios_saf 18.5-18.7, kaios 3.0-3.1, kaios 2.5, op_mini all, op_mob 80, opera 131, opera 127, safari 26.4, safari 26.3, samsung 29, samsung 28

[Developer Manual Link](#developer-manual)

# Developer Manual

# Installation and Dependencies
1) Clone this repository using `git clone`: https://github.com/EllaJew/final_project.git
2) Install the following dependencies using `npm install`: Node.js, Supabase, Express, dotenv, body-parser, nodemon
3) Run the app using `npm start`

# How to Run the Application on a Server
1) Initialize the project: use the command `npm init -y`. This will create a `package.json` file.
2) Install Express (completed in prior step): make sure that you have already run `npm install express`.
3) Create the server file: create an `index.js` file and use `express.static` to serve your folder that contains your static `.html`, `.css`, and `.js` files.

# APIs for Application
`app.get("/", (req, res) =>`: retrieves the root of Fruit for Thought, which is `home_page.html` 
`app.get("/search", (req, res) =>`: retrieves the `search_page.html` file and sends it to the browser whenever it is requested
`app.get("/about", (req, res) =>`: retrieves the `about_page.html` file and sends it to the browser whenever it is requested
`app.get("/fruit/:name", async (req, res) =>`: retrieves fruit nutritional info from Fruityvice API 
`app.get("/recipes/:fruit", async (req, res) =>`: retrieves recipe details from TheMealDB API for a specific fruit that the user inputs
`app.post("/user_history", async (req, res) =>`: submits a new entry into the `user_history` table on Supabase, detailing the fruit the user searched and what day/time the search occurred
`app.get("/user_history", async (req, res) =>`: retrieves all the entries from the `user_history` table on Supabase

# Expectations and Future Development


