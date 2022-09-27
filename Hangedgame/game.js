//Game items
const gc = document.getElementById("gameContainer");
const cv = document.createElement("canvas");
const counter=document.getElementById("counter");
const kb = document.getElementById("keyboard");
let words = ["AUTO","CAMION","PlXEL","PANTALLA","FRUTA","NIÑOS","ESPACIO","TECLADO","AIRE","AVE","ZETA","SETA","HONGO","CELULAR","RAIZ"];
let attp;

//Menu items
const mc = document.getElementById("menuContainer");
const menuBtn = document.createElement("input");
const nGBtn = document.createElement("input");
const word = document.getElementById("word");

init();

function init(){
    /*Setting Game items */
    attp=6;
    counter.innerText=attp;
    let wordn = Math.floor(Math.random()*words.length);
    let wordstr = words[wordn];
    for(let i=0; i<wordstr.length; i++){
        let wordd = document.createElement("div");
        setAttr(wordd, {"class":"letter"});
        wordd.innerText=wordstr[i];
        word.appendChild(wordd);

    }



    /*Setting menu items*/
    setAttr(menuBtn, {"type":"button", "value":"Menú"});
    setAttr(nGBtn, {"type":"button", "value":"Nuevo Juego"});
    mc.appendChild(menuBtn);
    mc.appendChild(nGBtn);

    /*Init keyboard */
    let keys = ["Q","W","E","R","T","Y","U","I","O","P",/*10*/
                "A","S","D","F","G","H","J","K","L","Ñ",/*10*/
                "Z","X","C","V","B","N","M"]/*7*/;

    keys.forEach(e => {
        let keybtn = document.createElement("input");
        setAttr(keybtn, {"type":"button", "class":"key", "value":e});
        kb.appendChild(keybtn);
    });
    
}

function setAttr(el, attr){
    for (let key in attr) {
        el.setAttribute(key, attr[key]);
    }
}