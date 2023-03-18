var btn = document.getElementById("year");
var btn2 = document.getElementById("mesc");
var year = document.getElementById("yearright");
var month = document.getElementById("monthright");


btn.addEventListener("click", function() {
    this.classList.remove("passive");
    this.classList.add("active");

    btn2.classList.remove("active");   // изменение класса у радио чекбокса 
    btn2.classList.add("passive");

    year.style.display ="block";
    month.style.display = "none";
});

btn2.addEventListener("click", function() {
    this.classList.remove("passive");
    this.classList.add("active");

    btn.classList.remove("active");
    btn.classList.add("passive");

    year.style.display ="none";
    month.style.display = "block";
});
