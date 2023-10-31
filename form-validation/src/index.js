import './style.css';
import { listenFormControlInteraction } from './form-helper';
import { EmailValidator, ZipCodeValidator, PasswordValidator } from './validators';

listenFormControlInteraction();

const emailInput = document.getElementById('email');
const emailErrorOutput = document.getElementById('email-validation-output');
new EmailValidator(emailInput, emailErrorOutput).init();

const countrySelect = document.getElementById('country');
const zipCodeInput = document.getElementById('zip-code');
const zipCodeErrorOutput = document.getElementById('zip-code-validation-output');
new ZipCodeValidator(countrySelect, zipCodeInput, zipCodeErrorOutput).init();

const passInput = document.getElementById('pass');
const passErrorOutput = document.getElementById('password-validation-output');
new PasswordValidator(passInput, passErrorOutput).init();