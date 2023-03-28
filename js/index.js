let btn = document.getElementById("year");
let btn2 = document.getElementById("mesc");
let year = document.getElementById("yearright");
let month = document.getElementById("monthright");
let grid = document.getElementsByClassName("irs-grid");

// функция для переключения режима на года
btn.addEventListener("click", function () {
  this.classList.remove("passive");
  this.classList.add("active");

  btn2.classList.remove("active");
  btn2.classList.add("passive");

  year.style.display = "block";
  month.style.display = "none";
});

// функция для переключения режима на месяцы
btn2.addEventListener("click", function () {
  this.classList.remove("passive");
  this.classList.add("active");

  btn.classList.remove("active");
  btn.classList.add("passive");

  year.style.display = "none";
  month.style.display = "block";
});

let width = 0;

// функция для скрытия режима по месяцам при маленькой ширине экрана
$(window).resize(function () {
  width = $("body").innerWidth();
  if (width < 1320) {
    btn2.classList.remove("active");
    btn2.classList.add("passive");
    year.style.display = "block";
    month.style.display = "none";
    btn.classList.remove("passive");
    btn.classList.add("active");
  }
});
