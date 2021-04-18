
    const mealsEl = document.getElementById('meals');
    const favoriteContainerEl = document.getElementById('fav-meals');
    
    const searchEl = document.getElementById('search');
    const searchTermEl = document.getElementById('search-term');

    const mealPopupEl = document.getElementById('meal-popup');
    const mealCloseBtn = document.getElementById('close-popup');
    const mealInfoEl = document.getElementById('meal-info');

    async function getRandomMeal(){
        const response = await 
        fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const responseData = await response.json();
        const randomMeal = responseData.meals[0];

        addMeal(randomMeal,true);
    }
    async function getMealById(id){
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
        const responseData = await response.json();
        const meal = responseData.meals[0];

        return meal;
    }
    async function getMealsBySearch(term){
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term);
        const responseData = await response.json();
        const mealsByTerm = responseData.meals;

        return mealsByTerm;
    }

    getRandomMeal();
    fetchFavouriteMeals();

    function addMeal(mealData, random =false){
        console.log(mealData);

        const meal = document.createElement('div');
        meal.classList.add('meal');
        meal.innerHTML =`
            <div class="meal-header">
                ${random ? 
                    `<span class="random">Random Recipe</span>` : 
                    ``}
                <img src="${mealData.strMealThumb}" 
                alt="${mealData.strMeal}">
            </div>
            <div class="meal-body">
                <h4>${mealData.strMeal}</h4>
                <button class="fav-btn">
                <i class="fas fa-heart"></i>
                </button>
            </div>
        `;
        const btn = meal.querySelector(".meal-body .fav-btn");
        btn.addEventListener("click", () => {
            if(btn.classList.contains('active'))
            {
                removeMealLS(mealData.idMeal);
                btn.classList.remove("active");
            }
            else{
                addMealLS(mealData.idMeal);
                btn.classList.add("active");
            }
            favoriteContainerEl.innerHTML='';
            fetchFavouriteMeals();
        });

        meal.addEventListener('click', () => {
            showMealInfo(mealData);
        })

        mealsEl.appendChild(meal);
    }

    function addMealLS(mealId) {
        const mealsIds = getMealsLS();
        localStorage.setItem('mealsIds', JSON.stringify([...mealsIds, mealId]));
    }

    function addMealsLS() {
        const mealIds = JSON.parse(localStorage.getItem('mealsIds'));        
        return mealIds === null? "" : mealIds;
    }

    function removeMealLS(mealId){
        const mealsIds = getMealsLS();
        localStorage.setItem('mealsIds', JSON.stringify(
            mealsIds.filter(id => id !== mealId)
            ));
    }
    function getMealsLS(){
        const mealsIds = JSON.parse(localStorage.getItem("mealsIds"));

        return mealsIds ===null? [] : mealsIds;
    }
    
    async function fetchFavouriteMeals() {

        //Clean the container
        favoriteContainerEl.innerHTML ="";

        const mealsIds = getMealsLS();
        const meals = []
        for(let i=0; i < mealsIds.length; i++)
        {
            const mealId = mealsIds[i];
            meal = await getMealById(mealId);
            addMealFav(meal);
            
        }
    }

    function addMealFav(mealData){
        const favMeal = document.createElement('li');
        
        favMeal.innerHTML =`
        
            <img 
                src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            <span>${mealData.strMeal}</span>
            <button class="clear"><i class="fas fa-window-close"></i></button>
        
        `;
        
        const btn = favMeal.querySelector(".clear");
        btn.addEventListener("click", () => {
            removeMealLS(mealData.idMeal);
            fetchFavouriteMeals();
        })

        favMeal.addEventListener('click', () => {
            showMealInfo(mealData);
        })

        favoriteContainerEl.appendChild(favMeal);
    }

    function showMealInfo()
    {
        const mealInfoEl = document.createElement('div');
        mealInfoEl.appendChild(mealInfoEl);

    }
    searchEl.addEventListener('click', async () => {
        mealsEl.innerHTML ="";

        let search = searchTermEl.value;
        
        let meals = await getMealsBySearch(search);

        if(meals){
            meals.forEach((meal) => {
                addMeal(meal);
            })
        }
    })

    function showMealInfo(mealData){
        let ingredients = [];
        //Transform MealData ingridients in an array
        for (let i = 1; i < 20; i++) {
            if(mealData["strIngredient"+i])
            {
                ingredients.push(`${mealData["strIngredient"+i]} - ${mealData["strMeasure"+i]}`);
            }else{
                break;
            }
        }


        //Clean Element
        mealInfoEl.innerHTML = "";
        //Update the meal info
        const mealEl = document.createElement('div');
        mealEl.innerHTML = `
            <h1>${mealData.strMeal}</h1>
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"> 
            <div>
                <p>${mealData.strInstructions}</p>
                <h3>Ingredients - Measures</h3>
                <ul>
                    ${ingredients.map((ing) =>`<li>${ing}</li>`).join("")}
                </ul>
            </div>
        `;
        mealInfoEl.appendChild(mealEl);

        //Show the Popup
        mealPopupEl.classList.remove('hidden');
    }
    
    mealCloseBtn.addEventListener('click', () => {
        mealPopupEl.classList.add('hidden');
    })
    favoriteContainerEl.add