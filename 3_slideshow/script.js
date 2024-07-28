// - refs

const getWord = ['Null', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
const btns = document.querySelectorAll('.btn-control');
let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.dot');
const btnAdd = document.querySelector('.add-slide');
const fileName = document.getElementById('newslide');
const btnDel = document.querySelector('.del-slide');
const slideParent = document.querySelector('.slides-wrap');
const dotsParent = document.querySelector('.dots-nav');

function changeSlide(el, index = -1, offset = 0) {

  let activeSlide = document.querySelector('[data-active]');
  let activeDot = document.querySelector('[data-dot_active]');

  if (index === -1) {
    index = [...slides].indexOf(activeSlide) + offset;
    index = parseInt(index.toString(slides.length).slice(-1));
  }

  slides[index].dataset.active = '';
  dots[index].dataset.dot_active = '';
  delete activeSlide.dataset.active;
  delete activeDot.dataset.dot_active;
}

btns.forEach((el) => {
  el.addEventListener('click', () => {
    let offset = el.dataset.dir === 'prev' ? slides.length - 1 : 1;
    changeSlide(el, -1, offset);
  });
});

function addDots() {
  //видалити всі крапки
  dotsParent.replaceChildren();

  //додати скільки треба
  for (let i = 0; i < slides.length; i++) {
    let newDot = document.createElement('button');
    newDot.className = 'dot';
    dotsParent.appendChild(newDot);
  }

  // переназначити посилання
  dots = document.querySelectorAll('.dot');
  //виділити активний
  let activeSlide = document.querySelector('[data-active]');
  let index = [...slides].indexOf(activeSlide);
  dots[index].dataset.dot_active = '';

  //назначити евент
  dots.forEach((el) => {
    el.addEventListener('click', () => {
      let index = [...dots].indexOf(el);
      changeSlide(el, index, 0);
    });
  });
}

//заповнити DOTs
addDots();

function reWriteInfo() {
  const numbers = document.querySelectorAll('.numbertext');
  numbers.forEach((el, i) => {
    el.textContent = `${i + 1} / ${slides.length}`;
  });

  const texts = document.querySelectorAll('.text');
  texts.forEach((el, i) => {
    el.textContent = `Caption ${getWord[i + 1]}`;
  });
}

btnAdd.addEventListener('click', () => {
  if (fileName.value != "") {
    const newSlideParent = document.createElement('div');
    const newSlideNumber = document.createElement('div');
    const newSlideImg = document.createElement('img');
    const newSlideText = document.createElement('div');

    newSlideParent.className = 'slide';
    newSlideNumber.className = 'numbertext';
    newSlideText.className = 'text';

    //переробити строку назви файло, бо інакше буде некрасиво C:\\fakepath\\slide4.jpg
    let newFileName = fileName.value;
    const lastSlash = newFileName.lastIndexOf('\\');
    const onlyFileName = newFileName.substr(lastSlash + 1);
    newSlideImg.src = './img/' + onlyFileName;

    //очистити значення ))
    fileName.value = '';

    newSlideParent.appendChild(newSlideNumber);
    newSlideParent.appendChild(newSlideImg);
    newSlideParent.appendChild(newSlideText);

    slideParent.appendChild(newSlideParent);

    // перерахувати слайди
    slides = document.querySelectorAll('.slide');

    //поставити активним новий
    let activeSlide = document.querySelector('[data-active]');
    slides[slides.length - 1].dataset.active = '';
    delete activeSlide.dataset.active;

    //обновити усі назви слайдів
    reWriteInfo();

    //перезаповнити DOTs
    addDots();

    btnAdd.disabled = !(slides.length != getWord.length);
  }
});

btnDel.addEventListener('click', () => {
  let activeSlide = document.querySelector('[data-active]');
  slideParent.removeChild(activeSlide);

  // перерахувати слайди
  slides = document.querySelectorAll('.slide');
  slides[0].dataset.active = '';

  //обновити усі назви слайдів
  reWriteInfo();

  //перезаповнити DOTs
  addDots();

  btnDel.disabled = !(slides.length != 1);
});