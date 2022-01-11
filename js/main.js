
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

var homePage = true;
var $favoriteMenu = document.querySelector('.favorite-menu');
var $hamburger = document.querySelector('.hamburger');
$hamburger.addEventListener('click', favoriteMenuHandler);
function favoriteMenuHandler(event) {
  if (homePage === true) {
    $favoriteMenu.className = 'favorite-menu';
    homePage = false;
  } else if (homePage === false) {
    $favoriteMenu.className = 'favorite-menu hidden';
    homePage = true;
  }
}

var $favorite = document.querySelector('.favorite');
var $main = document.querySelector('main');
$favorite.addEventListener('click', favoriteHandler);
function favoriteHandler(event) {
  if (event.target.matches('.favorite')) {
    $main.className = 'hidden';
    $favoritePage.className = 'favorite-page';
    $favoriteMenu.className = 'favorite-menu hidden';
    renderCreateModule();
    renderFavorite();
  }
}
var $favoritePage = document.querySelector('.favorite-page');

function renderFavorite() {
  if (favoriteDadJokeArray.length === 0) {
    var $h2 = document.createElement('h2');
    $favoritePage.appendChild($h2);
    $h2.setAttribute('class', 'no-joke');
    $h2.textContent = 'Please favorite a joke';
  } else {
    var $h2Checker = document.querySelector('.favorite-design');
    if (!$h2Checker) {
      var $secondH2 = document.createElement('h2');
      $secondH2.setAttribute('class', 'favorite-design');
      $secondH2.textContent = 'Favorites';
      $favoritePage.appendChild($secondH2);
    }
    var $ul = document.createElement('ul');
    $favoritePage.appendChild($ul);
    $ul.setAttribute('class', 'padding-initial font-family');
    for (var i = 0; i < favoriteDadJokeArray.length; i++) {
      var $div = document.createElement('div');
      $div.setAttribute('class', 'row align-center under-line');
      $ul.appendChild($div);
      var $li = document.createElement('li');
      $li.setAttribute('class', 'favorite-joke-design');
      $li.textContent = favoriteDadJokeArray[i];
      $div.appendChild($li);
      var $trashTasteHolder = document.createElement('div');
      $trashTasteHolder.setAttribute('class', 'trash-taste-container');
      $div.appendChild($trashTasteHolder);
      var $a = document.createElement('a');
      $a.setAttribute('class', 'trash-taste');
      $trashTasteHolder.appendChild($a);
      var $trashTaste = document.querySelector('.trash-taste');
      $trashTaste.addEventListener('click', trashTasteModel);
      var $i = document.createElement('i');
      $i.setAttribute('class', 'fas fa-trash-alt');
      $a.appendChild($i);
    }
  }
}

var $title = document.querySelector('.title-design');
$title.addEventListener('click', titlePageHandler);

function titlePageHandler(event) {
  if (event.target.matches('.title-design')) {
    $main.className = 'view';
    $favoritePage.className = 'favorite-page hidden';
    var $removeUl = document.querySelector('ul');
    if ($removeUl) {
      $removeUl.remove();
    }
    var $removeSecondH2 = document.querySelector('.favorite-design');
    if ($removeSecondH2 > 0) {
      $removeSecondH2.remove();
    }
    var $hideH2 = document.querySelector('.no-joke');
    if ($hideH2) {
      $hideH2.remove();
    }
  }
  homePage = true;
}

function renderCreateModule() {
  var $moduleContainer = document.createElement('div');
  $moduleContainer.setAttribute('class', 'module-container row hidden');
  $favoritePage.appendChild($moduleContainer);
  var $module = document.createElement('div');
  $module.setAttribute('class', 'module');
  $moduleContainer.appendChild($module);
  var $insideModule = document.createElement('div');
  $insideModule.setAttribute('class', 'inside-module');
  $module.appendChild($insideModule);
  var $p = document.createElement('p');
  $p.textContent = 'Are you sure you want to delete this joke?';
  $insideModule.appendChild($p);
  var $buttonContainer = document.createElement('div');
  $buttonContainer.setAttribute('class', 'button-container row justify-content-space-around');
  $insideModule.appendChild($buttonContainer);
  var $cancel = document.createElement('button');
  $cancel.textContent = 'cancel';
  $cancel.setAttribute('class', 'cancel');
  $buttonContainer.appendChild($cancel);
  var $cancelButton = document.querySelector('.cancel');
  $cancelButton.addEventListener('click', cancelHandler);
  var $confirm = document.createElement('button');
  $confirm.textContent = 'confirm';
  $confirm.setAttribute('class', 'confirm');
  $buttonContainer.appendChild($confirm);
}

function trashTasteModel(event) {
  var $showModule = document.querySelector('.module-container');
  if ($showModule) {
    $showModule.setAttribute('class', 'module-container row view');
  }
}

function cancelHandler(event) {
  var $hideModule = document.querySelector('.module-container');
  if (event.target.matches('.cancel')) {
    $hideModule.className = 'module-container row hidden';
  }
}
