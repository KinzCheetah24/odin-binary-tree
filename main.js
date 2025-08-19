import {Tree} from "./tree.js";

let array = [0, 10, 300, 4, 20, 500, 1, 39, 3, 1];

let tree = new Tree(array);

tree.printTree();

console.log(tree.isBalanced());

console.log("\nLevel Order");
tree.levelOrderForEach(node => console.log(node.value));

console.log("\nInOrder");
tree.inOrderForEach(node => console.log(node.value));

console.log("\nPreOrder");
tree.preOrderForEach(node => console.log(node.value));

console.log("\nPostOrder");
tree.postOrderForEach(node => console.log(node.value));

tree.insert(1000);
tree.insert(1001);
tree.insert(1002);
tree.insert(1003);

tree.printTree();

console.log(tree.isBalanced());

tree.rebalance();

tree.printTree();

console.log(tree.isBalanced());

console.log("\nLevel Order");
tree.levelOrderForEach(node => console.log(node.value));

console.log("\nInOrder");
tree.inOrderForEach(node => console.log(node.value));

console.log("\nPreOrder");
tree.preOrderForEach(node => console.log(node.value));

console.log("\nPostOrder");
tree.postOrderForEach(node => console.log(node.value));