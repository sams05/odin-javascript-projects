import './style.css';
import { EmailValidator } from './validators';

const emailInput = document.getElementById('email');
const emailErrorOutput = document.getElementById('email-error-output');
new EmailValidator(emailInput, emailErrorOutput).init();