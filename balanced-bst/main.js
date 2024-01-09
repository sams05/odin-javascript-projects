import { Tree } from "./bst.js";

let arr = [];
for(let i = 0; i < 10; i++) {
    arr.push(Math.floor(100*Math.random()));
}
console.log('Creating tree of random numbers < 100');
const tree = new Tree(arr);
tree.prettyPrint();
console.log('Check that the tree is balanced:');
console.log(`Tree is balanced: ${tree.isBalanced()}`);
console.log('Elements with level-order:');
console.log(tree.levelOrder());
console.log('Elements with pre-order:');
console.log(tree.preOrder());
console.log('Elements with post-order:');
console.log(tree.postOrder());
console.log('Elements with in-order:');
console.log(tree.inOrder());
console.log('Unbalance tree by adding numbers > 100');
tree.insert(152).insert(125);
tree.prettyPrint();
console.log('Check that the tree is unbalanced:');
console.log(`Tree is balanced: ${tree.isBalanced()}`);
console.log('Rebalancing the tree');
tree.rebalance();
tree.prettyPrint();
console.log('Check that the tree is balanced:');
console.log(`Tree is balanced: ${tree.isBalanced()}`);
console.log('Elements with level-order:');
console.log(tree.levelOrder());
console.log('Elements with pre-order:');
console.log(tree.preOrder());
console.log('Elements with post-order:');
console.log(tree.postOrder());
console.log('Elements with in-order:');
console.log(tree.inOrder());