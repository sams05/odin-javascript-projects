import { knightMoves } from './knights-travails';
import { toBeOneOf } from 'jest-extended';
expect.extend({ toBeOneOf });

test('One step', () => {
    expect(knightMoves([0, 0], [1, 2])).toEqual([[0, 0], [1, 2]]);
});

test('Two steps', () => {
    expect(knightMoves([0, 0], [3, 3])).toBeOneOf([
        [[0, 0], [2, 1], [3, 3]],
        [[0, 0], [1, 2], [3, 3]]
    ]);
});

test('Two steps reversed', () => {
    expect(knightMoves([3, 3], [0, 0])).toBeOneOf([
        [[3, 3], [2, 1], [0, 0]],
        [[3, 3], [1, 2], [0, 0]]
    ]);
});
