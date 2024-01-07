import { Tree } from "./bst";

// For visualization, use https://yongdanielliang.github.io/animation/web/BST.html
// Create BST from [10, 3, 5, 2, 12, 11] by inserting in this order: 5, 2, 3, 11, 10, 12
describe('Depth-first traversals', () => {
    const tree = new Tree([10, 3, 5, 2, 12, 11]);

    describe('Static methods', () => {
        test('preorder', () => {
            function toString() {
                const dataArr = [];
                function concatData(data) {
                    dataArr.push(data);
                }
                Tree.preOrder(this, concatData);
                return dataArr.join(', ');
            }
            expect(toString.call(tree)).toEqual('5, 2, 3, 11, 10, 12');
        });
        test('inorder', () => {
            function toString() {
                const dataArr = [];
                function concatData(data) {
                    dataArr.push(data);
                }
                Tree.inOrder(this, concatData);
                return dataArr.join(', ');
            }
            expect(toString.call(tree)).toEqual('2, 3, 5, 10, 11, 12');
        });
        test('postorder', () => {
            function toString() {
                const dataArr = [];
                function concatData(data) {
                    dataArr.push(data);
                }
                Tree.postOrder(this, concatData);
                return dataArr.join(', ');
            }
            expect(toString.call(tree)).toEqual('3, 2, 10, 12, 11, 5');
        });
    });

    describe('Instance methods', () => {
        test('preorder', () => {
            function toString() {
                const dataArr = [];
                function concatData(data) {
                    dataArr.push(data);
                }
                this.preOrder(concatData);
                return dataArr.join(', ');
            }
            expect(toString.call(tree)).toEqual('5, 2, 3, 11, 10, 12');
        });
        test('inorder', () => {
            function toString() {
                const dataArr = [];
                function concatData(data) {
                    dataArr.push(data);
                }
                this.inOrder(concatData);
                return dataArr.join(', ');
            }
            expect(toString.call(tree)).toEqual('2, 3, 5, 10, 11, 12');
        });
        test('postorder', () => {
            function toString() {
                const dataArr = [];
                function concatData(data) {
                    dataArr.push(data);
                }
                this.postOrder(concatData);
                return dataArr.join(', ');
            }
            expect(toString.call(tree)).toEqual('3, 2, 10, 12, 11, 5');
        });
    });
});

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