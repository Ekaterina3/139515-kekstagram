'use strict'

function getMessage(a, b) {
  var checkArrayA = Array.isArray(a);
  var checkArrayB = Array.isArray(b);

  if (typeof a === 'boolean') {
    if (a === true) {
      return ('Переданное GIF-изображение анимировано и содержит ' + b + ' кадров');
    } else {
      return('Переданное GIF-изображение не анимировано');
    }
  } else if (typeof a === 'number') {
      return('Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' атрибутов');
  } else if ((checkArrayA === true) && (checkArrayB === false)) {
    var amountOfRedPoints = 0;
    for (var i = 0; i < a.length; i++) {
      amountOfRedPoints += a[i];
    }
    return('Количество красных точек во всех строчках изображения: ' + amountOfRedPoints);
  } else if ((checkArrayA === true) && (checkArrayB === true)) {
    var artifactsSquare = 0;
    for (var i = 0; i < a.length; i++) {
      var j = 0;
      artifactsSquare += a[i] * b[j];
      j++;
    }
    return('Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей');
  } else {
    return('Переданы некорректные данные');
  }
}
