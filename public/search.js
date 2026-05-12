async function loadFruitInfo() {
    fetch('/recipes')
        .then((result) => result.json())
        .then((resultJson) => {
            console.log(resultJson);

            const table = document.createElement('table');
            table.setAttribute("id", "fruitInfo");

            const tableRow = document.createElement('tr');

            const tableHeadingname = document.createElement('th');
            tableHeadingname.innerHTML = "Name";

            const tableHeadingingredients = document.createElement('th');
            tableHeadingingredients.innerHTML = "Ingredients";

            tableRow.appendChild(tableHeadingname);
            tableRow.appendChild(tableHeadingingredients);

            table.appendChild(tableRow);

            resultJson.forEach((recipe) => {
                const recipeTableRow = document.createElement('tr');

                const recipeTableName = document.createElement('td');
                const recipeTableIngredients = document.createElement('td');

                recipeTableName.innerHTML = recipe.recipe_name;
                recipeTableIngredients.innerHTML = recipe.ingredients;

                recipeTableRow.appendChild(recipeTableName);
                recipeTableRow.appendChild(recipeTableIngredients);

                table.appendChild(recipeTableRow);
            });

            document.body.appendChild(table);
        });
}

loadFruitInfo();