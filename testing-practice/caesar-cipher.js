
function caesarCipher(text, key) {
    const ALPHABET = ' .,?!abcdefghijklmnopqrstuvwxyz0123456789'.split('');
    text = text.toLowerCase().split(''); // Normalize casing then convert to array for easier processing
    const cipherText = text.map((letter) => {
        // Shift the index of the letter according to the key
        let index = ALPHABET.indexOf(letter);
        // Obtain the modulo using the remainder operator as described in 
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#description
        let newIndex = (((index + key) % ALPHABET.length) + ALPHABET.length) % ALPHABET.length;
        return ALPHABET[newIndex];
    });
    return cipherText.join('');
}

export { caesarCipher };