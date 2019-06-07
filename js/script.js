var contactsLink = document.querySelector('.contacts__button');

var modalContacts = document.querySelector('.modal--contacts');
var modalContactsClose = modalContacts.querySelector('.modal__close');

var overlay = document.querySelector('.overlay');

var contactsForm = modalContacts.querySelector('.contacts-form');
var userData = {
  name: document.getElementById('contacts-name'),
  email: document.getElementById('contacts-email'),
  message: document.getElementById('contacts-message')
};

var isStorageSupport = true;
var storage = {
  name: '',
  email: ''
};

// Проверка, работает ли localStorage
try {
  storage.name = localStorage.getItem('name');
  storage.email = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

// Оживление всплывающего окна формы обратной связи
contactsLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalShow(modalContacts);

  if (storage.name && storage.email) {
    userData.name.value = storage.name;
    userData.email.value = storage.email;
    userData.message.focus();
  } else {
    userData.name.focus();
  }
});

modalContactsClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalClose(modalContacts);
  modalContacts.classList.remove('modal--error');
});

// Сохранеие данных пользователя в localStorage
contactsForm.addEventListener('submit', function (evt) {
  if (!userData.name.value || !userData.email.value || !userData.message.value) {
    evt.preventDefault();
    modalContacts.classList.remove('modal--error');
    modalContacts.offsetWidth = modalContacts.offsetWidth;
    modalContacts.classList.add('modal--error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', userData.name.value);
      localStorage.setItem('email', userData.email.value);
    }
  }
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
      modalContacts.classList.remove('modal--error');
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
    modalContacts.classList.remove('modal--error');
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
