import { toBeDeepCloseTo } from "jest-matcher-deep-close-to";
import { analyzeArray } from "./analyze-array";
expect.extend({ toBeDeepCloseTo });

test('Empty array', () => {
    expect(() => analyzeArray([])).toThrow('Empty array');
});

test('One number', () => {
    const RESULT = {
        average: 23,
        min: 23,
        max: 23,
        length: 1
    };
    expect(analyzeArray([23])).toEqual(RESULT);
});

test('Typical', () => {
    const RESULT = {
        average: 4,
        min: 1,
        max: 8,
        length: 6
    };
    expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual(RESULT);
});

test('Negative numbers', () => {
    const RESULT = {
        average: -4,
        min: -8,
        max: -1,
        length: 6
    };
    expect(analyzeArray([-1, -8, -3, -4, -2, -6])).toEqual(RESULT);
});

test('Integers', () => {
    const RESULT = {
        average: -13 / 6,
        min: -12,
        max: 8,
        length: 6
    };
    expect(analyzeArray([2, -5, 3, -12, 8, -9])).toBeDeepCloseTo(RESULT, 3);
});

test('Floats', () => {
    const RESULT = {
        average: -787/450,
        min: -12.12,
        max: 4.4,
        length: 6
    }
    expect(analyzeArray([4.4, -1/3, 3.92, -12.12, 18/5, -9.96])).toBeDeepCloseTo(RESULT, 3);
});