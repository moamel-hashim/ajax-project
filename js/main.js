
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

}

function leftArrowEventHandler(event) {
  if (dadJokesIndex > 0) {
    dadJokesIndex--;
    var $p = document.querySelector('p');
    $p.textContent = dadJokesArray[dadJokesIndex];
  }
}

var favoriteDadJokeArray = [];
var showOrHideLaughingEmoji = true;
var $smilingEmoji = document.querySelector('.smiling');
$smilingEmoji.addEventListener('click', smilingEmojiEventHandler);

function smilingEmojiEventHandler(event) {
  if (showOrHideLaughingEmoji === true) {
    favoriteDadJokeArray.push(dadJokesArray[dadJokesIndex]);
    $smilingEmoji.textContent = '😂';
    showOrHideLaughingEmoji = false;
  } else {
    $smilingEmoji.textContent = '😁';
    showOrHideLaughingEmoji = true;
  }
}
