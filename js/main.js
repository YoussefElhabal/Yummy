let mealData = document.getElementById("mealData");
let searchInput = document.querySelector(".nav-tab li.searchInput");
let category = document.querySelector(".category");
let area = document.querySelector(".area");
let ingredient = document.querySelector(".ingredient");
let contact = document.querySelector(".contact");
let searchRow = document.querySelector("#searchRow");
let submitBtn;

// Side Navbar
jQuery(() => {
    $(".loadingScreen").fadeOut(500);
    $("body").css({overflow: "visible"});
});
function openNav() {
    $(".side-nav-menu").animate({left: 0}, 500);
    $(".open-close").removeClass("fa-align-justify");
    $(".open-close").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({top: 0}, (i + 5) * 100);
    }
}
function closeNav() {
    let navWidth = $(".side-nav-menu .nav-tab").outerWidth();
    $(".side-nav-menu").animate({left: -navWidth}, 500);
    $(".open-close").addClass("fa-align-justify");
    $(".open-close").removeClass("fa-x");
    $(".links li").animate({top: 300}, 500);
}
closeNav();
$(".side-nav-menu i.open-close").on("click", function () {
    $(".side-nav-menu ").toggle();
    if ($(".side-nav-menu").css("left") == "0px") {
        closeNav();
    } else {
        openNav();
    }
});

// Display Data
function displayMeals(data) {
    let container = "";
    for (let i = 0; i < data.length; i++) {
        container += 
        `<div class="col-md-6 col-lg-3">
            <div onclick="getMealDetails('${data[i].idMeal}')" class="inner rounded-2 position-relative overflow-hidden">
                <img src="${data[i].strMealThumb}" alt="Meal" class="w-100" >
                <div class="overlay position-absolute d-flex align-items-center p-2">
                    <h3>${data[i].strMeal}</h3>
                </div>
            </div>
        </div>`;
    }
    mealData.innerHTML = container;
}

searchByName("");

// Get Categories
category.addEventListener("click", function () {
    getCategory();
});
async function getCategory() {
    closeNav();
    mealData.innerHTML = "";
    $(".loadingNewScreen").fadeIn(300);
    searchRow.innerHTML = "";
    const request = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const response = await request.json();
    displayCategory(response.categories);
    $(".loadingNewScreen").fadeOut(300);
}

// Display Categories
function displayCategory(data) {
    let container = "";
    for (let i = 0; i < data.length; i++) {
        container += 
        `<div class="col-md-6 col-lg-3">
            <div onclick="getCategoryMeals('${data[i].strCategory}')" class="inner rounded-2 position-relative overflow-hidden">
                <img src=" ${data[i].strCategoryThumb}" alt="Meal" class="w-100">
                <div class="overlay position-absolute text-center">
                    <h3 class="pt-4">${data[i].strCategory}</h3>
                    <p class="font-18">${data[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>
        </div>`;
    }
    mealData.innerHTML = container;
}

// Get Area
area.addEventListener("click", function () {
    getArea();
});
async function getArea() {
    closeNav();
    mealData.innerHTML = "";
    $(".loadingNewScreen").fadeIn(300);
    searchRow.innerHTML = "";
    const request = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    const response = await request.json();
    displayArea(response.meals);
    $(".loadingNewScreen").fadeOut(300);
}

// Display Area 
function displayArea(data) {
    let container = "";
    for (let i = 0; i < data.length; i++) {
        container += `
            <div class="col-md-6 col-lg-3">
                <div onClick="getAreaMeals('${data[i].strArea}')" class="rounded-2 text-center text-white">
                    <i class="fa-solid fa-house-laptop fa-5x text-white"></i>
                    <h3 class="fs-2">${data[i].strArea}</h3>
                </div>
            </div>`;
    }
    mealData.innerHTML = container;
}

// Get Ingredient
ingredient.addEventListener("click", function () {
    getIngredient();
    closeNav();
});
async function getIngredient() {
    mealData.innerHTML = "";
    $(".loadingNewScreen").fadeIn(300);
    searchRow.innerHTML = "";
    const request = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    const response = await request.json();
    displayIngredient(response.meals.slice(0, 20));
    $(".loadingNewScreen").fadeOut(300);
}

// Display Ingredient
function displayIngredient(data) {
    let container = "";
    for (let i = 0; i < data.length; i++) {
        container += 
        `<div class="col-md-6 col-lg-3">
            <div onClick="getIngredientsMeals('${data[i].strIngredient}')" class="rounded-2 text-center text-white">
                <i class="fa-solid fa-drumstick-bite fa-5x text-white"></i>
                <h3 class="fs-2">${data[i].strIngredient}</h3>
                <p class="font-18">${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
        </div>`;
    }
    mealData.innerHTML = container;
}

// Get Category Meals
async function getCategoryMeals(Category) {
    mealData.innerHTML = "";
    $(".loadingNewScreen").fadeIn(300);
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`);
    const response = await request.json();
    displayMeals(response.meals.slice(0, 20));
    $(".loadingNewScreen").fadeOut(300);
}

// Get Area Meals
async function getAreaMeals(Area) {
    mealData.innerHTML = "";
    $(".loadingNewScreen").fadeIn(300);
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`);
    const response = await request.json();
    displayMeals(response.meals.slice(0, 20));
    $(".loadingNewScreen").fadeOut(300);
}

// Get Ingredient Meals
async function getIngredientsMeals(Ingredients) {
    mealData.innerHTML = "";
    $(".loadingNewScreen").fadeIn(500);
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`);
    const response = await request.json();
    displayMeals(response.meals.slice(0, 20));
    $(".loadingNewScreen").fadeOut(300);
}

// Get Meal Details
async function getMealDetails(id) {
    closeNav();
    mealData.innerHTML = "";
    $(".loadingNewScreen").fadeIn(300);
    searchRow.innerHTML = "";
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const response = await request.json();
    displayMealDetails(response.meals[0]);
    $(".loadingNewScreen").fadeOut(300);
}

// Display Meal Details
function displayMealDetails(meal) {
    searchRow.innerHTML = "";
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
        ingredients += 
        `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }
    let tags = meal.strTags?.split(",");
    if (!tags) tags = [];
    let tagsStr = "";
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }
    let container = 
    `<div class="col-md-4 text-white">
        <img src="${meal.strMealThumb}" alt="Meal" class="w-100 rounded-3">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8 text-white">
        <h2>Instructions</h2>
        <p class="font-18">${meal.strInstructions}</p>
        <h3><span class="fw-bold">Area : </span>${meal.strArea}</h3>
        <h3><span class="fw-bold">Category : </span>${meal.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="font-18 list-unstyled d-flex g-3 flex-wrap">${ingredients}</ul>
        <h3>Tags :</h3>
        <ul class="font-18 list-unstyled d-flex g-3 flex-wrap">${tagsStr}</ul>
        <a href="${meal.strSource}" target="_blank" class="font-18 btn btn-success">Source</a>
        <a href="${meal.strYoutube}" target="_blank" class="font-18 btn btn-danger">Youtube</a>
    </div>`;
    mealData.innerHTML = container;
}

// Display Search Inputs 
searchInput.addEventListener("click", function () {
    searchRow.innerHTML = 
    `<div class="col-md-6">
        <input class="bg-transparent form-control text-white p-2" type="text" placeholder="Search By Name" onkeyup="searchByName(this.value)"></input>
    </div>
    <div class="col-md-6">                                                                                                 
        <input class="bg-transparent form-control text-white p-2" type="text" placeholder="Search By First Letter" onkeyup="searchByFirstLetter(this.value)" maxlength="1"></input>
    </div>`;
    mealData.innerHTML = "";
    closeNav();
});

// Search By Name
async function searchByName(word) {
    closeNav();
    mealData.innerHTML = "";
    $(".loadingNewScreen").fadeIn(300);
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`);
    const response = await request.json();
    if (response.meals == null) {
        displayMeals = [];
    } else {
        displayMeals(response.meals);
        $(".loadingNewScreen").fadeOut(300);
    }
}

// Search By First Letter
async function searchByFirstLetter(letter) {
    closeNav();
    mealData.innerHTML = "";
    $(".loadingNewScreen").fadeIn(500);
    if (letter == "") {
        letter = "f";
    }
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const response = await request.json();
    displayMeals(response.meals);
    $(".loadingNewScreen").fadeOut(300);
}

// Display Contact Us
contact.addEventListener("click", () => {
    closeNav();
    mealData.innerHTML = 
    `<section>
        <div class="contactUS text-center vh-100 d-flex justify-content-center align-items-center">
            <div class="container w-75 mx-auto" text-center">
                <div class="row g-4">
                    <div class="col-md-6">
                        <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control p-2" placeholder="Enter Your Name">
                        <div id="nameAlert" class="alert alert-danger font-18 w-100 mt-2 d-none">
                            Special characters and numbers not allowed
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control p-2" placeholder="Enter Your Email">
                        <div id="emailAlert" class="alert alert-danger font-18 w-100 mt-2 d-none">
                            Email not valid *exemple@yyy.zzz
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control p-2" placeholder="Enter Your Phone">
                        <div id="phoneAlert" class="alert alert-danger font-18 w-100 mt-2 d-none">
                            Enter valid Phone Number
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control p-2" placeholder="Enter Your Age">
                        <div id="ageAlert" class="alert alert-danger font-18 w-100 mt-2 d-none">
                            Enter valid age
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control p-2" placeholder="Enter Your Password">
                        <div id="passwordAlert" class="alert alert-danger font-18 w-100 mt-2 d-none">
                            Enter valid password *Minimum eight characters, at least one letter and one number:*
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input  id="rePasswordInput" onkeyup="inputsValidation()" type="password" class="form-control p-2" placeholder="RePassword">
                        <div id="rePasswordAlert" class="alert alert-danger font-18 w-100 mt-2 d-none">
                            Enter valid rePassword 
                        </div>
                    </div>
                </div>
                <button id="submitBtn" disabled class="btn btn-outline-danger font-18 p-2 mt-3">Submit</button>
            </div>
        </div> 
    </section>`;

    submitBtn = document.getElementById("submitBtn");

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true;
    });

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true;
    });

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true;
    });

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true;
    });

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true;
    });

    document.getElementById("rePasswordInput").addEventListener("focus", () => {
        rePasswordInputTouched = true;
    });
});

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let rePasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none");
            document.getElementById("nameInput").classList.add("is-valid");
            document.getElementById("nameInput").classList.remove("is-invalid");
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block");
            document.getElementById("nameInput").classList.add("is-invalid");
            document.getElementById("nameInput").classList.remove("is-valid");
        }
    }
    if (emailInputTouched) {
        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none");
            document.getElementById("emailInput").classList.add("is-valid");
            document.getElementById("emailInput").classList.remove("is-invalid");
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block");
            document.getElementById("emailInput").classList.add("is-invalid");
            document.getElementById("emailInput").classList.remove("is-valid");
        }
    }
    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none");
            document.getElementById("phoneInput").classList.add("is-valid");
            document.getElementById("phoneInput").classList.remove("is-invalid");
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block");
            document.getElementById("phoneInput").classList.add("is-invalid");
            document.getElementById("phoneInput").classList.remove("is-valid");
        }
    }
    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none");
            document.getElementById("ageInput").classList.add("is-valid");
            document.getElementById("ageInput").classList.remove("is-invalid");
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block");
            document.getElementById("ageInput").classList.add("is-invalid");
            document.getElementById("ageInput").classList.remove("is-valid");
        }
    }
    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none");
            document.getElementById("passwordInput").classList.add("is-valid");
            document.getElementById("passwordInput").classList.remove("is-invalid");
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block");
            document.getElementById("passwordInput").classList.add("is-invalid");
            document.getElementById("passwordInput").classList.remove("is-valid");
        }
    }
    if (rePasswordInputTouched) {
        if (rePasswordValidation()) {
            document.getElementById("rePasswordAlert").classList.replace("d-block", "d-none");
            document.getElementById("rePasswordInput").classList.add("is-valid");
            document.getElementById("rePasswordInput").classList.remove("is-invalid");
        } else {
            document.getElementById("rePasswordAlert").classList.replace("d-none", "d-block");
            document.getElementById("rePasswordInput").classList.add("is-invalid");
            document.getElementById("rePasswordInput").classList.remove("is-valid");
        }
    }
    if (
        nameValidation() && emailValidation() &&
        phoneValidation() && ageValidation() &&
        passwordValidation() && rePasswordValidation()
    ) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}

// Name Validation
function nameValidation() {
    return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

// Email Validation
function emailValidation() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    .test(document.getElementById("emailInput").value);
}

// Phone Number Validation
function phoneValidation() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    .test(document.getElementById("phoneInput").value);
}

// Age Validation
function ageValidation() {
    return /^(0?[1-9]|[1-8][0-9]|90)$/
    .test(document.getElementById("ageInput").value);
}

// Password Validation
function passwordValidation() {
    return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    .test(document.getElementById("passwordInput").value);
}

// Confirm Password Validation
function rePasswordValidation() {
    return (document.getElementById("rePasswordInput").value == document.getElementById("passwordInput").value);
}


