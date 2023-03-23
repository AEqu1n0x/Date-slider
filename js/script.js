let $range = $(".js-range-slider");
let $range2 = $(".js-range-slider2");

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

function alerted() {
  getElementsFromInputs(); // получение данных из input`ов
  convertingInputNumbers(); // Преобразование входных значений

  if (borderCount.getMin > 1999 && borderCount.getMin < borderCount.getMax && borderCount.getMax < 2031) {
    for (let j = 0; j < numberOfYears; j++) {
      listOfYears[j] = borderCount.getMin + j;
    }

    finalList = listOfYears.flatMap((year) => listOfMonth.map((month) => `${month} ${year}`));

    if (checkRestrictions()) {
      borderCount.getFromMM = borderCount.getFromMM - 1;
      borderCount.fromLeft = borderCount.getFromMM + 12 * (borderCount.getFromYY - borderCount.getMin);
      borderCount.getToMM = borderCount.getToMM - 1;
      borderCount.fromRight = borderCount.getToMM + 12 * (borderCount.getToYY - borderCount.getMin);

      if (borderCount.fromLeft < borderCount.fromRight) {
        $range.ionRangeSlider({
          hide_min_max: true,
          skin: "round",
          type: "double",
          from: borderCount.fromLeft,
          to: borderCount.fromRight,
          values: finalList,
          grid: true,
        });
        $range2.ionRangeSlider({
          skin: "round",
          type: "double",
          from: borderCount.fromLeft,
          to: borderCount.fromRight,
          values: finalList,
          grid: false,
        });
      } else {
        alert("Дата начала больше, чем конца");
      }
    } else {
      alert("Выход за пределы или введена неверная дата");
    }
  } else {
    alert("Выход за пределы годов");
  }
}

function checkRestrictions() {
  if (
    // проверка входных значений для построения слайдера
    borderCount.getFromYY >= borderCount.getMin && // проверка, что год начала больше чем минимальный
    borderCount.getToYY <= borderCount.getMax && // проверка, что год конца меньше чем максимальный
    borderCount.getFromMM > 0 && // проверка, что месяц начала больше 0
    borderCount.getFromMM < 13 && // проверка, что месяц начала меньше 13
    borderCount.getToMM > 0 && // проверка, что месяц конца больше 0
    borderCount.getToMM < 13 // проверка, что месяц конца меньше 13
  ) {
    return true;
  }
}

function getElementsFromInputs() {
  borderCount.getMin = document.getElementById("min").value;
  borderCount.getMax = document.getElementById("max").value;
  borderCount.getFrom = document.getElementById("from").value;
  borderCount.getTo = document.getElementById("to").value;
}

function convertingInputNumbers() {
  numberOfYears = borderCount.getMax - borderCount.getMin;
  borderCount.getMin = Number(borderCount.getMin);
  borderCount.getMax = Number(borderCount.getMax);
  borderCount.getFromMM = borderCount.getFrom.substr(0, 2);
  borderCount.getFromYY = borderCount.getFrom.substr(3, 4);
  borderCount.getToMM = borderCount.getTo.substr(0, 2);
  borderCount.getToYY = borderCount.getTo.substr(3, 4);
  borderCount.getFromMM = Number(borderCount.getFromMM);
  borderCount.getFromYY = Number(borderCount.getFromYY);
  borderCount.getToMM = Number(borderCount.getToMM);
  borderCount.getToYY = Number(borderCount.getToYY);
}
