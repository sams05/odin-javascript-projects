import { Tree } from "./bst";

describe('Tree construction', () => {
    test('from typical array', () => {
        const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
        expect(tree.toString()).toEqual('1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345');
    });
    test('from empty array', () => {
        const tree = new Tree([]);
        expect(tree.toString()).toEqual('');
    })
});


/*
{
    data: 8,
        left: {
        data: 4,
            left: {
            data: 1,
                left: null,
                    right: {
                data: 3,
                    left: null,
                        right: null
            }
        },
        right: {
            data: 5,
                left: null,
                    right: {
                data: 7,
                    left: null,
                        right: null
            }
        }
    },
    right: {
        data: 67,
            left: {
            data: 9,
                left: null,
                    right: {
                data: 23,
                    left: null,
                        right: null
            }
        },
        right: {
            data: 324,
                left: null,
                    right: {
                data: 6345,
                    left: null,
                        right: null
            }
        }
    }
}
*/