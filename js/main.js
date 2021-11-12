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
  }
}
