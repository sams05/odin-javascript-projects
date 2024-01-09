class Tree {
    #root;

    constructor(arr = []) {
        this.#root = Tree.#buildTree(arr);
    }

    static #Node = class Node {
        constructor(data, left = null, right = null) {
            this.data = data;
            this.left = left;
            this.right = right;
        }
    }

    static #buildTree(arr = []) {
        arr = Array.from(new Set(arr)); // Remove duplicates
        arr.sort((a, b) => a - b);
        if (arr.length === 0) {
            return null;
        }

        const mid = Math.trunc((arr.length - 1) / 2);
        const root = new Tree.#Node(arr[mid]);
        root.left = Tree.#buildTree(arr.slice(0, mid));
        root.right = Tree.#buildTree(arr.slice(mid + 1, arr.length));
        return root;
    }

    static inOrder(tree, cb, acc) {
        return Tree.#inOrderRecur(tree.#root, cb, acc);
    }

    inOrder(cb, acc) {
        return Tree.inOrder(this, cb, acc);
    }

    static #inOrderRecur(root, cb, acc) {
        if (typeof cb !== 'function') {
            acc = [];
            cb = function (data, acc) {
                acc.push(data);
                return acc;
            }
        }

        if (root === null) return acc;

        acc = Tree.#inOrderRecur(root.left, cb, acc);
        acc = cb(root.data, acc);
        acc = Tree.#inOrderRecur(root.right, cb, acc);
        return acc;
    }

    static preOrder(tree, cb, acc) {
        return Tree.#preOrderRecur(tree.#root, cb, acc);
    }

    preOrder(cb, acc) {
        return Tree.preOrder(this, cb, acc);
    }

    static #preOrderRecur(root, cb, acc) {
        if (typeof cb !== 'function') {
            acc = [];
            cb = function (data, acc) {
                acc.push(data);
                return acc;
            }
        }

        if (root === null) return acc;

        acc = cb(root.data, acc);
        acc = Tree.#preOrderRecur(root.left, cb, acc);
        acc = Tree.#preOrderRecur(root.right, cb, acc);
        return acc;
    }

    static postOrder(tree, cb, acc) {
        return Tree.#postOrderRecur(tree.#root, cb, acc);
    }

    postOrder(cb, acc) {
        return Tree.postOrder(this, cb, acc);
    }

    static #postOrderRecur(root, cb, acc) {
        if (typeof cb !== 'function') {
            acc = [];
            cb = function (data, acc) {
                acc.push(data);
                return acc;
            }
        }

        if (root === null) return acc;

        acc = Tree.#postOrderRecur(root.left, cb, acc);
        acc = Tree.#postOrderRecur(root.right, cb, acc);
        acc = cb(root.data, acc);
        return acc;
    }

    static levelOrder(tree, cb, acc) {
        return tree.levelOrder(cb, acc);
    }

    levelOrder(cb, acc) {
        if (typeof cb !== 'function') {
            acc = [];
            cb = function (data, acc) {
                acc.push(data);
                return acc;
            }
        }

        if (this.#root === null) return;
        const queue = [this.#root];
        while (queue.length > 0) {
            const curNode = queue.shift();
            acc = cb(curNode.data, acc);
            if (curNode.left !== null) {
                queue.push(curNode.left);
            }
            if (curNode.right !== null) {
                queue.push(curNode.right);
            }
        }
        return acc;
    }

    insert(data) {
        this.#root = Tree.#insert(this.#root, data);
        return this;
    }

    static #insert(curNode, data) {
        // Base cases
        if (data === undefined || data === null) {
            return curNode;
        }
        if (curNode === null) {
            return new Tree.#Node(data);
        }
        // Recursive case: insert to its left or right subtree then return itself
        if (data > curNode.data) {
            curNode.right = Tree.#insert(curNode.right, data);
        }
        if (data < curNode.data) {
            curNode.left = Tree.#insert(curNode.left, data);
        }
        return curNode;
    }

    static #getMinData(root) {
        if (root === null) {
            throw new Error('Empty tree');
        }
        let curNode = root;
        while (curNode.left !== null) {
            curNode = curNode.left;
        }
        return curNode.data;
    }

    static #getSuccessorData(node) {
        return Tree.#getMinData(node.right);
    }

    delete(data) {
        this.#root = Tree.#delete(this.#root, data);
    };

    static #delete(curNode, data) {
        if (curNode === null) {
            return null;
        }
        if (data === curNode.data) {
            if (curNode.left === null && curNode.right === null) {
                // Leaf node
                return null;
            } else if (curNode.left === null) {
                // Only have right subtree
                return curNode.right;
            } else if (curNode.right === null) {
                // Only have left subtree
                return curNode.left;
            } else {
                // Have both children
                const successorData = Tree.#getSuccessorData(curNode);
                curNode.data = successorData;
                curNode.right = Tree.#delete(curNode.right, successorData);
                return curNode;
            }
        }

        // Recursive case: delete from the left or right subtree then return itself
        if (data > curNode.data) {
            curNode.right = Tree.#delete(curNode.right, data);
        }
        if (data < curNode.data) {
            curNode.left = Tree.#delete(curNode.left, data);
        }
        return curNode;
    }

    find(data) {
        let curNode = this.#root;
        while (curNode !== null) {
            if (data === curNode.data) {
                return true;
            }
            if (data > curNode.data) {
                curNode = curNode.right;
            } else {
                curNode = curNode.left;
            }
        }
        return false;
    }

    #find(data) {
        let curNode = this.#root;
        while (curNode !== null) {
            if (data === curNode.data) {
                return curNode;
            }
            if (data > curNode.data) {
                curNode = curNode.right;
            } else {
                curNode = curNode.left;
            }
        }
        return curNode;
    }

    static #height(root) {
        if (root === null) return -1;

        let height = Math.max(Tree.#height(root.left), Tree.#height(root.right));
        height++;
        return height;
    }

    height(data) {
        const node = this.#find(data);

        return Tree.#height(node);
    }

    depth(data) {
        let depth = 0;
        let curNode = this.#root;
        while (curNode !== null) {
            if (data === curNode.data) {
                return depth;
            }

            if (data > curNode.data) {
                curNode = curNode.right;
            } else {
                curNode = curNode.left;
            }
            depth++;
        }
        return -1;
    }

    static #isBalanced(root) {
        if (root === null) return true;

        const heightDiffBalanced = Math.abs(Tree.#height(root.left) - Tree.#height(root.right)) <= 1;
        const bothSubtreesBalanced = (Tree.#isBalanced(root.left) && Tree.#isBalanced(root.right));

        return heightDiffBalanced && bothSubtreesBalanced;
    }

    isBalanced() {
        return Tree.#isBalanced(this.#root);
    }

    rebalance() {
        let inOrderArr = this.inOrder();
        this.#root = Tree.#buildTree(inOrderArr);
        return this;
    }

    toString() {
        const dataArr = [];
        function concatData(data) {
            dataArr.push(data);
        }
        this.inOrder(concatData);
        return dataArr.join(', ');
    }

    static #prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            Tree.#prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            Tree.#prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    prettyPrint() {
        Tree.#prettyPrint(this.#root);
    }
}

export { Tree };