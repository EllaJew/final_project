async function searchFruit(fruit) {
    const res = await fetch(`/fruit/${fruit}`);
    const data = await res.json();

    console.log("Data:", data);

    document.getElementById("nutritionOutput").innerHTML =
        `<h3>${data.name}</h3>
        <p>Carbs: ${data.carbs} grams</p>
        <p>Protein: ${data.protein} grams</p>
        <p>Fat: ${data.fat} grams</p>
        <p>Calories: ${data.calories} calories</p>
        <p>Sugar: ${data.sugar} grams</p>`;
    
    fillChart(data);

    const imageUrl = `https://www.themealdb.com/images/ingredients/${fruit}.png`;
    document.getElementById("fruitImage").src = imageUrl;
    
    document.getElementById("fruitImage").onerror = function () {
        this.src = "https://t4.ftcdn.net/jpg/03/78/07/27/360_F_378072760_d5RaCcQ10ZkKMCCSPqNrzKA13F8dhO6A.jpg";
    };
}

let barChart;

function fillChart(data) {
    const chart = document.getElementById("barChart").getContext("2d");
    
    if (barChart) {
        barChart.destroy();}

    barChart = new Chart(chart, {
        type: "bar",
        data: {labels: ["Carbs", "Protein", "Fat", "Calories", "Sugar"],
        datasets: [{
            label: `${data.name} Nutrition (based on 100 grams)`,
            options: {backgroundColor: "white"},
            data: [data.carbs, data.protein, data.fat, data.calories,
                    data.sugar],
            backgroundColor: "rgba(249, 47, 91, 0.78)"
            }],
        },
    });
}

async function getRecipes(fruit) {
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

async function saveSearch() {
    const fruit = document.getElementById("fruitInput").value;
    
    await fetch("/user_history", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ fruit })
    });
}

async function updateHome() {
    const res = await fetch("/user_history");
    const searches = await res.json();

    console.log("RAW RESPONSE:", searches);

    const body = document.getElementById("tableOutput");

    body.innerHTML = "";

    searches.forEach(search => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = search.id;

        const fruitCell = document.createElement("td");
        fruitCell.textContent = search.fruit_searched;

        const timeCell = document.createElement("td");
        timeCell.textContent = new Date(search.time_stamp).toLocaleString("en-US", {timeZone: "America/New_York"});

        row.appendChild(idCell);
        row.appendChild(fruitCell);
        row.appendChild(timeCell);

        body.appendChild(row);

    });
}

const fruit_list = ["apple", "lime", "lemon", "cherry", "banana", "orange", "pineapple", "avocado"];

function getFruitImage(fruit) {
    return `https://www.themealdb.com/images/ingredients/${fruit}.png`;
}

async function createSlider() {
    const slides = await Promise.all(
        fruit_list.map(async fruit => {
            const image = await getFruitImage(fruit);
            return {image: image};
        })
    );
    
    return slides;
}

async function loadSlider() {
    const slides = await createSlider();
    const wrapper = document.querySelector(".swiper-wrapper");
    wrapper.innerHTML = "";

    slides.forEach(fruit => {
        const slide = document.createElement("div");
        
        slide.className = "swiper-slide";
        slide.innerHTML = `<img src="${fruit.image}" width="150" />`;

        wrapper.appendChild(slide);
    });
}

window.onload = async () => {
    const button = document.getElementById("searchButton");

    if (button) {
        button.addEventListener("click", async () => {
            const fruit = document.getElementById("fruitInput").value;

            await searchFruit(fruit);
            await getRecipes(fruit);
            await saveSearch();
            
            if (document.getElementById("tableOutput")) {
                await updateHome();
            }
        });
    }

    await loadSlider();
    new Swiper(".randomFruitSwiper", {
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
        });
    
    if (document.getElementById("tableOutput")) {
        updateHome();
    }
};