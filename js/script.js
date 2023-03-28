let $rangeYear = $(".Slider-Year");
let $rangeMonth = $(".Slider-Month");
let $inputmin = $(".input-min");
let $inputmax = $(".input-max");
let $inputFrom = $(".input-from");
let $inputTo = $(".input-to");

let numberOfYears = 0;
let listOfMonth = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
let finalList = [];
let listOfYears = [];
let borderCount = {
  getMin: 0,
  getMax: 0,
  getTo: 0,
  getFrom: 0,
  getFromMM: 0,
  getFromYY: 0,
  getToMM: 0,
  getToYY: 0,
  fromLeft: 0,
  fromRight: 0,
};

let objectSlider = {
  hide_min_max: false,
  onStart: starting(),
  skin: "round",
  type: "double",
  from: borderCount.fromLeft,
  to: borderCount.fromRight,
  values: finalList,
  onChange: updateInputs,
  onFinish: updateMonthSlider,
};

// построение слайдера по годам
$rangeYear.ionRangeSlider(objectSlider);

// построение слайдера по месяцам
$rangeMonth.ionRangeSlider(
  objectSlider,
  (objectSlider.onStart = ""),
  (objectSlider.grid = true),
  (objectSlider.hide_min_max = true),
  (objectSlider.onFinish = updateYearSlider)
);

SliderYear = $rangeYear.data("ionRangeSlider");
SliderMonth = $rangeMonth.data("ionRangeSlider");

// начальная функция при запуске страницы
function starting() {
  getElementsFromInputs(); // получение данных из input`ов
  convertingInputNumbers(); // Преобразование входных значений

  for (let j = 0; j < numberOfYears; j++) {
    listOfYears[j] = borderCount.getMin + j;
  }

  finalList = listOfYears.flatMap((year) => listOfMonth.map((month) => `${month} ${year}`));

  borderCount.getFromMM = borderCount.getFromMM - 1;
  borderCount.fromLeft = borderCount.getFromMM + 12 * (borderCount.getFromYY - borderCount.getMin);
  borderCount.getToMM = borderCount.getToMM - 1;
  borderCount.fromRight = borderCount.getToMM + 12 * (borderCount.getToYY - borderCount.getMin);
}

// получение данных из input`ов
function getElementsFromInputs() {
  borderCount.getMin = document.getElementById("min").value;
  borderCount.getMax = document.getElementById("max").value;
  borderCount.getFrom = document.getElementById("from").value;
  borderCount.getTo = document.getElementById("to").value;
}

// преобразование чисел
function convertingInputNumbers() {
  borderCount.getMin = Number(borderCount.getMin);
  borderCount.getMax = Number(borderCount.getMax);
  numberOfYears = borderCount.getMax - borderCount.getMin;
  borderCount.getFromMM = borderCount.getFrom.substr(0, 2);
  borderCount.getFromYY = borderCount.getFrom.substr(3, 4);
  borderCount.getToMM = borderCount.getTo.substr(0, 2);
  borderCount.getToYY = borderCount.getTo.substr(3, 4);
  borderCount.getFromMM = Number(borderCount.getFromMM);
  borderCount.getFromYY = Number(borderCount.getFromYY);
  borderCount.getToMM = Number(borderCount.getToMM);
  borderCount.getToYY = Number(borderCount.getToYY);
}

function updateInputs(data) {
  from = data.from;
  to = data.to;
  let starting = ""; // переменная для вставления значения в начало
  let ending = ""; // переменная для вставления значения в конец
  let fromYear = 0;
  let fromMonth = 0;
  let toYear = 0;
  let toMonth = 0;

  // изменение input`ов у месяцев (формирование даты формата MM/YYYY)

  fromYear = Math.floor(from / 12) + borderCount.getMin; // формирование значения при сдвиге ползунка для левой границы
  fromMonth = (from % 12) + 1;
  if (fromMonth < 10) {
    starting = "0" + fromMonth + "/" + fromYear;
  } else {
    starting = fromMonth + "/" + fromYear;
  }
  $inputFrom.prop("value", starting);

  toYear = Math.floor(to / 12) + borderCount.getMin; // формирование значения при сдвиге ползунка для правой границы
  toMonth = (to % 12) + 1;
  if (toMonth < 10) {
    ending = "0" + toMonth + "/" + toYear;
  } else {
    ending = toMonth + "/" + toYear;
  }
  $inputTo.prop("value", ending);
}

// функция, которая пересчитывает данные при обновлении входных годов
function updateData() {
  finalList = [];
  listOfYears = [];
  starting();
}

// обновление слайдера при вводе минимального года
$inputmin.on("input", function () {
  updateData();

  if (borderCount.getMin > 1999 && borderCount.getMin < borderCount.getMax) {
    SliderYear.update({
      values: finalList,
      from: borderCount.fromLeft,
      to: borderCount.fromRight,
    });
    SliderMonth.update({
      values: finalList,
      from: borderCount.fromLeft,
      to: borderCount.fromRight,
    });
  }
});

// обновление слайдера при вводе максимального года
$inputmax.on("input", function () {
  updateData();

  if (borderCount.getMax < 2031 && borderCount.getMin < borderCount.getMax) {
    SliderYear.update({
      values: finalList,
      from: borderCount.fromLeft,
      to: borderCount.fromRight,
    });
    SliderMonth.update({
      values: finalList,
      from: borderCount.fromLeft,
      to: borderCount.fromRight,
    });
  }
});

// обновление слайдера при вводе начала
$inputFrom.on("input", function () {
  updateData();

  if (checkRestrictions()) {
    SliderYear.update({
      from: borderCount.fromLeft,
    });
    SliderMonth.update({
      from: borderCount.fromLeft,
    });
  }
});

// обновление слайдера при вводе конца
$inputTo.on("input", function () {
  updateData();

  if (checkRestrictions()) {
    SliderYear.update({
      to: borderCount.fromRight,
    });
    SliderMonth.update({
      to: borderCount.fromRight,
    });
  }
});

// проверка входных значений для построения слайдера
function checkRestrictions() {
  if (
    borderCount.getFromYY >= borderCount.getMin && // проверка, что год начала больше чем минимальный
    borderCount.getToYY <= borderCount.getMax && // проверка, что год конца меньше чем максимальный
    borderCount.getFromMM >= 0 && // проверка, что месяц начала больше 0
    borderCount.getFromMM < 12 && // проверка, что месяц начала меньше 13
    borderCount.getToMM >= 0 && // проверка, что месяц конца больше 0
    borderCount.getToMM < 12 // проверка, что месяц конца меньше 13
  ) {
    return true;
  }
}

// функция для обновления слайдера по месяцам при изменении первого
function updateMonthSlider(data) {
  from = data.from;
  to = data.to;
  SliderMonth.update({
    from: from,
    to: to,
  });
}

// функция для обновления слайдера по годам при изменении второго
function updateYearSlider(data) {
  from = data.from;
  to = data.to;
  SliderYear.update({
    from: from,
    to: to,
  });
}
