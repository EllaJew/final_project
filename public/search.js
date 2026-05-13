async function searchFruit() {
    const fruit = document.getElementById("fruitInput").value;

    const res = await fetch(`/fruit/${fruit}`);
    const data = await res.json();

    console.log("Data:", data);

    document.getElementById("nutritionOutput").innerHTML =
        `<h3>${data.name}</h3>
        <p>Carbs: ${data.carbs}</p>
        <p>Protein: ${data.protein}</p>
        <p>Fat: ${data.fat}</p>
        <p>Calories: ${data.calories}</p>
        <p>Sugar: ${data.sugar}</p>`;
    
    fillChart(data);

    const imageUrl = `https://www.themealdb.com/images/ingredients/${fruit}.png`;
    document.getElementById("fruitImage").src = imageUrl;
    
    document.getElementById("fruitImage").onerror = function () {
        this.src = "https://t4.ftcdn.net/jpg/03/78/07/27/360_F_378072760_d5RaCcQ10ZkKMCCSPqNrzKA13F8dhO6A.jpg";
    };

    await fetch("/user_history", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fruit: data.name
        })
    });
}

let barChart;

function fillChart(data) {
    document.getElementById("nutritionOutput").innerHTML =
        `<h3>${data.name}</h3>
        <p>Carbs: ${data.carbs}</p>
        <p>Protein: ${data.protein}</p>
        <p>Fat: ${data.fat}</p>
        <p>Calories: ${data.calories}</p>
        <p>Sugar: ${data.sugar}</p>`;
    
        const chart = document.getElementById("barChart").getContext("2d");
        
        if (barChart) {
            barChart.destroy();}

        barChart = new Chart(chart, {
            type: "bar",
            data: {labels: ["Carbs", "Protein", "Fat", "Calories", "Sugar"],
            datasets: [{
                label: `${data.name} Nutrition (based on 100 grams)`,
                data: [data.carbs, data.protein, data.fat, data.calories,
                       data.sugar]}],
                backgroundColor: "rgba(6, 108, 57, 0.6)"
        },
    });
}

async function getRecipes() {
    const fruit = document.getElementById("fruitInput").value;

    const res = await fetch(`/recipes/${fruit}`);
    const data = await res.json();

    console.log("Data:", data);

    showRecipes(data);
}

function showRecipes(data) {
    const meals = data.meals;

    let html = "";

    if (!meals) {
        html = "<p>No recipes found</p>";
    } else {
        meals.forEach(recipe => {
            html += `
                <div class="recipe-card">
                    <h3>${recipe.strMeal}</h3>
                    <img src="${recipe.strMealThumb}" width="150">
                    <p>${recipe.strInstructions.slice(0, 100)}...</p>
                </div>
            `;
        });
    }

    document.getElementById("recipeOutput").innerHTML = html;
}

async function loadSearches() {
    const res = await fetch("/user_history");
    const searches = await res.json();

    let html = "<h3>Recent Searches</h3>";

    searches.forEach(search => {
        html += `<p>${search.fruit_searched}</p>`;
    });

    document.getElementById("recentSearches").innerHTML = html;
}

window.onload = () => {
    document.getElementById("searchButton")
        .addEventListener("click", () => {
            await searchFruit();
            await loadSearches();
            getRecipes();
    });
};