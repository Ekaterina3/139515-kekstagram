'use strict';

var pictureFilters = document.querySelector('.filters');
pictureFilters.classList.add('hidden');

var picturesContainer = document.querySelector('.pictures');
var template = document.querySelector('#picture-template');
var templateContainer = 'content' in template ? template.content : template;

var IMAGE_LOAD_TIMEOUT = 10000;
var IMAGE_SIDE = 182;
var PICTURES_LOAD_URL = 'http://localhost:1507/api/pictures?callback=JSONPCallback';

var load = function(url, callback) {
  window.JSONPCallback = function(data) {
    callback(data);
  }

  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
};

var getPictureElement = function(image) {
  var pictureElement = templateContainer.querySelector('.picture').cloneNode(true);
  pictureElement.querySelector('.picture-likes').textContent = image.likes;
  pictureElement.querySelector('.picture-comments').textContent = image.comments;

  var pictureImage = new Image();

  pictureImage.onload = function(evt) {
    clearTimeout(loadingTimeout);

    var img = pictureElement.querySelector('img');

    img.src = pictureImage.src;
    img.setAttribute('width', IMAGE_SIDE);
    img.setAttribute('HEIGHT', IMAGE_SIDE);
  };

  pictureImage.onerror = function() {
    pictureElement.classList.add('picture-load-failure');
  };

  var loadingTimeout = setTimeout(function() {
    pictureElement.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  pictureImage.src = image.url;

  return pictureElement;
};

load(PICTURES_LOAD_URL, function(data) {
  var pictures = data;

  pictures.forEach(function(image) {
    picturesContainer.appendChild(getPictureElement(image));
  });
});

pictureFilters.classList.remove('hidden');


