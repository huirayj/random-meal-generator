
let getMealData = () => {
    let api = 'https://www.themealdb.com/api/json/v1/1/random.php';
    
    fetch(api)
    .then(response => response.json())
    .then(meal => {
        // console.log(meal.meals[0])
        displayRecipe(meal.meals[0]);
    })
    .catch(error => console.log(error)); 
}

let displayRecipe = (meal) => {
    let mealImage = meal.strMealThumb;
    let ingredients = [];

    console.log(Object.entries(meal).filter(item => item.includes('strMeal')));


}

window.onload = getMealData();