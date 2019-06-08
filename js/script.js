'use strict';

// Оживление всплывающего окна формы обратной связи
var contactsLink = document.querySelector('.contacts__button');

var modalContacts = document.querySelector('.modal--contacts');

if (modalContacts) {
  var modalContactsClose = modalContacts.querySelector('.modal__close');

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

  // Появление всплывающего окна
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

  // Закрытие всплывающего окна
  modalContactsClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalClose();
  });

  // Сохранеие данных пользователя в localStorage
  contactsForm.addEventListener('submit', function (evt) {
    if (!userData.name.value || !userData.email.value || !userData.message.value) {
      evt.preventDefault();
      modalContacts.classList.remove('modal--error');
      void modalContacts.offsetWidth;
      modalContacts.classList.add('modal--error');

      if (!userData.name.value) {
        userData.name.focus();
      } else if (!userData.email.value) {
        userData.email.focus();
      } else {
        userData.message.focus();
      }
    } else if (isStorageSupport) {
      localStorage.setItem('name', userData.name.value);
      localStorage.setItem('email', userData.email.value);
    }
  });
}

// Оживление всплывающего окна интерактивной карты
var mapLink = document.querySelector('.contacts__map-image');

var modalMap = document.querySelector('.modal--map');

if (modalMap) {
  var modalMapClose = modalMap.querySelector('.modal__close');

  mapLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalShow(modalMap);
  });

  modalMapClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalClose();
  });
}

// Оживление всплывающего окна добавления товара в корзину
// и счётчиков корзины и закладок в шапке
var cartButtons = document.querySelectorAll('.button--buy');
var bookmarksButtons = document.querySelectorAll('.button--bookmarks');

var cartCounter = document.querySelector('.header__button--cart');
var bookmarksCounter = document.querySelector('.header__button--bookmarks');

var modalCart = document.querySelector('.modal--cart');

if (modalCart) {
  var modalCartClose = modalCart.querySelector('.modal__close');

  var addBuyClickHandler = function (buyButton) {
    buyButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      modalShow(modalCart);
      increaseCounter(cartCounter);

      if (!cartCounter.classList.contains('header__button--full')) {
        cartCounter.classList.add('header__button--full');
      }
    });
  };

  var addBookmarksClickHandler = function (bookmarksButton) {
    bookmarksButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      increaseCounter(bookmarksCounter);

      if (!bookmarksCounter.classList.contains('header__button--full')) {
        bookmarksCounter.classList.add('header__button--full');
      }
    });
  };

  for (var i = 0; i < cartButtons.length; i++) {
    addBuyClickHandler(cartButtons[i]);
    addBookmarksClickHandler(bookmarksButtons[i]);
  }

  modalCartClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalClose();
  });
}

// Закрытие всплывающего окна по нажатию Esc
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    modalClose();
  }
});

// Закрытие всплывающего окна по клику вне окна
var overlay = document.querySelector('.overlay');

overlay.addEventListener('click', function () {
  modalClose();
});

// Оживление слайдера «Сервисы»
var serviceTabs = document.querySelectorAll('.tabs__selector');
var serviceSlides = document.querySelectorAll('.tabs__item');

var serviceTabCurrent = document.querySelector('.tabs__selector--current');
var serviceSlideCurrent = document.querySelector('.tabs__item--current');

var addTabClickHandler = function (sliderTab, slide) {
  sliderTab.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (sliderTab !== serviceTabCurrent) {
      serviceTabCurrent.classList.remove('tabs__selector--current');
      serviceSlideCurrent.classList.remove('tabs__item--current');

      sliderTab.classList.add('tabs__selector--current');
      slide.classList.add('tabs__item--current');

      serviceTabCurrent = sliderTab;
      serviceSlideCurrent = slide;
    }
  });
};

for (var i = 0; i < serviceTabs.length; i++) {
  addTabClickHandler(serviceTabs[i], serviceSlides[i]);
}

// Появление всплывающего окна
function modalShow(elmt) {
  elmt.classList.add('modal--shown');
  overlay.classList.add('overlay--shown');
}

// Закрытие всплывающего окна
function modalClose() {
  var modalShown = document.querySelector('.modal--shown');

  if (modalShown) {
    modalShown.classList.remove('modal--shown');
    overlay.classList.remove('overlay--shown');

    if (modalShown.classList.contains('modal--error')) {
      modalShown.classList.remove('modal--error');
    }
  }
}

// Увеличение счётчика на кнопке
function increaseCounter(btn) {
  var spacePosition = btn.textContent.indexOf(' ');
  var btnCounter = btn.textContent.slice(spacePosition++);

  btn.textContent = btn.textContent.slice(0, -(btnCounter.length - 1));
  btnCounter = Number(btnCounter) + 1;
  btn.textContent += btnCounter;
}
