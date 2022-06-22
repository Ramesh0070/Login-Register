const form = document.getElementById('validateForm')
const fullName = document.getElementById('fullName');
const age = document.getElementById('age');
const phoneNumber = document.getElementById('phoneNumber');
const email = document.getElementById('email');
const newPassword = document.getElementById('password');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    checkInputs();
})

function checkInputs(){
    //get the value from teh inputs 
    const fullNameValue = fullName.value.trim();
    const ageValue = age.value.trim();
    const phoneNumberValue = phoneNumber.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = newPassword.value.trim();

    if(fullNameValue === ''){
        //show error and add error class
        setErrorFor(fullName,'This Input Field is Required')
    }else{
        setSuccessFor(fullName)
    }
    //for age
    if(ageValue ===''){
        setErrorFor(age,'This Input Field is Required')
    }else{
        setSuccessFor(age)
    }
    //for phoneNumber
    if(phoneNumberValue ===''){
        setErrorFor(phoneNumber,'This Input Field is Required')
    }else{
        setSuccessFor(phoneNumber)
    }
    //foremail
    if(emailValue ===''){
        setErrorFor(email,'This Input Field is Required')
    }else if(!isEmail(emailValue)){
        setErrorFor(email,'Email is not valid')
    }else{
        setSuccessFor(email)
    }
    if(passwordValue ===''){
        setErrorFor(newPassword,'This Input Field is Required')
    }else{
        setSuccessFor(newPassword)
    }
}

function setErrorFor(input,message){
    const formGroup = input.parentElement; //.form-group
    const small = formGroup.querySelector('small');

    //add error message inside small
    small.innerText = message

    //add error class
    formGroup.className = 'form-group error';
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-group success';
}

function isEmail(email){
     return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

