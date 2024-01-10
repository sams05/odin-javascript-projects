import { caesarCipher } from "./caesar-cipher";

test('Typical', () => {
    expect(caesarCipher('imperator', 4)).toBe('mqtivexsv');
})

test('Normalize cases', () => {
    expect(caesarCipher('iMpErAtOr', 4)).toBe('mqtivexsv');
});

test('Punctuation', () => {
    expect(caesarCipher(' .,?!', 12)).toBe('hijkl');
});

describe('Wrapping correctly', () => {
    test('Positive shift', () => {
        // ' .,?!abcdefghijklmnopqrstuvwxyz0123456789'
        // 'bcdefghijklmnopqrstuvwxyz0123456789 .,?!a'
        expect(caesarCipher('479', 6)).toBe(' ?a');
    });
    test('Negative shift', () => {
        // ' .,?!abcdefghijklmnopqrstuvwxyz0123456789'
        // '3456789 .,?!abcdefghijklmnopqrstuvwxyz012'
        expect(caesarCipher('.?b', -7)).toBe('469');
    });
    test('Full cycle', () => {
        expect(caesarCipher('cat', 41)).toBe('cat');
    });
});
