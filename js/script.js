var contactsLink = document.querySelector('.contacts__button');

var modalContacts = document.querySelector('.modal--contacts');
var modalContactsClose = modalContacts.querySelector('.modal__close');

var overlay = document.querySelector('.overlay');

contactsLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalContacts.classList.add('modal--shown');
  overlay.classList.add('overlay--shown');
});

modalContactsClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalContacts.classList.remove('modal--shown');
  overlay.classList.remove('overlay--shown');
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modalContacts.classList.contains('modal--shown')) {
      modalContacts.classList.remove('modal--shown');
      overlay.classList.remove('overlay--shown');
    }
  }
});

overlay.addEventListener('click', function () {
  if (modalContacts.classList.contains('modal--shown')) {
    modalContacts.classList.remove('modal--shown');
    overlay.classList.remove('overlay--shown');
  }
});

var mapLink = document.querySelector('.contacts__map-image');

var modalMap = document.querySelector('.modal--map');
var modalMapClose = modalMap.querySelector('.modal__close');

mapLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalMap.classList.add('modal--shown');
  overlay.classList.add('overlay--shown');
});

modalMapClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalMap.classList.remove('modal--shown');
  overlay.classList.remove('overlay--shown');
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modalMap.classList.contains('modal--shown')) {
      modalMap.classList.remove('modal--shown');
      overlay.classList.remove('overlay--shown');
    }
  }
});

overlay.addEventListener('click', function () {
  if (modalMap.classList.contains('modal--shown')) {
    modalMap.classList.remove('modal--shown');
    overlay.classList.remove('overlay--shown');
  }
});
