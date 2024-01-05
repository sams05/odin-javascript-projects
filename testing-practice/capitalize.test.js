import { capitalize } from "./capitalize.js";

test('Empty string', () => {
    expect(capitalize('')).toBe('');
});

test('Single character', () => {
    expect(capitalize('a')).toBe('A');
});

test('Two or more characters', () => {
    expect(capitalize('jest')).toBe('Jest');
});

