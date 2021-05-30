let rmgBtnEle = document.querySelector('button');
let sectionsEle = document.querySelector('section');

let mealTitleEle = document.querySelector('.meal-name');
let mealLinkEle = document.querySelector('.meal-link');
let mealImgEle = document.querySelector('.meal-img');
let mealInstrucEle = document.querySelector('.meal-instructions');
let mealUlEle = document.querySelector('.meal-ingredients');

let drinkTitleEle = document.querySelector('.drink-name');
let drinkImgEle = document.querySelector('.drink-img');
let drinkInstrucEle = document.querySelector('.drink-instructions');
let drinkUlEle = document.querySelector('.drink-ingredients');

const getMealData = () => {
    let apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

    fetch(apiUrl)
        .then(response => response.json())
        .then(meal => displayMealRecipe(meal.meals[0]))
        .catch(error => console.log(error));
}

const getDrinkData = () => {
    let apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

    fetch(apiUrl)
        .then(response => response.json())
        .then(drink => displayDrinkRecipe(drink.drinks[0]))
        .catch(error => console.log(error));
}

const displayMealRecipe = (meal) => {
    let mealIngreds = [];

    for (let i = 0; i <= 20; i++) {
        let ingred = meal[`strIngredient${i}`];
        let meas = meal[`strMeasure${i}`];

        ingred && mealIngreds.push(`${ingred}: ${meas}`);
    }

    mealUlEle.innerHTML = '';
    mealIngreds.forEach(item => {
        let liEle = document.createElement('li');

        mealUlEle.appendChild(liEle);
        liEle.textContent = item;
    });

    mealImgEle.setAttribute('src', meal.strMealThumb);
    mealLinkEle.setAttribute('href', meal.strSource)
    mealTitleEle.textContent = meal.strMeal;
    mealInstrucEle.textContent = meal.strInstructions;
}

const displayDrinkRecipe = (drink) => {
    let drinkIngreds = [];

    for (let i = 0; i <= 15; i++) {
        let ingred = drink[`strIngredient${i}`];
        let meas = drink[`strMeasure${i}`];

        ingred && drinkIngreds.push(`${ingred}: ${meas}`);
    }

    drinkUlEle.innerHTML = '';
    drinkIngreds.forEach(item => {
        let liEle = document.createElement('li');

        drinkUlEle.appendChild(liEle);
        liEle.textContent = item;
    });

    drinkImgEle.setAttribute('src', drink.strDrinkThumb);
    drinkTitleEle.textContent = drink.strDrink;
    drinkInstrucEle.textContent = drink.strInstructions;
}

const init = () => {
    sectionsEle.classList.remove('hidden');
    getMealData();
    getDrinkData();
}

rmgBtnEle.addEventListener('click', init);