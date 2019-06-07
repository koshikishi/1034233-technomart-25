var contactsLink = document.querySelector('.contacts__button');

var modalContacts = document.querySelector('.modal--contacts');
var modalContactsClose = modalContacts.querySelector('.modal__close');

var overlay = document.querySelector('.overlay');

// Оживление всплывающего окна формы обратной связи
contactsLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalShow(modalContacts);
});

modalContactsClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalClose(modalContacts);
});

// Оживление всплывающего окна интерактивной карты
var mapLink = document.querySelector('.contacts__map-image');

var modalMap = document.querySelector('.modal--map');
var modalMapClose = modalMap.querySelector('.modal__close');

mapLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalShow(modalMap);
});

modalMapClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalClose(modalMap);
});

// Закрытие всплывающего окна по нажатию Esc
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modalContacts.classList.contains('modal--shown')) {
      modalClose(modalContacts);
    }
    if (modalMap.classList.contains('modal--shown')) {
      modalClose(modalMap);
    }
  }
});

// Закрытие всплывающего окна по клику вне окна
overlay.addEventListener('click', function () {
  if (modalContacts.classList.contains('modal--shown')) {
    modalClose(modalContacts);
  }
  if (modalMap.classList.contains('modal--shown')) {
    modalClose(modalMap);
  }
});

// Появление всплывающего окна
function modalShow(elmt) {
  elmt.classList.add('modal--shown');
  overlay.classList.add('overlay--shown');
}

// Закрытие всплывающего окна
function modalClose(elmt) {
  elmt.classList.remove('modal--shown');
  overlay.classList.remove('overlay--shown');
}
