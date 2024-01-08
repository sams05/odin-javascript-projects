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

describe('Breadth-first traversal', () => {
    const tree = new Tree([10, 3, 5, 2, 12, 11]);

    test('Level order static method', () => {
        expect(Tree.levelOrder(tree)).toEqual([5, 2, 11, 3, 10, 12]);
    });
    test('Level order instance method', () => {
        expect(tree.levelOrder()).toEqual([5, 2, 11, 3, 10, 12]);
    });
    test('Level order instance method summing', () => {
        expect(tree.levelOrder((data, acc) => acc + data, 0)).toBe(43);
    });
});

describe('Insertion', () => {
    test('Insert nothing', () => {
        const tree = new Tree([10, 3, 5, 2, 12, 11]);
        tree.insert();
        tree.insert(undefined);
        tree.insert(null);
        expect(tree.toString()).toEqual('2, 3, 5, 10, 11, 12');
    })
    test('Insert into empty tree', () => {
        const tree = new Tree();
        tree.insert(2);
        expect(tree.toString()).toEqual('2');
    });
    test('Insert duplicate', () => {
        const tree = new Tree();
        tree.insert(6);
        tree.insert(6);
        expect(tree.toString()).toEqual('6');
    });
    test('Insert in any order', () => {
        const tree = new Tree();
        tree.insert(8);
        tree.insert(12);
        tree.insert(4);
        expect(tree.toString()).toEqual('4, 8, 12');
    });
});

describe('Deletion', () => {
    let tree;
    beforeEach(() => {
        tree = new Tree([10, 3, 5, 2, 12, 11]);
    });

    test('Delete nothing', () => {
        tree.delete(6);
        expect(tree.toString()).toEqual('2, 3, 5, 10, 11, 12');
    });

    test('Delete leaf', () => {
        tree.delete(10);
        expect(tree.toString()).toEqual('2, 3, 5, 11, 12');
    });

    test('Delete node with single right child', () => {
        tree.delete(2);
        expect(tree.toString()).toEqual('3, 5, 10, 11, 12');
    });

    test('Delete node with single left child', () => {
        tree.insert(9);
        tree.delete(9);
        expect(tree.toString()).toEqual('2, 3, 5, 10, 11, 12');
    });

    test('Delete node with both children', () => {
        tree.delete(5);
        expect(tree.toString()).toEqual('2, 3, 10, 11, 12');
    });
});

describe('Find', () => {
    const tree = new Tree([10, 3, 5, 2, 12, 11]);

    test('Empty tree', () => {
        expect(new Tree().find(2)).toBeFalsy();
    });
    test('Not in tree', () => {
        expect(tree.find(8)).toBeFalsy();
    });
    test('At root', () => {
        expect(tree.find(5)).toBeTruthy();
    });
    test('At leaf', () => {
        expect(tree.find(3)).toBeTruthy();
    });
    test('At mid level', () => {
        expect(tree.find(11)).toBeTruthy();
    });
});