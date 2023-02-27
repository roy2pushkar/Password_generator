const inputSlider = document.querySelector("[dat-lengthSlider]");

const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");

const copyBtn = document.querySelector("[data-copy]");

const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("[#uppercase]");

const lowercaseCheck = document.querySelector("[#lowercase]");

const numbers = document.querySelector("[#numbers]");

const symbolsCheck = document.querySelector("[#symbols]");

const indicator = document.querySelector("[data-indicator]");

const generateBtn = document.querySelector("[.generateButton]");

const allCheckBox = document.querySelector("input[type=checkbox]");

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

//initially
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
//set strength circle color to gray

//set password length
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  //shadow - HW
}

function getRndInteger(min, max) {
  return Math.floor(math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getRndInteger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase() {
  return String.fromCharCode(getRndinteger(65, 91));
}

function generateSymbol() {
  const randNum = getRndInteger(0, symbols.length);
  return symbols.charAt(randNum);
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasSym = false;
  let hasNum = false;
  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasUpper || hasLower) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#0ff");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "failed";
  }

  //to make copy wala span visible
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

function shufflePassword() {
  //fisher yates method
  for (let i = array.length(); i > 0; i--) {
    const j = math.floor(math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  let str = "";
  array.forEach((el) => str + el);
  return str;
}

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if ((checkbox = checked)) checkCount++;
  });

  //special condition
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});

generateBtn.addEventListener("click", () => {
  if (checkCount == 0) {
    return;
  }

  if (password < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  // let's start the jouney to find new password
  console.log("Starting the Journey");
  //remove old password
  password = "";

  //let's put the stuff mentioned by checkboxes

  // if(uppercaseCheck.checked) {
  //     password += generateUpperCase();
  // }

  // if(lowercaseCheck.checked) {
  //     password += generateLowerCase();
  // }

  // if(numbersCheck.checked) {
  //     password += generateRandomNumber();
  // }

  // if(symbolsCheck.checked) {
  //     password += generateSymbol();
  // }

  let funcArr = [];

  if (uppercaseCheck.checked) {
    funcArr.push(generateUpperCase);
  }
  if (lowercaseCheck.checked) {
    funcArr.push(generateLowerCase);
  }
  if (numbersCheck.checked) {
    funcArr.push(generateRandomNumber);
  }
  if (symbolsCheck.checked) {
    funcArr.push(generateSymbol);
  }

  //compulsory addition
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  console.log("cCompulsory addition done");

  //remaining addition
  for (let i = 0; i < funcArr.length; i++) {
    let randIndex = getRndInteger(0, funcArr.length);
    console.log("randIndex" + randIndex);
    password += funcArr[randIndex]();
  }
  console.log("Remaining addition done");

  //shuffle the password
  password = shufflePassword(Array.from(password));
  console.log("Shuffling Done");

  //Show in UI
  passwordDisplay.value = password;
  console.log("UI addition Done");
  //calculate strength
  calcStrength();
});
