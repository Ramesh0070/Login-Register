const form = document.getElementById('validationForm')
const fullName = document.getElementById('fullName');
const age = document.getElementById('age');
const phoneNumber = document.getElementById('phoneNumber');
const email = document.getElementById('email');
const password = document.getElementById('password');

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
    const passwordValue = password.value.trim();

    if(fullName === ''){
        //show error and add error class
        setErrorFor(fullName,'This Input Field is Required')
    }else{
        setSuccessFor(fullName)
    }
    //for age
    if(age ===''){
        setErrorFor(age,'This Input Field is Required')
    }else{
        setSuccessFor(age)
    }
    //for phoneNumber
    if(phoneNumber ===''){
        setErrorFor(phoneNumber,'This Input Field is Required')
    }else{
        setSuccessFor(phoneNumber)
    }
    //foremail
    if(email ===''){
        setErrorFor(email,'This Input Field is Required')
    }else if(!isEmail(emailValue)){
        setErrorFor(email,'Email is not valid')
        
    }else{
        setSuccessFor(email)
    }
    if(password ===''){
        setErrorFor(password,'This Input Field is Required')
    }else{
        setSuccessFor(password)
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