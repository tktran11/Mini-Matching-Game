var cardsArray = [
  { 'name': 'spoon', 'img': 'http://www.elmoremagazine.com/wp-content/uploads/2013/04/spoon-ga-ga-ga-ga-ga-album-art-5896.jpeg', },
  { 'name': 'qotsa', 'img': 'https://image.lyricspond.com/image/q/artist-queens-of-the-stone-age/album-queens-of-the-stone-age-rated-r/cd-cover.jpg', },
  { 'name': 'theShins', 'img': 'https://e.snmc.io/i/300/w/e17cb3090311da81d3fb0b260b2e3168/1949301', },
  { 'name': 'alvvays', 'img': 'https://images-na.ssl-images-amazon.com/images/I/81o8p3e8lyL._SY355_.jpg', },
  { 'name': 'lcdSoundsystem', 'img': 'https://www.self-titledmag.com/wp-content/uploads/2010/04/lcdthis452.jpg', },
  { 'name': 'grizzlyBear', 'img': 'https://media.pitchfork.com/photos/5929a4535e6ef9596932084e/1:1/w_320/e8c5fabf.jpg', },
  { 'name': 'andrewBird', 'img': 'https://media.pitchfork.com/photos/5929a2b59d034d5c69bf2c70/1:1/w_320/894e8bbd.jpg', },
  { 'name': 'fatherJM', 'img': 'https://images-na.ssl-images-amazon.com/images/I/B1XiVtUgjES._SX355_.jpg', },
  { 'name': 'theNational', 'img': 'https://upload.wikimedia.org/wikipedia/en/0/08/Highviolet.jpg', },
  { 'name': 'theStrokes', 'img': 'https://media.pitchfork.com/photos/5929a58b13d1975652138f9b/1:1/w_320/c1b895b7.jpg', },
  { 'name': 'carSeatHeadrest', 'img': 'https://media.pitchfork.com/photos/5a661767680819715f1868c7/1:1/w_320/Twin%20Fantasy.jpg', },
  { 'name': 'kishiBashi', 'img': 'https://images-na.ssl-images-amazon.com/images/I/81AxirTlVxL._SY355_.jpg', },
];

// Duplicate cards for matching purposes
var gameGrid = cardsArray.concat(cardsArray);

// Randomize placement of cards for replayability
gameGrid.sort(function () {
  return 0.5 - Math.random();
})

// Assign div (with id game-board) to game
var game = document.getElementById('game-board');
// Section element for grid
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
// Append grid to game board div
game.appendChild(grid);

// Assign information from array for cards
for (i = 0; i < gameGrid.length; i++) {
  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = gameGrid[i].name;

  // Create front of card (plain color)
  var front = document.createElement('div');
  front.classList.add('front');

  // Create back of card (has image, initially hidden)
  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${gameGrid[i].img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
}

var firstGuess = '';
var secondGuess = '';
var previousTarget = null;
var delay = 500;
var count = 0;


// Mark matched pairs
var match = function () {
  var selected = document.querySelectorAll('.selected');

  for (i = 0; i < selected.length; i++) {
    selected[i].classList.add('match');
  }
};

// Reset guesses after two tries
var resetGuesses = function () {
  firstGuess = '';
  secondGuess = '';
  previousTarget = null;
  count = 0;

  var selected = document.querySelectorAll('.selected');
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.remove('selected');
  }
};


grid.addEventListener('click', function (event) {

  var clicked = event.target;
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
    return;
  }
  if (count < 2) {
    count++;

    if (count === 1) {

      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {

      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess !== '' && secondGuess !== '') {

      if (firstGuess === secondGuess) {

        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
    previousTarget = clicked;
  }
});
