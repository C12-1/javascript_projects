// DOM Elements - all the elements we need from HTML
const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.getElementById("strength-label");

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";



lengthSlider.addEventListener("input" , () => {
    lengthDisplay.textContent = lengthSlider.value;
})


generateButton.addEventListener("click" ,function  makePassword()  {

    
    
    const length = Number(lengthSlider.value);
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols){
        alert("Please select at least one char type.");
        return ;
    }
    const newPassword = createRandomPassword(length ,
         includeUppercase ,
          includeLowercase ,
           includeSymbols ,
            includeNumbers);
    passwordInput.value =  newPassword
})
function createRandomPassword(length ,includeUppercase ,includeLowercase ,includeSymbols ,includeNumbers){
    let allCharacters = "";
    if(includeUppercase) allCharacters += uppercaseLetters;
    if(includeLowercase) allCharacters += lowercaseLetters;
    if(includeSymbols) allCharacters += symbolCharacters;
    if(includeNumbers) allCharacters += numberCharacters;
    let password = "";
    for (let i = 0 ; i < length; i++){
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }
    return password
}