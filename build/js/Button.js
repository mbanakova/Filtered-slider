// Класс-конструктор кнопки
class Button {
  constructor(country, countryEn) {
    this.country = country;
    this.countryEn = countryEn;
  }
  render(to) {
    to.innerHTML += `
    <li class="slider__radio">
      <input type="radio" id="${this.countryEn}" name="countries" value="${this.country}">
      <label for="${this.countryEn}" data-f="${this.countryEn}">${this.country}</label>
    </li>`;
  }
}
