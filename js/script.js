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

// Оживление ползунков фильтра цены
var slider = document.querySelector('.filters-form__slider');

if (slider) {
  var rangeWidth = 160;
  var sliderIndent = 20;
  var thumbHalfWidth = 10;
  var price = {
    min: 0,
    max: 34286
  };

  // Делаем тумблеры перетаскиваемыми при нажатии на них кнопки мыши
  var thumbs = slider.querySelectorAll('.filters-form__thumb');
  var isDragging = [false, false];

  thumbs[0].addEventListener('mousedown', function () {
    isDragging[0] = true;
  });
  thumbs[1].addEventListener('mousedown', function () {
    isDragging[1] = true;
  });
  slider.addEventListener('mouseup', function () {
    isDragging = [false, false];
  });

  // Для перетаскиваемого тумблера вычисляем новое значение цены и положение на слайдере
  var track = slider.querySelector('.filters-form__track');

  var rangeRatio = rangeWidth / price.max;
  var currentPrice = {
    min: 0,
    max: 30000
  };

  slider.addEventListener('mousemove', function (evt) {
    if (isDragging[0]) {
      currentPrice.min = Math.round(mousePosX(slider, evt) / rangeRatio);

      if (currentPrice.min < currentPrice.max && currentPrice.min >= 0) {
        thumbs[0].style.left = currentPrice.min * rangeRatio + sliderIndent + 'px';
        track.style.left = currentPrice.min * rangeRatio + thumbHalfWidth + 'px';
      }
    }
    if (isDragging[1]) {
      currentPrice.max = Math.round(mousePosX(slider, evt) / rangeRatio);

      if (currentPrice.max > currentPrice.min && currentPrice.max <= price.max) {
        thumbs[1].style.right = (price.max - currentPrice.max) * rangeRatio + sliderIndent + 'px';
        track.style.right = (price.max - currentPrice.max) * rangeRatio + thumbHalfWidth + 'px';
      }
    }
  });
}

// Инициализация интерактивной карты
function initMap() {
  var coordinates = {
    lat: 59.9387165,
    lng: 30.3225002
  };

  var map = new google.maps.Map(document.querySelector('.map'), {
    zoom: 16,
    center: coordinates
  });

  var icon = {
    path: 'M12 0a8 8 0 0 0-8 8c0 1.421.382 2.75 1.031 3.906.108.192.221.381.344.563L12 24l6.625-11.531c.102-.151.19-.311.281-.469l.063-.094A7.954 7.954 0 0 0 20 8a8 8 0 0 0-8-8zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z',
    fillColor: '#ee3643',
    fillOpacity: 1,
    anchor: new google.maps.Point(12, 24),
    strokeColor: '#b52933',
    strokeOpacity: 0.5,
    strokeWeight: 2,
    scale: 1.5
  };

  var marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    icon: icon
  });
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

// Вычисляем координату X курсора относительно полоски слайдера,
// учитывая отступы от краёв контейнера и ширину тумблеров
function mousePosX(elmt, evt) {
  var x = Math.round(evt.clientX - elmt.getBoundingClientRect().left) - (sliderIndent + thumbHalfWidth);

  if (x < 0) {
    x = 0;
  }
  if (x > rangeWidth) {
    x = rangeWidth;
  }

  return x;
}
