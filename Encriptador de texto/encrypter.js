/*Get text areas*/
let inputT = document.getElementById("input");
let outputT = getOutputT();

/*Get buttons*/
let encryptBtn = document.getElementById("encryptBtn");
let decryptBtn = document.getElementById("decryptBtn");
let copyBtn =getCopyBtn();

/*Get containers*/
let outputC = document.getElementById("output-container");
let vInput = getVInput()?getVInput() : getNewVInput();

/*Set events*/
encryptBtn.addEventListener("click", ()=>{transformText("encrypt")});
decryptBtn.addEventListener("click", ()=>{transformText("decrypt")});
inputT.ondblclick=()=>{inputT.value=""};

/*Events*/
function transformText(order){
    if(inputT){
        let text = inputT.value;

        if(text===""){
            if(!getVInput()){
                copyBtn.remove();
                outputT.remove();
                outputC.appendChild(vInput);
            }
        }

        else {
            text = text.toLowerCase();

            let words = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];

            if (order === "encrypt") {
                for (let i = 0; i < words.length; i++) {
                    text = text.replaceAll(words[i][0], words[i][1]);
                }
            } else if (order === "decrypt") {
                for (let i = 0; i < words.length; i++) {
                    text = text.replaceAll(words[i][1], words[i][0]);
                }
            }

            outputT.value=text;

            if(vInput){
                vInput.remove();
                outputC.appendChild(outputT);
                outputC.appendChild(copyBtn);
            }
        }


    }
}

function copy(){
    if(outputT && outputT.value!==""){
        outputT.select();
        outputT.setSelectionRange(0, 999999);
        navigator.clipboard.writeText(outputT.value).then(function (){
            console.log("Texto copiado con éxito");
        }, function (err){
            console.error("Surgieron problemas al intentar copiar el texto: ", err);
        });

        copyBtn.value="Hecho";
        setTimeout(()=>{copyBtn.value="Copiar"}, 700);
    }
}

/*More functions*/
function getCopyBtn(){
    let copyBtn = document.getElementById("copyBtn");

    if(!copyBtn){
        copyBtn = document.createElement("input");
        copyBtn.id="copyBtn";
        copyBtn.type= "button";
        copyBtn.value= "copiar";
    }

    copyBtn.addEventListener("click", ()=>{copy()});
    return copyBtn;
}

function getOutputT(){
    let outputT=document.getElementById("output");

    if(!outputT){
        outputT = document.createElement("textarea");
        outputT.id="output";
        outputT.readOnly=true;
        outputT.className="transparent"
    }
    return outputT;
}

function getVInput(){
    return (document.getElementById("voidInput"));
}

function getNewVInput(){
    let vInput = document.createElement("div");
    let div = document.createElement("div");
    let img = document.createElement("img");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");

    vInput.id="voidInput";
    img.src="img/undraw_loading_re_5axr.svg";
    img.alt="Esperando por el texto.";
    h2.textContent="Ningún mensaje fue encontrado";
    p.textContent="Ingrese un texto para encriptar/desencriptar";

    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(p)
    vInput.appendChild(div);

    return vInput;
}