//Game items
const gc = document.getElementById("gameContainer");
const cv = document.createElement("canvas");
const counter=document.getElementById("counter");
const kb = document.getElementById("keyboard");
let attp;

//Menu items
const mc = document.getElementById("menuContainer");
const menuBtn = document.createElement("input");
const nGBtn = document.createElement("input");

init();

function init(){
    /*Setting Game items */
    attp=6;
    counter.innerText=attp;

    /*Setting menu items*/
    setAttr(menuBtn, {"type":"button", "value":"Menú"});
    setAttr(nGBtn, {"type":"button", "value":"Nuevo Juego"});
    mc.appendChild(menuBtn);
    mc.appendChild(nGBtn);

    /*Init keyboard */
    let keys = ["Q","W","E","R","T","Y","U","I","O","P",/*10*/
                "A","S","D","F","G","H","J","K","L","Ñ",/*10*/
                "Z","X","C","V","B","N","M"]/*7*/;

    // for(let i; i<keys.length; i++){
        
    // }
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
