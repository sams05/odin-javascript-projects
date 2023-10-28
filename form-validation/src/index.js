import './style.css';
import { listenFormControlInteraction } from './form-helper';
import { EmailValidator } from './validators';

listenFormControlInteraction();

const emailInput = document.getElementById('email');
const emailErrorOutput = document.getElementById('email-validation-output');
new EmailValidator(emailInput, emailErrorOutput).init();