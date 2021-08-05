const rmgBtnEle = document.querySelector('.rmg-button');
const mainEle = document.querySelector('main');
const headerEle = document.querySelector('header');
const h2Ele = document.querySelector('h2');

const mealTitleEle = document.querySelector('.meal-name');
const mealLinkEle = document.querySelector('.meal-link');
const mealImgEle = document.querySelector('.meal-img');
const mealInstrucEle = document.querySelector('.meal-instructions');
const mealUlEle = document.querySelector('.meal-ingredients');

const drinkTitleEle = document.querySelector('.drink-name');
const drinkImgEle = document.querySelector('.drink-img');
const drinkInstrucEle = document.querySelector('.drink-instructions');
const drinkUlEle = document.querySelector('.drink-ingredients');

const savUlEle = document.querySelector('.saved-list');
const saveBtnEle = document.querySelector('.save-button');
const clearBtnEle = document.querySelector('.clear-button');

const mealContentTabs = document.querySelectorAll('.meal-content-tab');
const mealTabLinks = document.querySelectorAll('.meal-tab');

const drinkContentTabs = document.querySelectorAll('.drink-content-tab');
const drinkTabLinks = document.querySelectorAll('.drink-tab');

let mealList = JSON.parse(localStorage.getItem('mealList')) || [];

const init = () => {
    const contentTabs = [...mealContentTabs, ...drinkContentTabs];
    const tabLinks = [...mealTabLinks, ...drinkTabLinks];

    headerEle.classList.remove('start-position');
    mainEle.classList.remove('hidden');
    saveBtnEle.classList.remove('hidden');
    h2Ele.classList.add('hidden');

    for (const contentTab of contentTabs) {
        contentTab.classList.add("hidden");
    }

    for (const tabLink of tabLinks) {
        tabLink.classList.remove("is-active");
    }

    mealContentTabs[0].classList.remove("hidden");
    mealTabLinks[0].classList.add("is-active");

    drinkContentTabs[0].classList.remove("hidden");
    drinkTabLinks[0].classList.add("is-active");

    getMealData();
    getDrinkData();
}

const getMealData = () => {
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

    fetch(apiUrl)
        .then(response => response.json())
        .then(meal => displayMealRecipe(meal.meals[0]))
        .catch(error => console.log(error));
}

const getDrinkData = () => {
    const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

    fetch(apiUrl)
        .then(response => response.json())
        .then(drink => displayDrinkRecipe(drink.drinks[0]))
        .catch(error => console.log(error));
}

const getMealSearchData = (meal) => {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(meal => displayMealRecipe(meal.meals[0]))
        .catch(error => console.log(error));
}

const getDrinkSearchData = (drink) => {
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(drink => displayDrinkRecipe(drink.drinks[0]))
        .catch(error => console.log(error));
}

const displayMealRecipe = (meal) => {
    let mealIngreds = [];

    for (let i = 0; i <= 20; i++) {
        const ingred = capitalize(meal[`strIngredient${i}`]);
        const meas = meal[`strMeasure${i}`] || '';

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
        const ingred = capitalize(drink[`strIngredient${i}`]);
        const meas = drink[`strMeasure${i}`] || 'As much as you like';

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
    if (mealList.length) {
        mealList.forEach(({ meal, drink }) =>
            str += `<li class='saved-items'>${meal} + ${drink}</li>`);
        savUlEle.innerHTML = str;
    }
}

// adds favorited items to an array and localstorage
const saveHandler = () => {
    let pair = {
        meal: mealTitleEle.childNodes[0].nodeValue,
        drink: drinkTitleEle.childNodes[0].nodeValue
    }

    if (mealList.some(({ meal, drink }) => meal === pair.meal && drink === pair.drink)) {
        return;
    } else {
        mealList.push(pair);
        const newSavLiEle = document.createElement('li');

        savUlEle.appendChild(newSavLiEle);
        newSavLiEle.textContent = `${pair.meal} + ${pair.drink}`;

        Array.from(savUlEle.children).forEach(item => item.classList.add('saved-items'));
        localStorage.setItem('mealList', JSON.stringify(mealList));
        clearBtnEle.classList.remove('hidden');
    }
}

const clearSavedItem = () => {
    savUlEle.innerHTML = '';
    clearBtnEle.classList.add('hidden');
    localStorage.clear();
    mealList = [];
};

const capitalize = str => str && str[0].toUpperCase() + str.slice(1);

const openTab = (e, tabName) => {
    const isMealContainer = e.currentTarget.className.includes("meal");
    const contentTabs = (isMealContainer) ? mealContentTabs : drinkContentTabs;
    const tabLinks = (isMealContainer) ? mealTabLinks : drinkTabLinks;

    for (const contentTab of contentTabs) {
        contentTab.classList.add("hidden");
    }

    for (const tabLink of tabLinks) {
        tabLink.classList.remove("is-active");
    }

    document.getElementById(tabName).classList.remove("hidden");
    e.currentTarget.classList.add("is-active");
}

window.onload = () => {
    h2Ele.classList.remove('hidden');
    mealList.length && clearBtnEle.classList.remove('hidden');
    showMealList();
};
rmgBtnEle.addEventListener('click', init);
saveBtnEle.addEventListener('click', saveHandler);
clearBtnEle.addEventListener('click', clearSavedItem);
// searches favorited items when clicked
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('saved-items')) {
        let mealName = e.target.textContent;
        const meal = mealName.split('+')[0].trim();
        const drink = mealName.split('+')[1].trim();

        getMealSearchData(meal);
        getDrinkSearchData(drink);
        headerEle.classList.remove('start-position');
        mainEle.classList.remove('hidden');
    }
});