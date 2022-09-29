//Sections
const game = document.getElementById("game");
const mainMenu=document.getElementById("mainMenu");

//Game items
const ctrls = document.getElementById("controls");
const gc = document.getElementById("gameContainer");
const cv = document.createElement("canvas");
const counter=document.getElementById("counter");
const kb = document.getElementById("keyboard");
let words = ["AUTO","CAMION","PlXEL","PANTALLA","FRUTA","NIÑOS","ESPACIO","TECLADO","AIRE","AVE","ZETA","SETA","HONGO","CELULAR","RAIZ"];
let attp;

//Menu items
const mc = document.getElementById("menuContainer");
const menuBtn = document.createElement("input");
const nWBtn = document.createElement("input");
const nGBtn = document.createElement("input");
const word = document.getElementById("word");

menuBtn.addEventListener("click", menu);
nGBtn.addEventListener("click", newGame);
nWBtn.addEventListener("click", addWord);

//New words
const newWord = document.createElement("div");
const nwForm = document.createElement("form")
const newWordInput = document.createElement("input");
const newWordAdd = document.createElement("input");

let inGame=true;
init();

function init(){   
    writeWord();

    /*Setting menu items*/
    setAttr(menuBtn, {"type":"button", "value":"Menú"});
    setAttr(nGBtn, {"type":"button", "value":"Nuevo Juego"});
    setAttr(nWBtn, {"type":"button", "value":"Nueva Palabra"});
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
    
    setAttr(newWordInput, {"id":"nwI", "type":"text", "autocomplete":"off","aria-label":"Escribe la nueva palabra.", 
                            "pattern":"[a-zA-Z ñÑ]{2,8}", "title":"Solo létras de la A a la Z, de 2 a 8 carácteres", "placeholder":"Nueva palabra"});
    newWordInput.setAttribute("required", "");

    setAttr(newWordAdd, {"id":"nwAd","type":"submit", "value":"+"});
    setAttr(newWord, {"id":"nw"});
    nwForm.appendChild(newWordInput);
    nwForm.appendChild(newWordAdd);
    setAttr(nwForm, {"action":"javascript:addWord();"})
    newWord.appendChild(nwForm);
}

function writeWord(){
    attp=6;
    counter.innerText=attp;
    word.innerHTML="";

    let wordn = Math.floor(Math.random()*words.length);
    let wordstr = words[wordn];
    for(let i=0; i<wordstr.length; i++){
        let wordd = document.createElement("div");
        setAttr(wordd, {"class":"letter"});
        wordd.innerText=wordstr[i];
        word.appendChild(wordd);
    }
}

function newGame(){
    if(!inGame){
        toggleVista();
        inGame=true;
        mc.innerHTML="";
        mc.appendChild(menuBtn);
        mc.appendChild(nGBtn);
        ctrls.appendChild(mc);
    }
    writeWord();
}

function setAttr(el, attr){
    for (let key in attr) {
        el.setAttribute(key, attr[key]);
    }
}

function toggleVista(){
    game.classList.toggle("hidden");
    mainMenu.classList.toggle("hidden");
}

function menu(){
    toggleVista();    
    mc.removeChild(menuBtn);
    
    mainMenu.appendChild(newWord);
    mainMenu.appendChild(mc);
    inGame=false;
    
}

function addWord(){
    let wrd = newWordInput.value;
    wrd=wrd.toUpperCase();

    words.push(wrd);
    alert("Agregada: "+ wrd);
}
