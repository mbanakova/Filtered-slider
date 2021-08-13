// Класс-конструктор карточки
class Card {
  constructor(city, country, countryEn, img1, text) {
    this.city = city;
    this.country = country;
    this.countryEn = countryEn;
    this.img1 = img1;
    this.text = text;
  }
  render(to) {
    to.innerHTML += `
    <div class="card ${this.countryEn}">
      <div class="card__cover">
      <img src="${this.img1}" width="170" height="250" alt="${this.city}">
      <div class="card__name">
        <h2 class="card__city">${this.city}</h2>
        <p class="card__country">${this.country}</p>
      </div>
      </div>
      <div class="card__description">
      <button class="card__close" type="button" aria-label="Закрыть"></button>
        <p class="card__text">${this.text}</p>
        <a class="card__info" href="#">Подробнее</a>
      </div>
    </div>`;
  }
}
