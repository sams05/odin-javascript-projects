import { reverseString } from "./reverse-string";

test('Empty string', () => {
    expect(reverseString('')).toBe('');
});

test('Single character', () => {
    expect(reverseString('k')).toBe('k');
});

test('Two or more characters', () => {
    expect(reverseString('abC')).toBe('Cba');
})