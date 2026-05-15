# final_project
Final Project for INST377

# Title
Fruit for Thought

# Description
People want accurate nutritional data regarding snack alternatives (such as fruit) but information is inconsistent or scattered across the Internet. Fruit for Thought focuses on helping individuals find accurate nutritional information by consolidating it all into one place. On Fruit for Thought, you will find nutritional information for nearly all kinds of fruit, along with some recipes to help with your dietary journey. On the application, there are 3 pages: home, about, and search. The home page shows past user inputs and logs it at the bottom of the page. The about page describes our mission and answers FAQ. The search page allows the user to look up fruit and view nutritional info, recipes, and images relating to that specific fruit.

# Target Browsers
`npx browserlist` was run in the terminal to determine which browsers Fruit for Thought currently supports. This includes:
1) and_chr 147, and_ff 150, and_qq 14.9, and_uc 15.5
2) android 147
3) chrome 148, chrome 147, chrome 146, chrome 145, chrome 142, chrome 112, chrome 109
4) edge 147, edge 146
5) firefox 150, firefox 149, firefox 140
6) ios_saf 26.4, ios_saf 26.3, ios_saf 26.2, ios_saf 18.5-18.7
7) kaios 3.0-3.1, kaios 2.5
8) op_mini all, op_mob 80
9) opera 131, opera 127
10) safari 26.4, safari 26.3
11) samsung 29, samsung 28

[Developer Manual Link](#developer-manual)

# Developer Manual

# Installation and Dependencies
1) Clone this repository using `git clone`: https://github.com/EllaJew/final_project.git
2) Install the following dependencies using `npm install`: Node.js, Supabase, Express, dotenv (optional if using Node.js v20.6.0+.), body-parser, nodemon
3) Run the app using `npm start`

# How to Run the Application on a Server
1) Initialize the project: use the command `npm init -y`. This will create a `package.json` file.
2) Install Express (completed in prior step): make sure that you have already run `npm install express`.
3) Create the server file: create an `index.js` file and use `express.static` to serve your folder that contains your static `.html`, `.css`, and `.js` files.

# Software Tests
N/A

# API for Server Application
1) GET `/`: retrieves the root of Fruit for Thought, which is `home_page.html`
2) GET `/search`: retrieves the `search_page.html` file and sends it to the browser whenever it is requested
3) GET `/about`: retrieves the `about_page.html` file and sends it to the browser whenever it is requested
4) GET `/fruit/:name`: retrieves info about a specific fruit from Fruityvice API by using name
5) GET `/recipes/:fruit`: retrieves recipe details from TheMealDB API for a specific fruit that the user inputs
6) POST `/user_history`: submits a new entry into the `user_history` table on Supabase, detailing the fruit the user searched and what day/time the search occurred
7) GET `/user_history`: retrieves all the entries from the `user_history` table on Supabase

# Known Errors and Expectations
1) MIME type mismatch error on Vercel: the server responds with text/html instead of application/javascript or text/css. It is commonly caused by incorrect paths or routing issues. To fix this error, you can define your routes in a `vercel.json` file to make sure that your static files are being served correctly.
2) Starting May 30, new Supabase projects will not expose tables in the "public" schema to the Data API by default. Any table you create in "public" after that date requires an explicit GRANT before supabase-js can access it.

# Roadmap for Future Development
1) Next Up (summer 2026):
   1) Upgrade the UI for a more modern-appearance
   2) Implement another food API for additional nutritional information
3) Later (2027 and beyond):
   1) Utilize React to break down the application into more manageable pieces
   2) Create a new feature: calorie counter and journal
