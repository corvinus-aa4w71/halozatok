﻿var akt_kérdés = 1;
var timeoutHandler;
var hotList = [];           
var questionsInHotList = 3; 
var displayedQuestion;      
var numberOfQuestions;      
var nextQuestion = 1;

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

function kérdésMegjelenítés() {
    document.getElementById("kep").onerror = "";
    let kérdés = hotList[displayedQuestion].question
    console.log(kérdés);
    document.getElementById("kerdes").innerText = kérdés.questionText;
    document.getElementById("valasz1").innerText = kérdés.answer1;
    document.getElementById("valasz2").innerText = kérdés.answer2;
    document.getElementById("valasz3").innerText = kérdés.answer3;
    document.getElementById("kep").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    if (kérdés.image == "") document.getElementById("kep").onerror = "this.style.display='none'";
}


    function kérdésBetöltés(questionNumber, destination) {
        fetch(`/questions/${questionNumber}`)
            .then(
                result => {
                    if (!result.ok) {
                        console.error(`Hibás letöltés: ${response.status}`)
                    }
                    else {
                        return result.json()
                    }
                }
            )
            .then(
                q => {
                    hotList[destination].question = q;
                    hotList[destination].goodAnswers = 0;
                    console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`);
                    if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                        displayedQuestion = 0;
                        kérdésMegjelenítés();
                    }
                }
            );
}

function init() {

        
    if (localStorage.getItem("hotList")){
        hotList = JSON.parse(localStorage.getItem("hotList"));
    }
    if (localStorage.getItem("displayedQuestion")){
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
    }
    if (localStorage.getItem("nextQuestion")){
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
    }

    //Első kérdések letöltése
    if (hotList.length == 0) {
        for (var i = 0; i < questionsInHotList; i++) {
            let q = {
                question: {},
                goodAnswers: 0
            }
            hotList[i] = q;
        }
        for (var i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    }
    else {
        kérdésMegjelenítés();
    }
}

function előre() {
    if (timeoutHandler != null) {
        clearTimeout(timeoutHandler);
        document.getElementById("valasz1").style.pointerEvents = auto;
        document.getElementById("valasz2").style.pointerEvents = auto;
        document.getElementById("valasz3").style.pointerEvents = auto;
    }    
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
    töröl();
}
function vissza() {
    if (timeoutHandler != null) {
        clearTimeout(timeoutHandler);
        document.getElementById("valasz1").style.pointerEvents = auto;
        document.getElementById("valasz2").style.pointerEvents = auto;
        document.getElementById("valasz3").style.pointerEvents = auto;
    }
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionsInHotList - 1;
    kérdésMegjelenítés()
    töröl();
}
function valasz(n) {
    let v1 = document.getElementById("valasz1");
    let v2 = document.getElementById("valasz2");
    let v3 = document.getElementById("valasz3");
    v1.classList.remove("kattinthato");
    v2.classList.remove("kattinthato");
    v3.classList.remove("kattinthato");
    if (hotList[displayedQuestion].correctAnswer == 1) {
        v1.classList.add("helyes");
        v2.classList.add("helytelen");
        v3.classList.add("helytelen");
    }
    if (hotList[displayedQuestion].correctAnswer == 2) {
        v2.classList.add("helyes");
        v1.classList.add("helytelen");
        v3.classList.add("helytelen");
    }
    if (hotList[displayedQuestion].correctAnswer == 3) {
        v3.classList.add("helyes");
        v2.classList.add("helytelen");
        v1.classList.add("helytelen");
    }
    v1.style.pointerEvents = "none";
    v2.style.pointerEvents = "none";
    v3.style.pointerEvents = "none";
    timeoutHandler = setTimeout(előre(), 3000);
    
    if (n == hotList[displayedQuestion].correctAnswer) {
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion)
            if (nextQuestion == numberOfQuestions) return;
            else nextQuestion++;
        }
    }
    else {
        hotList[displayedQuestion].goodAnswers = 0;
    }
    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion",displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);

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
/*window.onload = kérdésBetöltés(akt_kérdés);*/
window.onload = init();
