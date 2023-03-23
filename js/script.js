let $rangeYear = $(".slider-year");
let $rangeMonth = $(".slider-month");
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

sliderYear = $rangeYear.data("ionRangeSlider");
sliderMonth = $rangeMonth.data("ionRangeSlider");

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

  // формирование значения при сдвиге ползунка для левой границы
  fromYear = Math.floor(from / 12) + borderCount.getMin;
  fromMonth = (from % 12) + 1;
  starting = fromMonth < 10 ? "0" + fromMonth + "/" + fromYear : fromMonth + "/" + fromYear;
  $inputFrom.prop("value", starting);

  // формирование значения при сдвиге ползунка для правой границы
  toYear = Math.floor(to / 12) + borderCount.getMin;
  toMonth = (to % 12) + 1;
  ending = toMonth < 10 ? "0" + toMonth + "/" + toYear : toMonth + "/" + toYear;
  $inputTo.prop("value", ending);
}

// функция, которая пересчитывает данные при обновлении входных годов
function updateData() {
  finalList = [];
  listOfYears = [];
  starting();
}

// считываение данных из input`ов и построение нового слайдера
document.querySelector(".slider-settings").addEventListener("input", function (evt) {
  // считывание минимального года
  if (evt.target.className == "input-min") {
    updateData();
    if (borderCount.getMin > 1999 && borderCount.getMin < borderCount.getMax) {
      slidersUpdateFromInput();
    }
  }
  // считывание максимального года
  if (evt.target.className == "input-max") {
    updateData();
    if (borderCount.getMax < 2031 && borderCount.getMin < borderCount.getMax) {
      slidersUpdateFromInput();
    }
  }
  // считывание начальной даты
  if (evt.target.className == "input-from") {
    updateData();
    if (checkRestrictions()) {
      slidersUpdateFromInput();
    }
  }
  // считывание конечной даты
  if (evt.target.className == "input-to") {
    updateData();
    if (checkRestrictions()) {
      slidersUpdateFromInput();
    }
  }
});

// функция для обновления слайдеров при вводе данных из input`ов
function slidersUpdateFromInput() {
  sliderYear.update({
    values: finalList,
    from: borderCount.fromLeft,
    to: borderCount.fromRight,
  });
  sliderMonth.update({
    values: finalList,
    from: borderCount.fromLeft,
    to: borderCount.fromRight,
  });
}

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

// Прошу прощения, но не имею представления как сделать в опциях новое поле с флагом, которое будет меняться в зависимости от определенного слайдера, поэтому не могу объединить данные функции
// функция для обновления слайдера по месяцам при изменении первого
function updateMonthSlider(data) {
  let from = data.from;
  let to = data.to;
  sliderMonth.update({
    from: from,
    to: to,
  });
}

// функция для обновления слайдера по годам при изменении второго
function updateYearSlider(data) {
  let from = data.from;
  let to = data.to;
  sliderYear.update({
    from: from,
    to: to,
  });
}
