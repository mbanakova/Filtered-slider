// Используем:
var url = 'http://localhost:3000/cards.json';
var json = {};

// Получаем данные из JSON:
function readJSON(file, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.overrideMimeType('application/json');
  xhttp.open('GET', file, true);
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callback(this.responseText);
    }
  };
  xhttp.send();
}

readJSON(url, function (text) {
  json = JSON.parse(text);
  var div = document.querySelector('.slider__inner'); // пушим карточки сюда

  // создаёт карточки на каждый элемент из json
  json.product.forEach(function (item) {
    item = new Card(item.city, item.country, item.countryEn, item.img1, item.text);
    item.render(div);
  });

  // ищем все возможные страны
  var countries = {};
  json.product.forEach(function (item) {
    countries[item.country] = item.countryEn;
  });

  var select = document.querySelector('.slider__filter'); // пушим кнопки сюда
  // каждая страна - новая кнопка
  for (let key in countries) {
    item = new Button(key, countries[key]);
    item.render(select);
  }
});

// Фильтруем кликом по кнопкам
var selection = document.querySelector('.slider__filter'); // область кнопок

selection.addEventListener('click', (event) => {
  var cards = document.querySelectorAll('.card'); // карточки
  if (event.target.tagName != 'LABEL') {
    return false;
  }

  var filterClass = event.target.dataset['f'];

  cards.forEach(elem => {
    elem.classList.remove('card--hide');
    if (!elem.classList.contains(filterClass) && filterClass !== 'all') {
      elem.classList.add('card--hide');
    }
  })
})

// Сдвиг слайдера
let slider = document.querySelector('.slider__outer');
let innerSlider = document.querySelector('.slider__inner');
let leftBtn = document.querySelector('.arrows--left');
let rightBtn = document.querySelector('.arrows--right');
let pressed = true;
let startx; // где был клик относительно левого края всей простыни слайдов
let x;

slider.addEventListener('mousedown', (event) => {
  pressed = true;
  startx = event.offsetX - innerSlider.offsetLeft; // offsetX - расстояние клика от левого края, innerSlider.offsetLeft - насколько сдвинут внутренний блок от родителя
  slider.style.cursor = 'grabbing';
});

slider.addEventListener('mouseenter', () => {
  slider.style.cursor = 'grab';
});

slider.addEventListener('mouseup', () => {
  slider.style.cursor = 'grab';
});

window.addEventListener('mouseup', () => {
  pressed = false;
});

slider.addEventListener('mousemove', (event) => {
  if (!pressed) return;
  event.preventDefault();

  x = event.offsetX;
  innerSlider.style.left = `${x - startx}px`;
  checkBoundary();
});

function checkBoundary() {
  let outer = slider.getBoundingClientRect();
  let inner = innerSlider.getBoundingClientRect();
  if (parseInt(innerSlider.style.left) > 0) {
    innerSlider.style.left = '0px';
  } else if (inner.right < outer.right) {
    innerSlider.style.left = `-${inner.width - outer.width}px`;
  }
}

function disableBtn(elem) {
  elem.setAttribute('disabled', true);
}

function anableBtn(elem) {
  elem.setAttribute('disabled', false);
}

// window.onload = function () {
//   let left = document.querySelector('.arrows--left');
//   let right = document.querySelector('.arrows--right');
//   let line = document.querySelector('.slider__inner');
//   let cards = document.querySelectorAll('.card');
//   let cardWidth = document.querySelector('.slider__outer').offsetWidth; // offsetWidth = полнаяя ширина карточки
//   let gap = 30;
//   let lineWidth = 0;
//   let cardsWidth = [];
//   // let cardIndex = [200, 200, 200];
//   let position = 0;
//   let step = 0;
//   let unshownWidth = 0;

// // Считаем ширину контейнера с карточками
//   for (let i = 0; i < cards.length / 2; i++) {
//     if (i !== (cards.length / 2) - 1) {
//       cardsWidth.push(cards[i].offsetWidth + gap);
//       lineWidth += (cards[i].offsetWidth + gap)
//     } else {
//       cardsWidth.push(cards[i].offsetWidth);
//       lineWidth += (cards[i].offsetWidth)
//     }
//   }

// // Сдвиг карточек вперёд
// function showNext () {
//   unshownWidth = lineWidth - cardWidth + gap - (position + cardsWidth[step]);
//   if (unshownWidth >= 0) {  // если есть что прокручивать
//     position += cardsWidth[step]; // сдвинулось на 0 + 200 px
//     line.style.transform = `translateX(-${position}px)`;  // новая координата полосы -200px влево
//     step++;  // на след. итерации сдвигаем на ширину следующей карточки
//   }
//   console.log(step)
//   console.log(position)
// }

// // Сдвиг карточек назад
// function showPrevious () {
//   unshownWidth = lineWidth - cardWidth + gap - (position + cardsWidth[step]);
//   if (unshownWidth >= 0) {
//     position -= cardsWidth[step]; // сдвинулось на 0 - 200 px
//     line.style.transform = `translateX(-${position}px)`;
//     step--;
//   }
//   console.log(step)
//   console.log(position)
//   console.log(unshownWidth)
// }
// // Сдвигаем контейнер по клику
//   right.addEventListener('click', showNext);
//   left.addEventListener('click', showPrevious)
// }
