const cards = document.querySelector('.cards');
const cardNumber = document.querySelector('.cardNumber');
const cardName = document.querySelector('.cardName');
const cardExpMonth = document.querySelector('.expMonth');
const cardExpYear = document.querySelector('.expYear');
const cardCvc = document.querySelector('.cardCvc');
const spans = cards.querySelectorAll('span');

const inputs = document.querySelectorAll('input');

const txtName = document.querySelector('.form__name-input');
const txtNumber = document.querySelector('.form__cardNumber-input');
const txtMonth = document.querySelector('.expire__month');
const txtYear = document.querySelector('.expire__year');
const txtCvc = document.querySelector('.cvc__input');
const btnSubmit = document.querySelector('.btnSubmit');

const btnContinue = document.querySelector('.complete__continue');

const showForm = document.querySelector('.form');
const showComplete = document.querySelector('.complete');

const cardFront = document.querySelector('.card-front');
const card1 = document.querySelector('.card1');
const card2 = document.querySelector('.card2');
const card3 = document.querySelector('.card3');
const card4 = document.querySelector('.card4');
let currentImage;
const currentYear = new Date().getFullYear();

let nameValid = false;
let numberValid = false;
let monthValid = false;
let yearValid = false;
let cvcValid = false;


btnSubmit.addEventListener('click', (e) => {

    e.preventDefault();

    validateName();
    validateNumber();
    validateMonth();
    validateYear();
    validateCvc();
    if (nameValid && numberValid && monthValid && yearValid && cvcValid) {

        showForm.style.display = 'none';
        showComplete.style.display = 'flex';
    }
});

btnContinue.addEventListener('click', () => {
    showForm.style.display = 'flex';
    showComplete.style.display = 'none';
    cardFront.style.backgroundImage = 'currentImage';
    showForm.reset();
    cardNumber.textContent = '0000 0000 0000 0000';
    cardName.textContent = 'Jane Appleseed';
    cardExpMonth.textContent = '00';
    cardExpYear.textContent = '00';
    cardCvc.textContent = '000';
    // location.reload();
});


card1.addEventListener('click', () => {
    currentImage = cardFront.style.backgroundImage = 'url(images/bg-card-front.png)';
    changeColor('white');
});
card2.addEventListener('click', () => {
    currentImage = cardFront.style.backgroundImage = 'url(images/snake.png)';
    changeColor('white');
});
card3.addEventListener('click', () => {
    currentImage = cardFront.style.backgroundImage = 'url(images/illusions.png)';
    changeColor('#1792a4');
});

card4.addEventListener('click', () => {
    currentImage = cardFront.style.backgroundImage = 'url(images/dragon-ball.png)';
    changeColor('#1225f3');
});




txtName.addEventListener('input', () => {

    if (txtName.value == '') {
        cardName.textContent = 'Jane Appleseed';
    } else {
        cardName.textContent = txtName.value;
        validateName();
    }


});


txtNumber.addEventListener('input', () => {
    if (txtNumber.value == '') {
        cardNumber.textContent = '0000 0000 0000 0000';
    } else {
        txtNumber.value = txtNumber.value.replace(/\s/g, "")
            .replace(/([0-9]{4})/g, "$1 ")
            .trim();
        cardNumber.textContent = txtNumber.value;
        validateNumber();
    }
});

txtMonth.addEventListener('input', () => {

    if (txtMonth.value == '') {
        cardExpMonth.textContent = '00';
    } else {
        cardExpMonth.textContent = (txtMonth.value < 10 && txtMonth.value.length < 2) ? "0" + txtMonth.value : txtMonth.value;
        validateMonth();
    }
});

txtYear.addEventListener('input', () => {

    if (txtYear.value == '') {
        cardExpYear.textContent = '00';
    } else {
        cardExpYear.textContent = txtYear.value;
        validateYear();
    }
});

txtCvc.addEventListener('input', () => {

    if (txtCvc.value == '') {
        cardCvc.textContent = '000';
    } else {
        cardCvc.textContent = txtCvc.value;
        validateCvc();
    }
});


function showError(element, msg) {
    const error = element.parentElement.querySelector('.error');
    if (msg != '') {
        error.style.transform = 'translateY(0px)';
        error.textContent = msg;
        element.style.borderColor = 'red';
    } else {
        error.style.transform = 'translateY(-30px)';
        element.style.borderColor = 'hsl(270, 3%, 87%)';

    }
}

function validateName() {

    let exp = /^[a-zA-Z\s]+$/;
    nameValid = false;
    if (txtName.value == '') {
        showError(txtName, 'No puede estar vacio');
    } else {
        if (exp.test(txtName.value)) {
            showError(txtName, '');
            nameValid = true;
        } else {
            showError(txtName, 'Solo permitido letras');
        }
    }
}

function validateNumber() {
    let exp = /^[(\d)+(\s)]+$/g;
    numberValid = false;
    if (txtNumber.value == '') {
        showError(txtNumber, 'No puede estar vacio');
    } else {
        if (exp.test(txtNumber.value)) {
            if ((txtNumber.value.length < 19)) {
                showError(txtNumber, 'Debe contener 12 números');
            } else {
                showError(txtNumber, '');
                numberValid = true;
            }

        } else {
            showError(txtNumber, 'Solo permitido numeros');

        }
    }
}

function validateMonth() {
    let exp = /^[\d]+$/g;
    monthValid = false;

    if (txtMonth.value == '') {
        showError(txtMonth, 'No puede estar vacio');
    } else {
        if (exp.test(txtMonth.value)) {

            if ((txtMonth.value >= 1 && txtMonth.value <= 12) || txtMonth.value == '') {
                showError(txtMonth, '');
                monthValid = true;
            } else {
                showError(txtMonth, 'Mes invalido');
            }
        } else {
            showError(txtMonth, 'Solo permitido numeros');

        }
    }
}
function validateYear() {
    let exp = /^[\d]+$/g;
    yearValid = false;

    if (txtYear.value == '') {
        showError(txtYear, 'No puede estar vacio');
    } else {
        if (exp.test(txtYear.value)) {
            if ((txtYear.value > String(currentYear).slice(-2) && txtYear.value.length < 3) || txtYear.value == '') {
                showError(txtYear, '');
                yearValid = true;
            } else {
                showError(txtYear, 'Año mayor actual');
            }
        } else {
            showError(txtYear, 'Solo permitido numeros');
        }
    }
}
function validateCvc() {
    let exp = /^[\d]+$/g;
    cvcValid = false;
    if (txtCvc.value == '') {
        showError(txtCvc, 'No puede estar vacio');
    } else {
        if (exp.test(txtCvc.value)) {
            showError(txtCvc, '');
            cvcValid = true;
            if (txtCvc.value.length != 3 && txtCvc.value != '') {
                showError(txtCvc, 'CVC Inválido(deben 3 numeros)');
            }
        } else {
            showError(txtCvc, 'Solo permitido numeros');


        }
    }

}

function changeColor(color) {
    spans.forEach((e) => {
        e.style.color = color;
    })
}
