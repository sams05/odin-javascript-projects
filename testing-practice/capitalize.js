
/**
 * Capitalize the first character of a string
 * @param {String} str 
 * @returns {String} string with first character capitalized
 */
function capitalize(str) {
    return str.substring(0,1).toUpperCase() + str.substring(1);
}

export { capitalize };