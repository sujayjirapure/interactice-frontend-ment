let nameInput = document.querySelector("#name");
let cardNumberInput = document.querySelector("#card-number");
let monthInput = document.querySelector("#month");
let yearInput = document.querySelector("#year");
let cvcInput = document.querySelector("#cvc");
let cardForm = document.querySelector(".card-form");
let success=document.querySelector(".success");
let cardName=document.querySelector(".card-name");
let cardNumber=document.querySelector(".card-num");
let cardDate=document.querySelector(".card-date");
let cardCvc=document.querySelector(".card-cvc");
let defaultValues={name:"Jane Appleseed",cardNumber:"0000 0000 0000 0000",cvc:"000",expireDate:{year:"00",month:"00"}};

let inputObj=defaultValues;
cardNumberInput.addEventListener("input", function (event) {
    let cardNumber = event.target.value;
    console.log(event.key);
    if (cardNumber.replaceAll(" ", "").length > 16 && event.key!="Backspace") {
        console.log(cardNumber.replaceAll(" ", ""));
        event.target.value = cardNumber.substring(0, cardNumber.length - 1);
    } else {
        let formatedCardNumber = formatCardNumber(cardNumber.replaceAll(" ", ""));
        event.target.value = formatedCardNumber;
    }

});

window.onload=()=>{
    updateCards();
}

document.querySelectorAll("input").forEach(input=>{
    console.log(input);
    input.addEventListener("keyup",()=>{
        inputObj={name:nameInput.value || defaultValues.name,cardNumber:cardNumberInput.value || defaultValues.cardNumber,cvc:cvcInput.value || defaultValues.cvc,expireDate:{year:yearInput.value || defaultValues.expireDate.year,month:monthInput.value || defaultValues.expireDate.month}}
        updateCards();
    });
});

function updateCards(){
    cardName.innerHTML=inputObj.name;
    cardNumber.innerHTML=inputObj.cardNumber;
    cardDate.innerHTML=`${inputObj.expireDate.month}/${inputObj.expireDate.year}`;
    cardCvc.innerHTML=inputObj.cvc;
}

cvcInput.addEventListener("input",(event)=>{
    let cvc=event.target.value;
    if(cvc.length>3){
        event.target.value = cvc.substring(0, cvc.length - 1);
    }
});

monthInput.addEventListener("input",(event)=>{
    let month=event.target.value;
    if(month.length>2){
        event.target.value = month.substring(0, month.length - 1);
    }
});

yearInput.addEventListener("input",(event)=>{
    let year=event.target.value;
    if(year.length>2){
        event.target.value = year.substring(0, year.length - 1);
    }
});


function formatCardNumber(number) {
    let numberArr = [];
    let currentPart = "";
    let numberToArr = number.toString().split("");
    number.toString().split("").forEach((letter, index) => {
        if ((index + 1) % 4 === 0 || (index + 1) === numberToArr.length) {
            currentPart += letter;
            numberArr.push(currentPart);
            currentPart = "";
        } else {
            currentPart += letter;
        }
    });
    return numberArr.join(" ");
}

function isNumericString(string) {
    if (typeof string === "string") {
        return !isNaN(string);
    }
}


function hideErrors(){
    document.querySelectorAll(".input.error").forEach(element=>{
        element.classList.remove("error");
    });

    document.querySelectorAll(".own-error").forEach(element=>{
        element.classList.remove("error");
    });
}


function validate() {
    let name = nameInput.value;
    let cardNumber = cardNumberInput.value.replaceAll(" ", "");
    let cvc=cvcInput.value;
    let year=yearInput.value;
    let month=monthInput.value;
    hideErrors();
    let errors=false;
    if(!name){
        document.querySelector("#name-input .error").innerHTML = "Name is required";
        document.querySelector("#name-input").classList.add("error");
        errors=true;
    }

    if (!cardNumber) {
        document.querySelector("#card-number-input .error").innerHTML = "Card number is required";
        document.querySelector("#card-number-input").classList.add("error");
        errors=true;
    }else if (!isNumericString(cardNumber)) {
        document.querySelector("#card-number-input .error").innerHTML = "Wrong format, must be a number";
        document.querySelector("#card-number-input").classList.add("error");
        errors=true;
    }else if (cardNumber.length != 16) {
        document.querySelector("#card-number-input .error").innerHTML = "Card number must contain exactly 16 digits";
        document.querySelector("#card-number-input").classList.add("error");
        errors=true;
    }

    if(!cvc){
        document.querySelector("#cvc-input .error").innerHTML = "Can't be blank";
        document.querySelector("#cvc-input").classList.add("error");
        errors=true;
    }else if(!isNumericString(cvc)){
        document.querySelector("#cvc-input .error").innerHTML = "CVC must be a number";
        document.querySelector("#cvc-input").classList.add("error");
        errors=true;
    }else if(cvc.length!=3){
        document.querySelector("#cvc-input .error").innerHTML = "CVC must contain exactly 3 digits";
        document.querySelector("#cvc-input").classList.add("error");
        errors=true;
    }

    if(!year){
        yearInput.classList.add("own-error");
        document.querySelector("#exp-date-input .error").innerHTML="Can't be blank";
        document.querySelector("#exp-date-input").classList.add("error");
        errors=true;
    }

    if(!month){
        monthInput.classList.add("own-error");
        document.querySelector("#exp-date-input .error").innerHTML="Can't be blank";
        document.querySelector("#exp-date-input").classList.add("error");
        errors=true;
    }

    if(!errors){
        console.table({name,cardNumber,cvc,expireDate:{year,month}})
        cardForm.classList.remove("active");
        success.classList.add("active");
    }
}

cardForm.onsubmit=(event)=>{
    event.preventDefault();
    validate();
}