function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    return { error: true, helperText: "O campo e-mail é obrigatório" };
  } else if (!emailRegex.test(email)) {
    return { error: true, helperText: "E-mail inválido" };
  } else {
    return { error: false, helperText: null };
  }
}

function validPassword(password) {
  if (password === "") {
    return { error: true, helperText: "O campo senha é obrigatório" };
  } else if (password.length >= 6) {
    return { error: false, helperText: null };
  } else {
    return { error: true, helperText: "A senha precisa ter 6 ou mais caractéres." };
  }
}

function validateSleep(data) {

}


function validateEat(data) {
    
}

function validateDiaper(data) {
    
}

function validateFields(data, actionType) {
    switch(actionType) {
        case 1:
            return validateSleep(data);
        case 2:
            return validateEat(data);
        case 3:
            return validateDiaper(data);
        default:
            return validateSleep(data);
    }
}

export { validateEmail, validPassword, validateFields };