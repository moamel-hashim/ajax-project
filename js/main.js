
var $emoji = document.querySelector('.emoji');
$emoji.addEventListener('click', emojiHandler);

function emojiHandler(event) {
  var $logoRow = document.querySelector('.center-emoji');
  $logoRow.className = 'hidden';
  var $header = document.querySelector('.under-line');
  $header.className = 'under-line view';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://icanhazdadjoke.com/');
  xhr.responseType = 'json';
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.addEventListener('load', function () {
    var $p = document.querySelector('p');
    $p.textContent = xhr.response.joke;
    var $jokeContainer = document.querySelector('.joke-container');
    $jokeContainer.classList.remove('hidden');
    dadJokesArray.push(xhr.response.joke);
    $smilingEmoji.classList.remove('hidden');

  });
  xhr.send();
}

var dadJokesArray = [];
var dadJokesIndex = 0;
var $leftArrow = document.querySelector('.fa-chevron-left');
var $rightArrow = document.querySelector('.fa-chevron-right');
$rightArrow.addEventListener('click', rightArrowEventHandler);
$leftArrow.addEventListener('click', leftArrowEventHandler);

function rightArrowEventHandler(event) {
  dadJokesIndex++;
  if (dadJokesArray[dadJokesIndex] === undefined) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://icanhazdadjoke.com/');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.addEventListener('load', function () {
      var $p = document.querySelector('p');
      $p.textContent = xhr.response.joke;
      dadJokesArray.push(xhr.response.joke);
    });
    xhr.send();
  } else {
    var $p = document.querySelector('p');
    $p.textContent = dadJokesArray[dadJokesIndex];
  }
  if (favoriteDadJokeArray.indexOf(dadJokesArray[dadJokesIndex]) !== -1) {
    $smilingEmoji.textContent = '😂';
  } else {
    $smilingEmoji.textContent = '😁';
  }
}

function leftArrowEventHandler(event) {
  if (dadJokesIndex > 0) {
    dadJokesIndex--;
    var $p = document.querySelector('p');
    $p.textContent = dadJokesArray[dadJokesIndex];
  }
  if (favoriteDadJokeArray.indexOf(dadJokesArray[dadJokesIndex]) !== -1) {
    $smilingEmoji.textContent = '😂';
  } else {
    $smilingEmoji.textContent = '😁';
  }
}

var favoriteDadJokeArray = [];
var $smilingEmoji = document.querySelector('.smiling');
$smilingEmoji.addEventListener('click', smilingEmojiEventHandler);

function smilingEmojiEventHandler(event) {
  if ($smilingEmoji.textContent === '😁') {
    favoriteDadJokeArray.push(dadJokesArray[dadJokesIndex]);
    $smilingEmoji.textContent = '😂';
  } else {
    var exFavDadJokeIndex = favoriteDadJokeArray.indexOf(dadJokesArray[dadJokesIndex]);
    favoriteDadJokeArray.splice(exFavDadJokeIndex, 1);
    $smilingEmoji.textContent = '😁';
  }
}

var onOrOff = true;
var $favoriteMenu = document.querySelector('.favorite-menu');
var $hamburger = document.querySelector('.hamburger');
$hamburger.addEventListener('click', favoriteMenuHandler);
function favoriteMenuHandler(event) {
  if (onOrOff === true) {
    $favoriteMenu.className = 'favorite-menu';
    onOrOff = false;
  } else if (onOrOff === false) {
    $favoriteMenu.className = 'favorite-menu hidden';
    onOrOff = true;
  }
}

var $favorite = document.querySelector('.favorite');
$favorite.addEventListener('click', favoriteHandler);
function favoriteHandler(event) {
  if (event.target.matches('.favorite')) {
    var $main = document.querySelector('main');
    $main.className = 'hidden';
    $favoritePage.className = 'favorite-page';
    $favoriteMenu.className = 'favorite-menu hidden';
    renderFavorite();
  }
}
var $favoritePage = document.querySelector('.favorite-page');

function renderFavorite(favorite) {
  var $h2 = document.createElement('h2');
  var $ul = document.createElement('ul');
  $h2.setAttribute('class', 'favorite-design');
  $ul.setAttribute('class', 'padding-initial font-family');
  $favoritePage.appendChild($h2);
  $favoritePage.appendChild($ul);
  if (favoriteDadJokeArray.length === 0) {
    $h2.textContent = 'Please favorite a joke';
    $h2.className = 'no-joke';
    $ul.className = 'hidden';
  } else {
    $h2.textContent = 'Favorites';
    for (var i = 0; i < favoriteDadJokeArray.length; i++) {
      var $li = document.createElement('li');
      $li.setAttribute('class', 'favorite-joke-design');
      $li.textContent = favoriteDadJokeArray[i];
      $ul.appendChild($li);
    }
  }
}
