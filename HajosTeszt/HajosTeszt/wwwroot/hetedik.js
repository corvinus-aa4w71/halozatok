var kerdes;
var akt_kérdés = 1;
/*function letöltés() {
    fetch('/question.json')
        .then(r => r.json())
        .then(d => letöltésbefejeződött(d));
}
function letöltésbefejeződött(data) {
    console.log("sikereses letöltés");
    console.log(data);
    kerdesek = data;
    
    kérdésMegjelenítés(akt_kérdés);
    }

function kérdésMegjelenítés(kérdés) {
    var kerdes = document.getElementById("kerdes");
    var valasz1 = document.getElementById("valasz1");
    var valasz2 = document.getElementById("valasz2");
    var valasz3 = document.getElementById("valasz3");
    var kep = document.getElementById("kep");
    kerdes.innerHTML = kerdesek[kérdés].questionText;
    valasz1.innerHTML = kerdesek[kérdés].answer1;
    valasz2.innerHTML = kerdesek[kérdés].answer2;
    valasz3.innerHTML = kerdesek[kérdés].answer3;
    kep.setAttribute("src", "https://szoft1.comeback.hu/hajo/" + kerdesek[0].image)
}*/

/*fetch('/questions/4')
    .then(response => response.json())
    .then(data => kérdésMegjelenítés(data)
    );*/

function kérdésMegjelenítés(kérdés) {
    document.getElementById("kep").onerror = "";
    console.log(kérdés);
    document.getElementById("kerdes").innerText = kérdés.questionText;
    document.getElementById("valasz1").innerText = kérdés.answer1;
    document.getElementById("valasz2").innerText = kérdés.answer2;
    document.getElementById("valasz3").innerText = kérdés.answer3;
    document.getElementById("kep").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    if (kérdés.image == "") document.getElementById("kep").onerror = "this.style.display='none'";
    kerdes = kérdés;
}

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}  

function előre() {
    fetch(`/questions/${akt_kérdés + 1}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                akt_kérdés++;
            }
        })
    /*if (akt_kérdés + 1 < kerdesek.length) {
        akt_kérdés = akt_kérdés + 1;
    } else {
        akt_kérdés = 1;
    }*/
    kérdésBetöltés(akt_kérdés);
    töröl();
}
function vissza() {
    fetch(`/questions/${akt_kérdés - 1}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                akt_kérdés--;
            }
        })
    /*if (akt_kérdés - 1 < 0) {
        akt_kérdés = kerdesek.length - 1;
    } else {

        akt_kérdés = akt_kérdés - 1;
    }*/
    kérdésBetöltés(akt_kérdés);
    töröl();
}
function valasz() {
    let v1 = document.getElementById("valasz1");
    let v2 = document.getElementById("valasz2");
    let v3 = document.getElementById("valasz3");
    v1.classList.remove("kattinthato");
    v2.classList.remove("kattinthato");
    v3.classList.remove("kattinthato");
    if (kerdes.correctAnswer == 1) {
        v1.classList.add("helyes");
        v2.classList.add("helytelen");
        v3.classList.add("helytelen");
    }
    if (kerdes.correctAnswer == 2) {
        v2.classList.add("helyes");
        v1.classList.add("helytelen");
        v3.classList.add("helytelen");
    }
    if (kerdes.correctAnswer == 3) {
        v3.classList.add("helyes");
        v2.classList.add("helytelen");
        v1.classList.add("helytelen");
    }
}
function töröl() {

    let v1 = document.getElementById("valasz1");
    let v2 = document.getElementById("valasz2");
    let v3 = document.getElementById("valasz3");
    v1.classList.add("kattinthato");
    v2.classList.add("kattinthato");
    v3.classList.add("kattinthato");
    v1.classList.remove("helyes");
    v1.classList.remove("helytelen");
    v2.classList.remove("helyes");
    v2.classList.remove("helytelen");
    v3.classList.remove("helyes");
    v3.classList.remove("helytelen");
}

/*window.onload = letöltés();*/
window.onload = kérdésBetöltés(akt_kérdés);