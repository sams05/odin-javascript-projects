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

    static inOrder(tree, cb) {
        Tree.#inOrderRecur(tree.#root, cb);
    }

    inOrder(cb) {
        Tree.inOrder(this, cb);
    }

    static #inOrderRecur(root, cb = ((data) => console.log(data))) {
        if (root === null) return;

        Tree.#inOrderRecur(root.left, cb);
        cb(root.data);
        Tree.#inOrderRecur(root.right, cb);
    }

    static preOrder(tree, cb) {
        Tree.#preOrderRecur(tree.#root, cb);
    }

    preOrder(cb) {
        Tree.preOrder(this, cb);
    }

    static #preOrderRecur(root, cb = ((data) => console.log(data))) {
        if (root === null) return;

        cb(root.data);
        Tree.#preOrderRecur(root.left, cb);
        Tree.#preOrderRecur(root.right, cb);
    }

    static postOrder(tree, cb) {
        Tree.#postOrderRecur(tree.#root, cb);
    }

    static #postOrderRecur(root, cb = ((data) => console.log(data))) {
        if (root === null) return;

        Tree.#postOrderRecur(root.left, cb);
        Tree.#postOrderRecur(root.right, cb);
        cb(root.data);
    }

    postOrder(cb) {
        Tree.postOrder(this, cb);
    }

    insert(data) {
        this.#root = Tree.#insert(this.#root, data);
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
        if(curNode === null) {
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
        while(curNode !== null) {
            if(data === curNode.data) {
                return true;
            }
            if(data > curNode.data) {
                curNode = curNode.right;
            } else {
                curNode = curNode.left;
            }
        }
        return false;
    }

    toString() {
        const dataArr = [];
        function concatData(data) {
            dataArr.push(data);
        }
        this.inOrder(concatData);
        return dataArr.join(', ');
    }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree.toString());

/*
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

prettyPrint(Tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));
*/
export { Tree };