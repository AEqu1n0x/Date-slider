const btn = document.getElementById("year");
const btn2 = document.getElementById("mesc");
const year = document.getElementById("yearright");
const month = document.getElementById("monthright");

document.querySelector(".forswitch").addEventListener("click", function (evt) {
  if (evt.target.className == "switcher-label") {
    btn.classList.add("active");
    btn2.classList.remove("active");
    year.style.display = "block";
    month.style.display = "none";
  }
  if (evt.target.className == "low-screen switcher-label") {
    btn2.classList.add("active");
    btn.classList.remove("active");
    year.style.display = "none";
    month.style.display = "block";
  }
});

// функция для скрытия режима по месяцам при маленькой ширине экрана
const mediaSize = window.matchMedia("(max-width: 1320px)");
$(window).resize(function () {
  if (mediaSize.matches) {
    if (btn2.classList.contains("active")) {
      btn2.classList.remove("active");
      year.style.display = "block";
      month.style.display = "none";
      btn.classList.add("active");
    }
  }
});
