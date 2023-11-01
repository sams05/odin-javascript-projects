## Form Validation with JavaScript Project

My work for TOP's project on [form validation with JavaScript](https://www.theodinproject.com/lessons/node-path-javascript-form-validation-with-javascript#practice).

### Requirements:
1. Email, Country, Zip Code, Password and Password Confirmation fields
2. It should use live inline validation to inform the user whether a field is properly filled in or not
    - Style invalid fields
    - Error messages until fixed
3. Error message if the button is pushed with any active errors or unfilled required fields

### Implementation:

Validator classes that wraps around input elements, div elements that output error messages, and other supporting elements.
- `validate` methods that validate the input element
- `init` methods to attach event listeners to validate on input and on blur
- `reportValidation` methods that write error messages to the provided div elements. Calls the `setCustomValidity` method on input elements so that the `:invalid` selectors will appropriately match custom errors
- A validator class for the submit button that wraps over all the other validator objects. Validates all the inputs when the user tries to submit

Used ISO-3166-1: Alpha-2 Codes to validate zip codes by selected country. Zip code validation implemented with [postal-codes.js](https://www.npmjs.com/package/postal-codes-js). Select options with country codes provided by [htmlstrip](https://www.htmlstrip.com/iso-country-list-html-select-option).

### Topics covered:
- [The Constraint Validation API](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#the_constraint_validation_api)

### Additional topics:
- [PostCSS Preset Env](https://preset-env.cssdb.org/)
- [CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting)