
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
    // show right and left arrow
    $leftArrow.className = 'fas fa-chevron-left';
    $rightArrow.className = 'fas fa-chevron-right';
  });
  xhr.send();
}

// var count = 0;
var $leftArrow = document.querySelector('.fa-chevron-left');
var $rightArrow = document.querySelector('.fa-chevron-right');
$rightArrow.addEventListener('click', rightArrowEventHandler);
// $leftArrow.addEventListener('click', leftArrowEventHandler);

function rightArrowEventHandler() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://icanhazdadjoke.com/');
  xhr.responseType = 'json';
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.addEventListener('load', function () {
    var $p = document.querySelector('p');
    $p.textContent = xhr.response.joke;
  });
  xhr.send();
}
