let barChart;

async function searchFruit() {
    const fruit = document.getElementById("fruitInput").value;

    const res = await fetch(`/fruit/${fruit}`);
    const data = await res.json();

    console.log("Data:", data);

    document.getElementById("temporaryOutput").innerHTML =
        `<h3>${data.name}</h3>
        <p>Carbs: ${data.carbs}</p>
        <p>Protein: ${data.protein}</p>
        <p>Fat: ${data.fat}</p>
        <p>Calories: ${data.calories}</p>
        <p>Sugar: ${data.sugar}</p>`;
}

function nutritionChart(data) {
    document.getElementById("temporaryOutput").innerHTML =
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
                label: `${data.name} Nutrition`,
                data: [data.carbs, data.protein, data.fat, data.calories,
                       data.sugar]}]
        },
    });
}

window.onload = () => {
    document.getElementById("searchButton")
        .addEventListener("click", searchFruit);
};