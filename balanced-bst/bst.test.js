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
            expect(Tree.preOrder(tree)).toEqual([5, 2, 3, 11, 10, 12]);
        });
        test('inorder', () => {
            expect(Tree.inOrder(tree)).toEqual([2, 3, 5, 10, 11, 12]);
        });
        test('postorder', () => {
            expect(Tree.postOrder(tree)).toEqual([3, 2, 10, 12, 11, 5]);
        });
    });

    describe('Instance methods', () => {
        test('preorder', () => {
            expect(tree.preOrder()).toEqual([5, 2, 3, 11, 10, 12]);
        });
        test('inorder', () => {
            expect(tree.inOrder()).toEqual([2, 3, 5, 10, 11, 12]);
        });
        test('postorder', () => {
            expect(tree.postOrder()).toEqual([3, 2, 10, 12, 11, 5]);
        });
        test('preorder summation', () => {
            expect(tree.preOrder((data, acc) => acc + data, 0)).toBe(43);
        });
        test('inorder summation', () => {
            expect(tree.inOrder((data, acc) => acc + data, 0)).toBe(43);
        });
        test('postorder summation', () => {
            expect(tree.postOrder((data, acc) => acc + data, 0)).toBe(43);
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
    test('Level order instance method summation', () => {
        expect(tree.levelOrder((data, acc) => acc + data, 0)).toBe(43);
    });
});

describe('Insertion', () => {
    test('Insert nothing', () => {
        const tree = new Tree([10, 3, 5, 2, 12, 11]);
        tree.insert().insert(undefined).insert(null);
        expect(tree.toString()).toEqual('2, 3, 5, 10, 11, 12');
    })
    test('Insert into empty tree', () => {
        const tree = new Tree();
        tree.insert(2);
        expect(tree.toString()).toEqual('2');
    });
    test('Insert duplicate', () => {
        const tree = new Tree();
        tree.insert(6).insert(6);
        expect(tree.toString()).toEqual('6');
    });
    test('Insert in any order', () => {
        const tree = new Tree();
        tree.insert(8).insert(12).insert(4);
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

describe('Height', () => {
    const tree = new Tree([10, 3, 5, 2, 12, 11]);

    test('Not in tree', () => {
        expect(tree.height(1)).toBe(-1);
    });
    test('Root', () => {
        expect(tree.height(5)).toBe(2);
    });
    test('Middle layer', () => {
        expect(tree.height(2)).toBe(1);
    });
    test('Leaf', () => {
        expect(tree.height(10)).toBe(0);
    });
});

describe('Depth', () => {
    const tree = new Tree([10, 3, 5, 2, 12, 11]);

    test('Not in tree', () => {
        expect(tree.depth(1)).toBe(-1);
    });
    test('Root', () => {
        expect(tree.depth(5)).toBe(0);
    });
    test('Middle layer', () => {
        expect(tree.depth(2)).toBe(1);
    });
    test('Leaf', () => {
        expect(tree.depth(10)).toBe(2);
    });
});

describe('Tree balancing', () => {
    describe('Check if balanced', () => {
        test('Unbalanced 1', () => {
            const tree = new Tree();
            tree.insert(1).insert(2).insert(3).insert(4);
            expect(tree.isBalanced()).toBeFalsy();
        });
        test('Unbalanced 2', () => {
            const tree = new Tree();
            tree.insert(4).insert(2).insert(1).insert(3);
            expect(tree.isBalanced()).toBeFalsy();
        });
        test('Unbalanced 3', () => {
            const tree = new Tree();
            tree.insert(3).insert(2).insert(1);
            expect(tree.isBalanced()).toBeFalsy();
        });
        test('Balanced 1', () => {
            const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
            expect(tree.isBalanced()).toBeTruthy();
        });
        test('Balanced 2', () => {
            // inserting in this order: 5, 2, 3, 11, 9, 13
            const tree = new Tree([9, 3, 5, 2, 13, 11]);
            tree.insert(8).insert(10).insert(12).insert(14);
            expect(tree.isBalanced()).toBeTruthy();
        });
    });

    describe('Rebalance', () => {
        describe('Originally unbalanced', () => {
            test('Rebalance 1', () => {
                const tree = new Tree();
                tree.insert(1).insert(2).insert(3).insert(4);
                tree.rebalance();
                expect(tree.isBalanced()).toBeTruthy();
            });
            test('Rebalance 2', () => {
                const tree = new Tree();
                tree.insert(4).insert(2).insert(1).insert(3);
                tree.rebalance();
                expect(tree.isBalanced()).toBeTruthy();
            });
            test('Rebalance 3', () => {
                const tree = new Tree();
                tree.insert(3).insert(2).insert(1);
                tree.rebalance();
                expect(tree.isBalanced()).toBeTruthy();
            });
        });
        describe('Already balanced', () => {
            test('Balanced 1', () => {
                const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
                tree.rebalance();
                expect(tree.isBalanced()).toBeTruthy();
            });
            test('Balanced 2', () => {
                // inserting in this order: 5, 2, 3, 11, 9, 13
                const tree = new Tree([9, 3, 5, 2, 13, 11]);
                tree.insert(8).insert(10).insert(12).insert(14);
                tree.rebalance();
                expect(tree.isBalanced()).toBeTruthy();
            });
        });
    });
});