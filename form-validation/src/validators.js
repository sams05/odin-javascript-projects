
class Validator {
    static validate(input) {
        const errorMessages = [];
        let valid = true;
        if (input.validity.valueMissing) {
            valid = false;
            errorMessages.push('This is a required field.');
        }
        return { valid, errorMessages };
    }
    static reportValidation(validate, errorOutput) {
        errorOutput.replaceChildren();
        const validation = validate();
        if(!validation.valid) {
            const ul = document.createElement('ul');
            for(const errorMessage of validation.errorMessages) {
                const li = document.createElement('li');
                li.textContent = errorMessage;
                ul.append(li);
            }
            errorOutput.append(ul);
        }
    }
}

/* |Todo
Validator classes, construct with id, init function to attach event listeners
- Validate on input and blur
    - setCustomValidity to style when invalid
    - Return error message to add into span (maybe using the validityMessage)
    */
class EmailValidator {
    #input;
    #errorOutput;

    /**
     * 
     * @param {HTMLInputElement} input 
     * @param {HTMLElement} errorOutput 
     */
    constructor(input, errorOutput) {
        if (!(input instanceof HTMLInputElement) || (input.type !== 'email')) {
            throw new TypeError('Invalid input element, must be of type email');
        }
        this.#input = input;
        this.#errorOutput = errorOutput;
    }

    #validate() {
        const generalValidation = Validator.validate(this.#input);
        let { valid } = generalValidation;
        const { errorMessages } = generalValidation;
        if(this.#input.validity.typeMismatch) {
            valid = false;
            errorMessages.push('Please enter a valid email address.');
        }
        return {valid, errorMessages};
    }

    init() {
        this.#input.addEventListener('input', (e) => {
            Validator.reportValidation(this.#validate.bind(this), this.#errorOutput);
        });
        this.#input.addEventListener('blur', (e) => {
            Validator.reportValidation(this.#validate.bind(this), this.#errorOutput);
        });
    }
}

class ZipCodeValidator {

}

class PasswordValidator {

}

export {EmailValidator};