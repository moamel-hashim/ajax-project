
var $emoji = document.querySelector('.emoji');
$emoji.addEventListener('click', emojiHandler);

var showOrHide = true;

function emojiHandler(event) {
  if (showOrHide === true) {
    var $logoRow = document.querySelector('.center-emoji');
    $logoRow.className = 'hidden';
    showOrHide = false;
  }
  if (showOrHide === false) {
    var $header = document.querySelector('.under-line');
    $header.className = 'under-line view';
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
}
