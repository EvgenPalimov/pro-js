let form = document.querySelector('#form'),
    formInputs = document.querySelectorAll('.create-form-input'),
    inputName = document.querySelector('.js-input-name'),
    inputPhoneNumber = document.querySelector('.js-input-phone-number'),
    inputEmail = document.querySelector('.js-input-email');

function validateEmail(email) {
    let re = /^[\w-]+@[\w-]+\.[a-z]{2,4}$/i;
    return re.test(String(email).toLowerCase());
}

function validteName(name) {
    let re = new RegExp("^.*[^A-zА-яЁё].*$")
    return re.test((name));
}

function validtePhoneNumber(phoneNumber) {
    let re = new RegExp(/^\+7\(\d{3}\)\d{3}-\d{4}$/);
    return re.test(phoneNumber);
}

function messageError(text, element) {
    element.classList.add('invalid');
    let error = document.createElement('span');
    error.classList.add('msgError');
    error.innerText = text;
    element.insertAdjacentElement('afterend', error);
}

function deleteMessageError(element) {
    element.classList.remove('invalid');
    element.classList.add('valid');
    let errors = [...document.querySelectorAll('.msgError')];
    for (let error of errors) {
        error.remove();
    }
}

form.onsubmit = function () {
    let nameVal = inputName.value,
        phoneNumberVal = inputPhoneNumber.value,
        emailVal = inputEmail.value,
        emptyInputs = Array.from(formInputs).filter(input => input.value === '');

    formInputs.forEach(input => {
        if (input.value === '') {
            messageError('The field cannot be empty', input);
        } else {
            deleteMessageError(input);
        }
    });

    if (emptyInputs.length !== 0) {
        return false;
    }

    if (!validateEmail(emailVal)) {
        messageError('Email not valid', inputEmail);
        return false;
    } else {
        deleteMessageError(inputEmail);
    }

    if (validteName(nameVal)) {
        messageError('The name should be made up of letters only', inputName);
        return false;
    } else {
        deleteMessageError(inputEmail);
    }

    if (!validtePhoneNumber(phoneNumberVal)) {
        messageError('Specify the phone number in this format +7(000)000-0000', inputPhoneNumber);
        return false;
    } else {
        deleteMessageError(inputPhoneNumber);
    }

}

