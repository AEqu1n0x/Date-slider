var $range = $(".js-range-slider"),
    $range2 = $(".js-range-slider2"),
    lang = "ru-RU",
    instance;

let cnt = 0;
let cntYY = 0;
let mesyac = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
let resultt = [];
let goda = [];

let getmin=0;
let getmax=0;
let getto = 0;
let getfrom = 0;
let getfromMM = 0;
let getfromYY= 0;
let gettoMM = 0;
let gettoYY= 0;
let fromleft = 0;
let fromright = 0;


function alerted(){

    getmin = document.getElementById('min').value;
    getmax = document.getElementById('max').value;
    cnt = getmax-getmin;

    getmin=Number(getmin);
    getmax=Number(getmax);

    getfrom = document.getElementById('from').value;
    getto = document.getElementById('to').value;
    getfromMM = getfrom.substr(0, 2);
    getfromYY = getfrom.substr(3,4)
    gettoMM = getto.substr(0, 2);
    gettoYY = getto.substr(3,4);
    console.log(gettoYY);

    getfromMM=Number(getfromMM);
    getfromYY=Number(getfromYY);  
    gettoMM=Number(gettoMM);
    gettoYY=Number(gettoYY);

    if (getmin > 1999 && getmin < getmax && getmax < 2031) {
    for (let j=0; j<cnt; j++) {
        goda[j]=getmin+j;
    }

    resultt = goda.flatMap(year => {
        return mesyac.map(word => {
        return `${word} ${year}`;
        });
        });

        if (getfromYY >= getmin && gettoYY <= getmax && getfromMM > 0 && getfromMM < 13 && gettoMM > 0 && gettoMM < 13) {
            getfromMM = getfromMM - 1 ;
            fromleft = getfromMM + 12 * (getfromYY-getmin);
            gettoMM = gettoMM - 1;
            fromright = gettoMM + 12 * (gettoYY - getmin);

            if (fromleft < fromright) {

                $range.ionRangeSlider({
                    hide_min_max: true,
                    skin: "round",
                    type: "double",
                    from: fromleft,
                    to:  fromright,
                    values: resultt,
                    grid: true,
                });
                $range2.ionRangeSlider({
                    skin: "round",
                    type: "double",
                    from: fromleft,
                    to: fromright ,
                    values: resultt,
                    grid: false,
                })
            }
            else {
                alert('Дата начала больше, чем конца');
            }                    
        }
        else {alert('Выход за пределы или введена неверная дата');}
 }
    else {alert('Выход за пределы годов')}

}