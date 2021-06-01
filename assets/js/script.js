const rmgBtnEle = document.querySelector('button');
const sectionsEle = document.querySelectorAll('section');

const mealTitleEle = document.querySelector('.meal-name');
const mealLinkEle = document.querySelector('.meal-link');
const mealImgEle = document.querySelector('.meal-img');
const mealInstrucEle = document.querySelector('.meal-instructions');
const mealUlEle = document.querySelector('.meal-ingredients');

const drinkTitleEle = document.querySelector('.drink-name');
const drinkImgEle = document.querySelector('.drink-img');
const drinkInstrucEle = document.querySelector('.drink-instructions');
const drinkUlEle = document.querySelector('.drink-ingredients');

const saveBtnEle = document.querySelector('.save-button');
const savUlEle = document.querySelector('.saved-list');
let mealList = JSON.parse(localStorage.getItem('mealList')) || [];

const getMealData = () => {
    const  apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(meal => displayMealRecipe(meal.meals[0]))
    .catch(error => console.log(error));
}

const getDrinkData = () => {
    const  apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(drink => displayDrinkRecipe(drink.drinks[0]))
    .catch(error => console.log(error));
}

const getMealSearchData = (meal) => {
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(meal => displayMealRecipe(meal.meals[0]))
    .catch(error => console.log(error));
}

const getDrinkSearchData = (drink) => {
    let apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`
    
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
        const liEle = document.createElement('li');
        
        mealUlEle.appendChild(liEle);
        liEle.textContent = item;
    });
    
    mealImgEle.setAttribute('src', meal.strMealThumb);
    mealImgEle.setAttribute('alt', meal.strMeal);
    mealLinkEle.setAttribute('href', meal.strSource);
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
        const liEle = document.createElement('li');
        
        drinkUlEle.appendChild(liEle);
        liEle.textContent = item;
    });
    
    drinkImgEle.setAttribute('src', drink.strDrinkThumb);
    drinkImgEle.setAttribute('alt', drink.strDrink);
    drinkTitleEle.textContent = drink.strDrink;
    drinkInstrucEle.textContent = drink.strInstructions;
}

const showMealList = () => {
    let str = '';
    
    savUlEle.innerHTML = '';
    if (mealList.length > 0) {
        mealList.forEach(({meal, drink}) => str += `<li>${meal} & ${drink}</li>`);
        savUlEle.innerHTML = str;
    }
}

const init = () => {
    sectionsEle.forEach(item => item.classList.remove('hidden'));
    getMealData();
    getDrinkData();
}

const saveHandler = (e) => {
    e.preventDefault;
    let pair = {
        meal: mealTitleEle.childNodes[0].nodeValue,
        drink: drinkTitleEle.childNodes[0].nodeValue
    }
    if (mealList.some(({meal, drink}) => meal === pair.meal && drink === pair.drink)) {
        return ;
    } else {
        mealList.push(pair);
        const newSavLiEle = document.createElement('li');
    
        savUlEle.appendChild(newSavLiEle);
        newSavLiEle.textContent = `${pair.meal} & ${pair.drink}`;
        console.log(savUlEle.children);
        Array.from(savUlEle.children).forEach(item => item.classList.add('saved-items'));
        localStorage.setItem('mealList', JSON.stringify(mealList));
    }
    
}

window.onload = () => showMealList();
rmgBtnEle.addEventListener('click', init);
saveBtnEle.addEventListener('click', saveHandler);
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('saved-items')) {
        let mealName = e.target.textContent;
        let meal = mealName.split('&')[0].trim();
        let drink = mealName.split('&')[1].trim();

        getMealSearchData(meal);
        getDrinkSearchData(drink);
    }
});