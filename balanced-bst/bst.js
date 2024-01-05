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

    static #inOrderRecur(root, cb = ((data) => console.log(data))) {
        if(root === null) return;

        Tree.#inOrderRecur(root.left, cb);
        cb(root.data);
        Tree.#inOrderRecur(root.right, cb);
    }

    toString() {
        const dataArr = [];
        function concatData(data) {
            dataArr.push(data);
        }
        Tree.inOrder(this, concatData);
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