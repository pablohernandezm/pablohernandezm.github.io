//Sections
const game = document.getElementById("game");
const mainMenu=document.getElementById("mainMenu");

//Game items
const ctrls = document.getElementById("controls");
const gc = document.getElementById("gameContainer");
const cv = document.getElementById("canvas");
const counter=document.getElementById("counter");
const kb = document.getElementById("keyboard");
let words = ["AUTO","CAMION","PlXEL","PANTALLA","FRUTA","NIÑOS","ESPACIO","TECLADO","AIRE","AVE","ZETA","SETA","HONGO","CELULAR","RAIZ", "ELEFANTE", "SUEÑO", "SOL", "LUNA", "MONEDA", "COLOR"];
let attp;
let wordstr;

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
let gameEnd=false;

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
        keybtn.addEventListener("click", ()=>{pressKey(keybtn)});
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
    draw();
}

function writeWord(){
    attp=6;
    counter.innerText=attp;
    word.innerHTML="";

    let wordn = Math.floor(Math.random()*words.length);
    wordstr = words[wordn];
    for(let i=0; i<wordstr.length; i++){
        let wC = document.createElement("p")
        let wordd = document.createElement("div");
        setAttr(wordd, {"class":"letter"});
        wC.innerText="\u00a0";
        wordd.appendChild(wC);
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
    draw();
    document.querySelectorAll(".usedKey").forEach(toggleKey);
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

function toggleKey(el){
    el.classList.toggle("usedKey");
}

document.onkeydown = function (e) {
    if(!gameEnd){
        let keys = kb.getElementsByClassName("key");
        let key = e.key.toUpperCase();
        for(let i=0; i<keys.length; i++){
            if(key==keys[i].value){
                pressKey(keys[i]);
            }
        }
    } 
};

function pressKey(el){
    let isIn=false;
    toggleKey(el);
    for(let i=0; i<wordstr.length; i++){
        if(wordstr[i]===el.value){
            let letters = word.getElementsByClassName("letter");
            letters[i].getElementsByTagName("p")[0].innerText=el.value;
            isIn=true;
            
            let win=true;
            for(let i=0; i<letters.length; i++){
                if(letters[i].getElementsByTagName("p")[0].innerText=="\u00a0"){
                    win=false;
                }
            }

            if(win){
                cAlert("¡Ganaste!", "Felicitaciones, has adivinado la palabra "+wordstr);
            }
        }
    }

    if(!isIn){
        attp--;
        counter.innerText=attp;
        draw();
    }

    if(attp<=0){
        cAlert("¡Has fallado!", "La palabra era "+wordstr);
    }
}

function cAlert(title, message){
    gameEnd=true;
    let cAdiv = document.createElement("div");
    cAdiv.setAttribute("id", "cAlertC");
    cAdiv.innerHTML='<div id=cAlert><div id="cAlertTitle">'+title+'</div><div id="cAlertMsg">'+message+'</div><input id="cAOk" type="button" value="Jugar de nuevo"></div>';
    document.body.appendChild(cAdiv);
    document.getElementById("cAOk").addEventListener("click", ()=>{
        document.body.removeChild(cAdiv);
        gameEnd=false;
        newGame();
    });
}

function draw(){
    let ctx = cv.getContext("2d");
    ctx.fillStyle="#556067";
    let h = cv.height-5;
    let w = cv.width-5;
    let pt=h*0.03;
    let rp = w*0.5;
    ctx.clearRect(0,0,w,h);

    ctx.fillRect(w*0.2,0, pt, h);//Vertical
    ctx.fillRect(w*0.2,0, w*0.3,pt);//Top-Horizontal
    ctx.fillRect(w*0.5, 0, pt, h*0.2);//Rope
    ctx.fillRect(w*0.1,h, w*0.4,pt);//Top-Horizontal
    if(attp<6){
        if (attp<6){
            ctx.fillRect(rp-((pt*6)/2), h*0.2, pt*6, pt*4)//head
        }

        if(attp<5){
            ctx.fillRect(rp-((pt*4)/2), h*0.2+pt*4, pt*4, pt*6)//body
        }

        if(attp<4){
            ctx.fillRect(rp-(pt*7), h*0.2+pt*4, pt*7, pt*3)//leftArm
        }

        if(attp<3){
            ctx.fillRect(rp+(pt*0.3), h*0.2+pt*4, pt*7, pt*3)//RightArm
        }

        if(attp<2){
            ctx.fillRect(rp-(pt*5.5), h*0.2+pt*9, pt*4, pt*4)//leftLeg
        }

        if(attp==0){
            ctx.fillRect(rp+(pt*1.3), h*0.2+pt*9, pt*4, pt*4)//RightLeg
        }
    }
}
