let btn = document.getElementById("year");
let btn2 = document.getElementById("mesc");
let year = document.getElementById("yearright");
let month = document.getElementById("monthright");
let grid = document.getElementsByClassName("irs-grid");

btn.addEventListener("click", function () {
  this.classList.remove("passive");
  this.classList.add("active");

  btn2.classList.remove("active");
  btn2.classList.add("passive");

  year.style.display = "block";
  month.style.display = "none";
});

btn2.addEventListener("click", function () {
  this.classList.remove("passive");
  this.classList.add("active");

  btn.classList.remove("active");
  btn.classList.add("passive");

  year.style.display = "none";
  month.style.display = "block";
});
