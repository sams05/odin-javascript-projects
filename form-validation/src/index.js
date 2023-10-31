import './style.css';
import { EmailValidator, ZipCodeValidator, PasswordValidator, PasswordConfirmValidator, FormValidator } from './validators';

const emailInput = document.getElementById('email');
const emailErrorOutput = document.getElementById('email-validation-output');
const emailValidator = new EmailValidator(emailInput, emailErrorOutput);
emailValidator.init();

const countrySelect = document.getElementById('country');
const zipCodeInput = document.getElementById('zip-code');
const zipCodeErrorOutput = document.getElementById('zip-code-validation-output');
const zipCodeValidator = new ZipCodeValidator(countrySelect, zipCodeInput, zipCodeErrorOutput);
zipCodeValidator.init();

const passInput = document.getElementById('pass');
const passErrorOutput = document.getElementById('password-validation-output');
const passwordValidator = new PasswordValidator(passInput, passErrorOutput)
passwordValidator.init();
const passConfirmInput = document.getElementById('pass-confirm');
const passConfirmErrorOutput = document.getElementById('password-confirm-validation-output');
const passwordConfirmValidator = new PasswordConfirmValidator(passConfirmInput, passInput, passConfirmErrorOutput)
passwordConfirmValidator.init();

const submitBtn = document.getElementById('submit');
const submitBtnErrorOutput = document.getElementById('submit-btn-validation-output');
const formValidator = new FormValidator(submitBtn, submitBtnErrorOutput, emailValidator, zipCodeValidator, passwordValidator, passwordConfirmValidator);
formValidator.init();