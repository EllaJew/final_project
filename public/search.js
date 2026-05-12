async function searchFruit() {
    const fruit = document.getElementById("fruitInput").value();

    const res = await fetch(`fruit/${fruit}`);
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

searchFruit();