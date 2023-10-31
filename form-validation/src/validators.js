import { markVisited } from './form-helper';
import postalCodes from 'postal-codes-js';

/**
 * Generic validator that only validates whether the input is required
 */
class Validator {
    #input;
    #errorOutput;

    /**
     * 
     * @param {HTMLInputElement} input 
     * @param {HTMLElement} errorOutput 
     */
    constructor(input, errorOutput) {
        this.#input = input;
        this.#errorOutput = errorOutput;
    }

    get input() {
        return this.#input;
    }

    validate() {
        const errorMessages = [];
        let valid = true;
        if (this.#input.validity.valueMissing) {
            valid = false;
            errorMessages.push('This is a required field.');
        }
        return { valid, errorMessages };
    }

    /**
     * Provide error messages on errorOutput based on the result of the validate method.
     * Take a validate callback to allow caller to overwrite the validate method
     * @param {Function} validate 
     * @returns {Boolean} Whether the input passes validation
     */
    reportValidation(validate = this.validate) {
        // Clear previous errors
        this.#errorOutput.replaceChildren();
        this.#input.setCustomValidity('');

        // To style invalid inputs only after the user interacted with the form control
        markVisited(this.#input);

        const validation = validate();
        if (!validation.valid) {
            const ul = document.createElement('ul');
            for (const errorMessage of validation.errorMessages) {
                const li = document.createElement('li');
                li.textContent = errorMessage;
                ul.append(li);
            }
            this.#errorOutput.append(ul);
        }
        return validation.valid;
    }

    /**
     * Attach event listeners to report validation on input and on blur
     * @param {Function} validate 
     */
    init(validate) {
        this.#input.addEventListener('input', (e) => {
            this.reportValidation(validate);
        });
        this.#input.addEventListener('blur', (e) => {
            this.reportValidation(validate);
        });
    }
}

class EmailValidator {
    #validator;

    /**
     * 
     * @param {HTMLInputElement} input 
     * @param {HTMLElement} errorOutput 
     */
    constructor(input, errorOutput) {
        if (!(input instanceof HTMLInputElement) || (input.type !== 'email')) {
            throw new TypeError('Invalid input element, must be of type email');
        }
        this.#validator = new Validator(input, errorOutput);
    }

    validate() {
        const generalValidation = this.#validator.validate();
        let { valid } = generalValidation;
        const { errorMessages } = generalValidation;
        if (this.#validator.input.validity.typeMismatch) {
            valid = false;
            errorMessages.push('Please enter a valid email address.');
        }
        return { valid, errorMessages };
    }

    /**
     * Provide error messages on errorOutput based on the result of the validate method.
     * @returns {Boolean} Whether the input passes validation
     */
    reportValidation() {
        return this.#validator.reportValidation(this.validate.bind(this));
    }

    /**
     * Attach event listeners to report validation on input and on blur
     */
    init() {
        this.#validator.init(this.validate.bind(this));
    }
}

class ZipCodeValidator {
    #validator;
    #select;

    /**
     * @param {HTMLSelectElement} select Select element with value of country code in each option
     * @param {HTMLInputElement} input 
     * @param {HTMLElement} errorOutput 
     */
    constructor(select, input, errorOutput) {
        if (!(input instanceof HTMLInputElement) || (input.type !== 'text')) {
            throw new TypeError('Invalid input element, must be of type text');
        }
        this.#validator = new Validator(input, errorOutput);
        this.#select = select;
    }

    validate() {
        const generalValidation = this.#validator.validate();
        let { valid } = generalValidation;
        const { errorMessages } = generalValidation;
        const countryCode = this.#select.value;
        const zipCode = this.#validator.input.value;
        if (typeof postalCodes.validate(countryCode, zipCode) === 'string') {
            valid = false;
            const errorMessage = postalCodes.validate(countryCode, zipCode);
            // Tells browser that there is an error so that the css styling works appropriately
            this.#validator.input.setCustomValidity(errorMessage);
            errorMessages.push(errorMessage);
        }
        return { valid, errorMessages };
    }

    /**
     * Provide error messages on errorOutput based on the result of the validate method.
     * @returns {Boolean} Whether the input passes validation
     */
    reportValidation() {
        return this.#validator.reportValidation(this.validate.bind(this));
    }

    /**
     * Attach event listeners to report validation on input and on blur
     */
    init() {
        this.#validator.init(this.validate.bind(this));
    }
}

class PasswordValidator {
    #validator;
    static #REQUIREMENTS = {
        HAS_MIN_LENGTH: { pattern: /.{8,}/, errorMessage: 'Password must have at least 8 characters.' },
        HAS_DIGIT: { pattern: /^(?=.*\d).*/, errorMessage: 'Password must contain at least one digit.' },
        HAS_LOWER_CASE_LETTER: { pattern: /^(?=.*[a-z]).*/, errorMessage: 'Password must contain at least one lower case letter.' },
        HAS_UPPER_CASE_LETTER: { pattern: /^(?=.*[A-Z]).*/, errorMessage: 'Password must contain at least one upper case letter.' }
    };

    /**
     * 
     * @param {HTMLInputElement} input 
     * @param {HTMLElement} errorOutput 
     */
    constructor(input, errorOutput) {
        if (!(input instanceof HTMLInputElement) || (input.type !== 'password')) {
            throw new TypeError('Invalid input element, must be of type password');
        }
        this.#validator = new Validator(input, errorOutput);
    }

    validate() {
        const generalValidation = this.#validator.validate();
        let { valid } = generalValidation;
        const { errorMessages } = generalValidation;
        const password = this.#validator.input.value;
        // In HTML: pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
        if (this.#validator.input.validity.patternMismatch) {
            valid = false;
            for (const { pattern, errorMessage } of Object.values(PasswordValidator.#REQUIREMENTS)) {
                if (!pattern.test(password)) {
                    errorMessages.push(errorMessage);
                }
            }
        }
        return { valid, errorMessages };
    }

    /**
     * Provide error messages on errorOutput based on the result of the validate method.
     * @returns {Boolean} Whether the input passes validation
     */
    reportValidation() {
        return this.#validator.reportValidation(this.validate.bind(this));
    }

    /**
     * Attach event listeners to report validation on input and on blur
     */
    init() {
        this.#validator.init(this.validate.bind(this));
    }
}

class PasswordConfirmValidator {
    #validator;
    #passInput;

    /**
     * 
     * @param {HTMLInputElement} input 
     * @param {HTMLInputElement} passInput 
     * @param {HTMLElement} errorOutput 
     */
    constructor(input, passInput, errorOutput) {
        if (!(input instanceof HTMLInputElement) || (input.type !== 'password')) {
            throw new TypeError('Invalid input element, must be of type password');
        }
        this.#validator = new Validator(input, errorOutput);
        this.#passInput = passInput;
    }

    validate() {
        const generalValidation = this.#validator.validate();
        let { valid } = generalValidation;
        const { errorMessages } = generalValidation;
        const passwordConfirm = this.#validator.input.value;
        const password = this.#passInput.value;
        if (passwordConfirm !== password) {
            valid = false;
            // Tells browser that there is an error so that the css styling works appropriately
            this.#validator.input.setCustomValidity('Passwords must match.');
            errorMessages.push('Passwords must match.');
        }
        return { valid, errorMessages };
    }

    /**
     * Provide error messages on errorOutput based on the result of the validate method.
     * @returns {Boolean} Whether the input passes validation
     */
    reportValidation() {
        return this.#validator.reportValidation(this.validate.bind(this));
    }

    init() {
        this.#validator.init(this.validate.bind(this));
    }
}

class FormValidator {
    #button;
    #errorOutput;
    #validators;

    /**
     * 
     * @param {HTMLButtonElement} button 
     * @param  {...Validator} validators Objects that implements the validate and reportValidity methods
     */
    constructor(button, errorOutput, ...validators) {
        this.#button = button;
        this.#errorOutput = errorOutput;
        this.#validators = validators;
    }

    validate() {
        let valid = true;
        const errorMessages = [];
        for (const validator of this.#validators) {
            const inputValid = validator.reportValidation();
            if (!inputValid) {
                valid = false;
            }
        }
        if(valid === false) {
            errorMessages.push('Correct the form, then try again.');
        }
        return { valid, errorMessages };
    }

    /**
     * Provide error messages on errorOutput based on the result of the validate method.
     * @returns {Boolean} Whether the input passes validation
     */
    reportValidation() {
        // Clear previous errors
        this.#errorOutput.replaceChildren();

        const validation = this.validate();
        if (!validation.valid) {
            const ul = document.createElement('ul');
            for (const errorMessage of validation.errorMessages) {
                const li = document.createElement('li');
                li.textContent = errorMessage;
                ul.append(li);
            }
            this.#errorOutput.append(ul);
        }
        return validation.valid;
    }

    init() {
        this.#button.addEventListener('click', e => {
            const valid = this.reportValidation();
            if(!valid) {
                e.preventDefault();
            }
        })
    }
}

export { EmailValidator, ZipCodeValidator, PasswordValidator, PasswordConfirmValidator, FormValidator };