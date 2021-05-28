let rmgBtnEle = document.querySelector('button');

let mealTitleEle = document.querySelector('.meal-name');
let mealImgEle = document.querySelector('.meal-img');
let mealInstrucEle = document.querySelector('.meal-instructions');
let mealUlEle = document.querySelector('.meal-ingredients');
let mealLinkEle = document.querySelector('.meal-link');

 let drinkTitleEle = document.querySelector('.drink-name');
 let drinkImgEle = document.querySelector('.drink-img');
 let drinkInstrucEle = document.querySelector('.drink-instructions');
 let drinkUlEle = document.querySelector('.drink-ingredients');
 let drinkLinkEle = document.querySelector('.drink-link');

const getMealData = () => {
    let apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

    fetch(apiUrl)
        .then(response => response.json())
        .then(meal => {
            // console.log(meal.meals[0])
            displayMealRecipe(meal.meals[0]);
        })
        .catch(error => console.log(error));
}


const displayMealRecipe = (meal) => {
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

}

const getDrinkData = () => {
    let apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

    fetch(apiUrl)
        .then(response => response.json())
        .then(drink => {
           // console.log(drink.drinks[0]) 
           displayDrinkRecipe(drink.drinks[0]);
           
        })
}

const displayDrinkRecipe = (drink) => {
    let drinkImg= drink.strDrinkThumb;
    let ingreds=[];
    for (let i=0; i<20; i++){
        let ingred = drink[`strIngredient${i}`];
        let meas = drink[`strMeasure${i}`];
      //  console.log(drink[`strIngredient${i}`])
        if (ingred){
            ingreds.push(`${ingred}: ${meas}`.replace(/\s+/g, " "));
        }
    
    }
        console.log(ingreds)

    drinkUlEle.innerHTML = " ";
    ingreds.forEach(item => {
        let liEle = document.createElement("li");
        drinkUlEle.appendChild(liEle);
        liEle.textContent = item;
    })

    drinkTitleEle.textContent= drink.strDrink;
    drinkImgEle.setAttribute("src",drinkImg); 
    drinkInstrucEle.textContent=drink.strInstructions;



}
rmgBtnEle.addEventListener('click', getMealData);
rmgBtnEle.addEventListener('click', getDrinkData);