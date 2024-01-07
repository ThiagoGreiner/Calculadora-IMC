// IMC DATA
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
];

// Selecção de elemetos
const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const calcContainer = document.querySelector("#calc-container")
const resultContainer = document.querySelector("#result-container")

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span")

const backBtn = document.querySelector("#back-btn")

// Funções
function createTable(data) {
    data.forEach((item) => {
        //Criando a div
        const div = document.createElement("div");
        //Adicionando a classe a ela
        div.classList.add("table-data");

        //Criando a p e abaixo colocando o text de p igual a classificação do array data
        const classification = document.createElement("p");
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;
        
        //Incluindo os paragrafos na div
        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        //Adicionando a div dentro do #imc-table
        imcTable.appendChild(div);
    })
}


function cleanInputs() {
    //limpando os inputs
    heightInput.value = "";
    weightInput.value = "";
    //limpando os spans
    imcNumber.classList = "";
    imcInfo.classList = "";
}

function validDigits(text) {
    //Valindando dados(permitidos somente numero de 0 a 9 e virgulas, tudo fora isto sera substituidos por espaço)
    return text.replace(/[^0-9,]/g, "");
}

function calcImc(weight, height) {
    //Calculo do IMC com o toFixed para retornar apenas uma casa decimal
    const imc = (weight / (height * height)).toFixed(1);

    return imc
}

function showOrHideResults () {
    //Adicionando ou retirando a class hide
    calcContainer.classList.toggle("hide")
    resultContainer.classList.toggle("hide")
}

// Inicialização
createTable(data);

// Eventos
[heightInput, weightInput].forEach((el) => {
    //Gerando um evento que quando o input é ativado ele valida dos dados
    el.addEventListener("input", (e) => {
        const updatedValeu = validDigits(e.target.value);

        e.target.value = updatedValeu;
    })
})

calcBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    //Convertendo dados
    const weight = +weightInput.value.replace(",", ".");
    const height = +heightInput.value.replace(",", ".");

    if(!weight || !height) return;

    //Chamando função de calculo
    const imc = calcImc(weight, height);

    let info;

    //Validando se dado passado esta na tabela
    data.forEach((item) => {
        if(imc >= item.min && imc <= item.max) {
            info = item.info;
        }
    })

    if (!info) return;

    //Preenchendo os spans
    imcNumber.innerText = imc
    imcInfo.innerText = info

    //Validação com cor
    switch(info) {
        case "Magreza":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break;
        case "Normal":
            imcNumber.classList.add("good");
            imcInfo.classList.add("good");
            break;
        case "Sobrepeso":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break;
        case "Obesidade":
            imcNumber.classList.add("medium");
            imcInfo.classList.add("medium");
            break;
        case "Obesidade grave":
            imcNumber.classList.add("high");
            imcInfo.classList.add("high");
            break;
    }
 
    //Chamando função hide
    showOrHideResults();
})

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //Limpando os inputs
    cleanInputs();
})

backBtn.addEventListener("click", () =>{
    //Limpa inputs
    cleanInputs();
    //Retorna para tela inicial
    showOrHideResults()
})