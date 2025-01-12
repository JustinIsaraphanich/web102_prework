/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
        const gamesData = typeof games === 'string' ? JSON.parse(games) : games;
        const gamesContainer = document.getElementById('games-container');
    
        for(let i = 0; i < gamesData.length; i++){
            const game = gamesData[i];
            const gameCard = document.createElement('div');
            gameCard.classList.add('game-card');
    
            gameCard.innerHTML = `
                <img class="game-img" src="${game.img}" alt="${game.name}" />
                <h2>${game.name}</h2>
                <p>${game.description}</p>
                <div class="stats">
                    <p>Pledged: $${game.pledged}</p>
                    <p>Goal: $${game.goal}</p>
                    <p>Backers: ${game.backers}</p>
                </div>
            `;
            gamesContainer.appendChild(gameCard);
        }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_DATA);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc,game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter ((games) => {
        return games.pledged < games.goal
    });
    console.log(unfundedGames);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter((games) =>{
        return games.pledged > games.goal
    });
    console.log(fundedGames)
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_DATA);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
document.getElementById("all-btn").addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const numberUnfunded = unfundedGames.length;
// create a string that explains the number of unfunded games using the ternary operator
const gameDescription = `We currently have ${numberUnfunded} game${numberUnfunded === 1 ? '' : 's'} that still need${numberUnfunded === 1 ? 's' : ''} funding!`;

// create a new DOM element containing the template string and append it to the description container
const descriptionElement = document.createElement('p');
descriptionElement.innerHTML = gameDescription;
descriptionContainer.appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const {name, description, ...others} = sortedGames[0];
const {name: name2, description: description2, ...others2} = sortedGames[1];
console.log(sortedGames);

// create a new element to hold the name of the top pledge game, then append it to the correct element
firstGameContainer.innerHTML = `
    <h4>${name}</h4>
    <p>${description}</p>
    <div class="stats">
        <p>Pledged: $${others.pledged.toLocaleString()}</p>
        <p>Goal: $${others.goal.toLocaleString()}</p>
        <p>Backers: ${others.backers.toLocaleString()}</p>
    </div>
    <img class="game-img" src="${others.img}" alt="${name}" />
`;
// do the same for the runner up item
secondGameContainer.innerHTML = `
    <h4>${name2}</h4>
    <p>${description2}</p>
    <div class="stats">
        <p>Pledged: $${others2.pledged.toLocaleString()}</p>
        <p>Goal: $${others2.goal.toLocaleString()}</p>
        <p>Backers: ${others2.backers.toLocaleString()}</p>
    </div>
    <img class="game-img" src="${others2.img}" alt="${name2}" />
`;      