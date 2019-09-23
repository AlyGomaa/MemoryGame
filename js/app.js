/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
	
// moves counter
let moves = document.querySelector('.moves');
// card items
let items = document.querySelectorAll('.card');

// initilization at the start of game, rearrenge cards and reset the score
function initGame(){
	moves.innerHTML = 0;
	// cards shapes classes names 
	let cards = ['fa fa-diamond', 'fa fa-paper-plane-o'
				, 'fa fa-anchor', 'fa fa-bolt'
				, 'fa fa-cube', 'fa fa-anchor'
				, 'fa fa-leaf', 'fa fa-bicycle'
				, 'fa fa-diamond', 'fa fa-bomb'
				, 'fa fa-leaf', 'fa fa-bomb'
				, 'fa fa-bolt', 'fa fa-bicycle'
				, 'fa fa-paper-plane-o', 'fa fa-cube'];
				
	// rearrenge cards
	let shuffledCards = shuffle(cards);

	// cards parent
	const deck = document.querySelector('.deck');
	
	// remove old cards
	for (let i=0; i < items.length ; i++)
	{
		items[i].parentNode.removeChild(items[i]);
	}

	// add a new set of cards
	for (let i=0; i < shuffledCards.length ; i++)
	{
		let iElem = document.createElement('i');
		let liElem = document.createElement('li');
		iElem.setAttribute('class', shuffledCards[i]);
		
		liElem.appendChild(iElem);
		liElem.setAttribute('class', 'card');

		deck.appendChild(liElem);
	} 
	Timer();
}

function Timer(){
	var seconds = 0;
    elCounter = document.querySelector('.counter');

	function incrementSeconds() {
		seconds += 1;
		elCounter.innerText = seconds;
	}

	counter = setInterval(incrementSeconds, 1000);
}
let starsCount = 5;

// Game brain !!!!!
function matching(){
	// click event for all cards
	items.forEach(function(item){
	item.addEventListener('click', function(e){
		// check if card has been matched before
		if (!(item.classList.contains('show')) && !(item.classList.contains('open')) && (parseInt(starsCount) != 0))
		{
			// prevent 3 items opened at same time during timeout
			if (openedItems.length < 2){
				// add card to clicked card to openedItems array
				openedItems.push(item);
				// add classes to clicked card to be shown
				item.classList.add('open', 'show');
			}
			// prevent checking more or lower than 2 cards
			if (openedItems.length == 2)
			{
				// increase moves counter
				let temp = moves.innerHTML;
				moves.innerHTML = (parseInt(temp, 10) + 1).toString(10) ;
				// check if a star should be droped due to moves counts
				let star = document.querySelector('.star');
				if ((((parseInt(temp, 10) + 1) - 17) % 5 == 1) && (star != null))
				{
					starsCount = (parseInt(starsCount) - 1).toString(10);
					star.parentNode.removeChild(star);
				}
				// reclose cards when not matched
				if(openedItems[0].querySelector('i').getAttribute('class') != openedItems[1].querySelector('i').getAttribute('class'))
				{
					setTimeout(function(){
						openedItems.forEach(function(openedItem){
						openedItem.classList.remove('open', 'show');
						
						openedItems = [];
					})
					}, 800);
				}
				// matched cards
				else
				{
					openedItems.forEach(function(openedItem){
					openedItem.classList.add('match');
						
					openedItems = [];
					
					});
					matchedCount = matchedCount + 1 ;
					//console.log(matchedCount);
					
				}
				// check if the game is finished
				if (matchedCount == 8)
				{
					clearInterval(counter);

					if (parseInt(starsCount) == 5)
						sweetAlert("Excellent!! 5 Stars", "You finished the Game with " + moves.innerHTML + " Moves! in " + elCounter.innerText +" Seconds", "success");
					else if (parseInt(starsCount) == 4)
						sweetAlert("Very Good!! 4 Stars", "You finished the Game with " + moves.innerHTML + " Moves! in " + elCounter.innerText +" Seconds", "success");
					else if (parseInt(starsCount) == 3)
						sweetAlert("Good!! 3 Stars", "You finished the Game with " + moves.innerHTML + " Moves! in " + elCounter.innerText +" Seconds", "success");
					else if (parseInt(starsCount) == 2)
						sweetAlert("Just Ok!! 2 Stars", "You finished the Game with " + moves.innerHTML + " Moves in " + elCounter.innerText +" Seconds, but you could do more effort!", "success");
					else if (parseInt(starsCount) == 1)
						sweetAlert("Bad!! 1 Star", "You finished the Game with " + moves.innerHTML + " Moves in " + elCounter.innerText +" Seconds, but you could do more effort!", "success");
				}
				// or Game is Over!!!
				else if (parseInt(starsCount) == 0)
				{
					sweetAlert("Bad!! 0 Star", "Game Over!! with " + moves.innerHTML + " Moves, in " + elCounter.innerText +" Seconds but you could do more effort to win next time!", "error");
				}
			}
		}
		
	});
});
}

// Initiate Game Variables and Cards
initGame();
items = document.querySelectorAll('.card');
let openedItems = [];
let matchedCount = 0;
// active the Game Brain 
matching();

// restart sign
let restart =  document.querySelector('.restart');
// restar click event
restart.addEventListener('click', function(e){
	// Initiate the Game when restart it
	Restart();
	// active the Game Brain again
	matching();
});
// reinitiate Game Variables and Cards
function Restart(){
	initGame();
	items = document.querySelectorAll('.card');
	openedItems = [];
    matchedCount = 0;
	starsCount = 5;
	let stars = document.querySelectorAll('.star');
	for (let i=0 ; i<stars.length ; i++)
	{
		stars[i].parentNode.removeChild(stars[i]);
	}
	
	for(let i=0 ; i<5 ; i++)
	{
		let iElem = document.createElement('i');
		let liElem = document.createElement('li');
		iElem.setAttribute('class', 'fa fa-star');
		
		liElem.appendChild(iElem);
		liElem.setAttribute('class', 'star');

		let starsUl = document.querySelector('.stars');
		starsUl.appendChild(liElem);
	}
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
