const calculatorDisplay =document.querySelector('h1');
const inputBtn = document.querySelectorAll('button');
const clearBtn =document.getElementById('clear-btn');


const calculate={
    "/":(fristNumber,secondNumber)=>fristNumber/secondNumber!=0? fristNumber/secondNumber : "error",
    "*":(fristNumber,secondNumber)=> fristNumber * secondNumber,
    "+":(fristNumber, secondNumber) => fristNumber + secondNumber,
    "-":(fristNumber, secondNumber) => fristNumber - secondNumber,
    "=":(fristNumber, secondNumber) => secondNumber
}

let fristValue =0;
let operatorValue ='';
let waitForNext =false;



function setNumberValue(number){
   if(waitForNext){
    calculatorDisplay.textContent=number;
    waitForNext=false;
   }else{
    const displayValue =calculatorDisplay.textContent;
    calculatorDisplay.textContent =displayValue ==='0'? number : displayValue+number;
   }
}
function callOperator(operator){
    const currenValue= Number(calculatorDisplay.textContent);
    if(operatorValue && waitForNext){
        operatorValue=operator;
        return;
    }
    if(!fristValue){
        fristValue=currenValue;
    }else{
        const result = calculate[operatorValue](fristValue,currenValue);
        calculatorDisplay.textContent=result;
        fristValue=result;
        if(fristValue ==="error"){
            resetAll();
        }
    }
    operatorValue=operator;
    waitForNext=true;
    
}
function adddecimal(){
    if(waitForNext) return;
    if(!calculatorDisplay.textContent.includes(".")){
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}
inputBtn.forEach((input)=>{
    //ปุ่มตัวเลข 0-9
    if(input.classList.length === 0){
        input.addEventListener('click',()=>setNumberValue(input.value));

    }else if(input.classList.contains("operator")){
        input.addEventListener('click',()=>callOperator(input.value));
    }else if(input.classList.contains("decimal")){
        input.addEventListener('click',()=>adddecimal());
    }
});
function resetAll(){
    fristValue=0;
    operatorValue='';
    waitForNext=false;
    calculatorDisplay.textContent='0';
}
clearBtn.addEventListener('click',()=>resetAll());