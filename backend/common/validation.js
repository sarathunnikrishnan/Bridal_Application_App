

function validateStr(key, value) {
    let namePattern = /^[a-zA-Z]{3,10}$/;
    if (value == '') {
        return `Please fill your ${key}`
    }
    if (value.length <= 2) {
        return `Minimum Three Charecters required for ${key}`
    } else if (value.length >= 10) {
        return `Maximum Ten Charecters required for ${key}`
    }
    if (!namePattern.test(value)) {
        return `${key} is not correct format`
    }
    return "";
}

function validateEmail(key, value){
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
     if(!emailPattern.test(value)){
        return `Please Enter Valid ${key}`
     }
     return '';
}

function validatePassword (key, value){
    const password = value;
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[@$!%*?&#]/.test(password);

    if(password.length !== minLength){
        return `${key} Must Be ${minLength} letters`;
    }
    if(!hasUpperCase){
        return `${key} must be contain at least One upper Case Letter`;
    }
    if(!hasLowerCase){
        return `${key} must be contain at least One Lower Case Letter`;
    }
    if(!hasNumbers){
        return `${key} must be contain at least One Number`;
    }
    if(!hasSpecialChars){
        return `${key} must be contain at least One Special Charecter`;
    }
    return "";
}


module.exports = { validateStr, validateEmail, validatePassword}