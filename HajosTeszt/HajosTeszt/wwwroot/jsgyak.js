function elsofeladat() {
    for (var i = 0; i < 10; i++) {
        var ujdiv = document.createElement("div");
        ujdiv.classList.add("elsofeladatsor");
        ujdiv.innerText = i + 1;
        document.getElementById("elsoD").appendChild(ujdiv);
    }
}
function fakt(n) {
    let er;
    if (n === 0 || n === 1) {
        er = 1;
    } else {
        er = n * fakt(n - 1);
    }
    return er;
}
function pascal(i, j) {
    let er = fakt(i) / (fakt(j) * fakt(i - j));
    return er;
}
function masodikfeladat() {
    for (var i = 0; i < 10; i++) {
        var sor = document.createElement("div");
        sor.classList.add("sor");
        document.getElementById("masodikD").appendChild(sor);
        for (var j = 0; j <= i; j++) {
            var elem = document.createElement("div");
            elem.classList.add("elem");
            sor.appendChild(elem);
            elem.innerText = pascal(i, j);
        }
    }
}