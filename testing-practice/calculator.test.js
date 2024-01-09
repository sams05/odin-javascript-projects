import { calculator } from "./calculator";

describe('Add', () => {
    test('Commutativity', () => {
        expect(calculator.add(9, 32)).toBe(calculator.add(9, 32));
    });
    test('Typical', () => {
        expect(calculator.add(9, 32)).toBe(41);
    });
    test('Identity', () => {
        expect(calculator.add(3243, 0)).toBe(3243);
    });
    test('Negatives', () => {
        expect(calculator.add(-321, -42)).toBe(-363);
    });
    test('Negative and positive 1', () => {
        expect(calculator.add(-32, 242)).toBe(210);
    });
    test('Negative and positive 2', () => {
        expect(calculator.add(-42, 21)).toBe(-21);
    });
});


describe('Subtract', () => {
    test('Anti-commutativity', () => {
        expect(calculator.subtract(9, 32)).toBe(-calculator.subtract(32, 9));
    });
    test('Typical', () => {
        expect(calculator.subtract(32, 4)).toBe(28);
    });
    test('Identity', () => {
        expect(calculator.subtract(3243, 0)).toBe(3243);
    });
    test('Negatives', () => {
        expect(calculator.subtract(-321, -42)).toBe(-279);
    });
    test('Negative and positive', () => {
        expect(calculator.subtract(-32, 242)).toBe(-274);
    });
    test('Positives, subtracting larger number', () => {
        expect(calculator.subtract(42, 61)).toBe(-19);
    });
});

describe('Divide', () => {
    test('Inverses', () => {
        expect(calculator.divide(9, 32)).toBe(calculator.divide(32, 9) ** -1);
    });
    test('Typical', () => {
        expect(calculator.divide(32, 4)).toBe(8);
    });
    test('Identity', () => {
        expect(calculator.divide(3243, 1)).toBe(3243);
    });
    test('Negatives', () => {
        expect(calculator.divide(-321, -42)).toBeCloseTo(321 / 42);
    });
    test('Negative and positive', () => {
        expect(calculator.divide(-32, 242)).toBeCloseTo(-16/121);
    });
    test('Dividing 0', () => {
        expect(calculator.divide(0, 242)).toBe(0);
    });
    test('Divide by 0', () => {
        expect(() => calculator.divide(42, 0)).toThrow('Divide by 0');
    });
});

describe('Multiply', () => {
    test('Commutativity', () => {
        expect(calculator.multiply(9, 32)).toBe(calculator.multiply(32, 9));
    });
    test('Typical', () => {
        expect(calculator.multiply(32, 4)).toBe(128);
    });
    test('Identity', () => {
        expect(calculator.multiply(3243, 1)).toBe(3243);
    });
    test('Property of 0', () => {
        expect(calculator.multiply(3243, 0)).toBe(0);
    });
    test('Negatives', () => {
        expect(calculator.multiply(-321, -42)).toBe(13482);
    });
    test('Negative and positive', () => {
        expect(calculator.multiply(-32, 242)).toBe(-7744);
    });
});