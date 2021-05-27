let rmgBtnEle = document.querySelector('button');

let mealTitleEle = document.querySelector('.meal-name');
let mealLinkEle = document.querySelector('.meal-link');
let mealImgEle = document.querySelector('.meal-img');
let mealInstrucEle = document.querySelector('.meal-instructions');
let mealUlEle = document.querySelector('.meal-ingredients');

// let drinkTitleEle = document.querySelector('');
// let drinkImgEle = document.querySelector('');
// let drinkInstrucEle = document.querySelector('');
// let drinklUlEle = document.querySelector('');
// let drinkIngredEle = document.querySelector('');

let getMealData = () => {
    let apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(meal => {
        // console.log(meal.meals[0])
        displayMealRecipe(meal.meals[0]);
    })
    .catch(error => console.log(error)); 
}

// let getDrinkData = () => {
//     let apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    
//     fetch(apiUrl)
//     .then(response => response.json())
//     .then(drink => {
//         // console.log(drink.meals[0])
//         displayRecipe(drink.drinks[0]);
//     })
//     .catch(error => console.log(error)); 
// }

let displayMealRecipe = (meal) => {
    let mealImg = meal.strMealThumb;
    let numIngreds = (Object.entries(meal).filter(item => item[0].match(/Ingredient/))).filter(item => item[1]).length;
    let ingreds = [];

    for (let i = 0; i <= numIngreds; i++) {
        let ingred = meal[`strIngredient${i}`];
        let meas = meal[`strMeasure${i}`];

        if (ingred) {
            ingreds.push(`${ingred}: ${meas}`.replace(/\s+/g, " "));
        }
    }
    mealUlEle.innerHTML = '';
    ingreds.map(item => {
        let liEle = document.createElement('li');
        mealUlEle.appendChild(liEle);
        liEle.textContent = item;
    });
    mealTitleEle.textContent = meal.strMeal;
    mealImgEle.setAttribute('src', mealImg);
    mealInstrucEle.textContent = meal.strInstructions;

}

rmgBtnEle.addEventListener('click', getMealData);
// rmgBtnEle.addEventListener('click', getMealData);