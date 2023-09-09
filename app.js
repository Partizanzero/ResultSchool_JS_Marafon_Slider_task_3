/* Слайдер картинок
- пишем интересный слайдер изображений, создавая CSS-анимации вместе с JavaScript
- реализуем переключение слайдов по нажатию клавиш на клавиатуре
*/

//получаем ноды с кнопками
const upBtn = document.querySelector(".up-button");
const downBtn = document.querySelector(".down-button");
//получаем ноду основного контейнера
const container = document.querySelector(".container");

/*Cовмещаем картинку и цвет сайдбара слева*/
//получаем ноду сайдбара
const sidebar = document.querySelector(".sidebar");
//получаем ноду дива с картинками
const mainSlide = document.querySelector(".main-slide");
//задаем активный слайд
let activeSlideIndex = 0;
//получаем кол-во div с картинками внутри main-slide (т.е. получаем кол-во картинок)
const slidesCount = mainSlide.querySelectorAll("div").length;
//задаем высоту сайдбара
sidebar.style.top = `-${(slidesCount - 1) * 100}vh`;

//пишем обработчик для кнопки "Вверх"
upBtn.addEventListener("click", () => {
  changeSlide("up");
});

//пишем обработчик для кнопки "Вниз"
downBtn.addEventListener("click", () => {
  changeSlide("down");
});

//пишем обработчик для переключения слайдера при нажатии на клавиатуре кнопки "вниз"
//cобытие keydown происходит при нажатии клавиши
//cвойство key объекта события позволяет получить символ клавиши клавиатуры
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    changeSlide("up");
  } else if (event.key === "ArrowUp") {
    changeSlide("down");
  }
});

//Ф-я смены слайда по клику кнопки (direction - направление кнопки (up/down))
function changeSlide(direction) {
  //если жмем кнопку "Вверх", то активный слайд увеличивается на 1
  if (direction === "up") {
    activeSlideIndex++;
    //если счетчик слайдов больше, чем картинок, то обнуляем кол-во сладйов
    if (activeSlideIndex === slidesCount) {
      activeSlideIndex = 0;
    }
    //если жмем кнопку "Вниз", то активный слайд уменьшается на 1
  } else if (direction === "down") {
    //если счетчик слайдов меньше 0, то обнуляем кол-во сладйов
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesCount - 1;
    }
  }

  /*Анимируем переключение слайдов*/
  //высчитываем высоту главного контенера (clientHeight - внутренняя высота элемента в пикселах)
  const height = container.clientHeight;
  //сдвигаем слайд по вертикали на указанное значение
  //значение со знаком минус будет двигать слайд вверх
  mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
  //сдвигаем сайдбар по вертикали на указанное значение
  //положительное значение будет двигать слайд вниз
  sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;
}
