const inputAmount = document.querySelector("#bill-Amount");

const tipBtns = document.querySelectorAll(".tip-btn");
tipBtns.forEach((btn) => {
  btn.addEventListener("click", clickButtonHandler);
});

const customTipBtn = document.querySelector(".btn-custom");
const personCount = document.querySelector("#person-count");
const error = document.querySelector(".error");
const results = document.querySelectorAll(".results");
const btnReset = document.querySelector(".btn-reset");

customTipBtn.addEventListener("input", setCustomTipValue);

inputAmount.addEventListener("input", setBillAmount);
personCount.addEventListener("input", setPersonCount);
btnReset.addEventListener("click", reset);

let inputAmountValue = 0.0;
let tipValue = 0.15;
let personCountValue = 1;
let customTipBtnValue;

//limiting user to put digits as we desire
function validateFloat(s) {
  var rgx = /^[0-9]*\.?[0-9]*$/; //eg 22.22
  return s.match(rgx);
}

function validateInt(s) {
  var rgx1 = /^[0-9]*$/; //eg 22.22  //change this to one digit
  return s.match(rgx1);
}

function setBillAmount() {
  if (inputAmount.value.includes(",")) {
    inputAmount.value = inputAmount.value.replace(",", "."); //replacing , with . in input itself
  }
  if (!validateFloat(inputAmount.value)) {
    inputAmount.value = inputAmount.value.substring(
      0,
      inputAmount.value.length - 1
    ); //this will be true as long as it is an input as we desire(22.22) but as soon as it violates that (22.22a) it will show false and we will be left with this string (22.22f) so we will be performing that substring to cut that digit outk
    console.log(inputAmount.value);
  }

  inputAmountValue = parseFloat(inputAmount.value);
  console.log(inputAmountValue);
  calculate();
  //added by me here
}

function clickButtonHandler(event) {
  console.log("hello");
  tipBtns.forEach((btn) => {
    btn.classList.remove("btn-active");

    if (event.target.innerHTML == btn.innerHTML) {
      btn.classList.add("btn-active");
      console.log(event.target.innerHTML, btn.innerHTML);
      tipValue = parseFloat(btn.innerHTML) / 100; //parseFloat only passing the digits not percent so to get that we are dividing it by 100
    }
  });
  customTipBtn.value = "";
  calculate();
}

function setCustomTipValue() {
  /*if (customTipBtn.value.includes(",")) {
        console.log(customTipBtn.value)
        customTipBtn.value = customTipBtn.value.replace(",", ".")//replacing , with . in input itself
    }*/
  if (!validateInt(customTipBtn.value)) {
    customTipBtn.value = customTipBtn.value.substring(
      0,
      customTipBtn.value.length - 1
    ); //this will be true as long as it is an input as we desire(22.22) but as soon as it violates that (22.22a) it will show false and we will be left with this string (22.22f) so we will be performing that substring to cut that digit outk
  }

  tipValue = parseFloat(customTipBtn.value) / 100;

  tipBtns.forEach((btn) => {
    console.log("kkk");
    btn.classList.remove("btn-active");
  });

  if (customTipBtn.value !== "") {
    calculate();
  } else {
    tipBtns[2].click();
  }
}

function setPersonCount() {
  if (!validateInt(personCount.value)) {
    personCount.value = personCount.value.substring(
      0,
      personCount.value.length - 1
    ); //this will be true as long as it is an input as we desire(22.22) but as soon as it violates that (22.22a) it will show false and we will be left with this string (22.22f) so we will be performing that substring to cut that digit outk
  }

  personCountValue = parseFloat(personCount.value);

  error.classList.remove("showErrorMsg");
  if (personCountValue <= 0) {
    console.log("kkkk");
    error.classList.add("showErrorMsg");
  }
  calculate();
}

function calculate() {
  console.log(personCountValue);
  //using if here as in setpersoncount the event is input so it wont initiate unless we have written something on it
  if (personCountValue > 0) {
    let tipAmount = parseFloat(
      (inputAmountValue * tipValue) / personCountValue
    ).toFixed(2);
    let total = (
      (inputAmountValue * (tipValue + 1)) /
      personCountValue
    ).toFixed(2);

    results[0].innerHTML = tipAmount;
    results[1].innerHTML = total;
    //added by myself
    results.forEach((res) => {
      if (inputAmount.value === "") {
        res.innerHTML = 0;
      }
    });
  }
}

function reset() {
  inputAmount.value = "0.0";
  setBillAmount();
  tipBtns[2].click();
  personCount.value = "1";
  setPersonCount();
}

//limit user-input to 10 characters to avoid overlflowing
