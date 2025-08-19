export {Tree};

import {Node} from "./node.js";
import {mergeSortRec} from "./mergeSort.js";

class Tree {
    constructor(array = null) {
        this.buildTree(array);
    }

    buildTree(array) {
        if(array !== null) {
            let sortedArray = this._sortArray(array);

            this._root = this._buildTreeRec(sortedArray, 0, sortedArray.length - 1);
        }
    }

    _buildTreeRec(array, start, end) {
        if(start <= end) {
            let mid = parseInt((start + end) / 2);

            let node = new Node(array[mid]);

            node.left = this._buildTreeRec(array, start, mid - 1);

            node.right = this._buildTreeRec(array, mid + 1, end);

            return node;
        }

        return null;
    }

    insert(value) {
        let node = this._root;
        let positioned = false;

        while(!positioned) {
            if(value < node.value) {
                if(node.left === null) {
                    node.left = new Node(value);
                    positioned = true;
                } else {
                    node = node.left;
                }
            } else if(value > node.value) {
                if(node.right === null) {
                    node.right = new Node(value);
                    positioned = true;
                } else {
                    node = node.right;
                }
            } else {
                throw new Error("The value is already in the tree");
                positioned = true;
            }
        }
    }

    deleteItem(value) {
        let lastNode = null, node = this._root;
        let removed = false;

        while(!removed) {
            if(value < node.value) {
                if(node.left === null) {
                    throw new Error("The value isn't in the tree");
                } else {
                    lastNode = node;
                    node = node.left;
                }
            } else if(value > node.value) {
                if(node.right === null) {
                    throw new Error("The value isn't in the tree");
                } else {
                    lastNode = node;
                    node = node.right;
                }
            } else {
                if(node.left !== null & node.right !== null) {
                    let auxLastNode = null, auxNode = node.right;

                    while(auxNode.left !== null) {
                        auxLastNode = auxNode;
                        auxNode = auxNode.left;
                    }

                    if(auxNode.right !== null) {
                        auxLastNode.left = auxNode.right;
                        node.value = auxNode.value;
                    } else {
                        auxLastNode.left = null;
                        node.value = auxNode.value;
                    }
                } else if(node.left !== null) {
                    if(lastNode.value < value) {
                        lastNode.left = node.left;
                    } else {
                        lastNode.right = node.left;
                    }
                } else if(node.right !== null) {
                    if(lastNode.value < value) {
                        lastNode.left = node.right;
                    } else {
                        lastNode.right = node.right;
                    }
                } else {
                    if(lastNode.value < value) {
                        lastNode.left = null;
                    } else {
                        lastNode.right = null;
                    }
                }
            }
        }
    }

    find(value) {
        let node = this._root;
        let found = false;
        let resultNode = null;

        while(!found) {
            if(value < node.value) {
                node = node.left;
            } else if(value > node.value) {
                node = node.right;
            } else {
                resultNode = node;
                found = true;
            }
        }

        return resultNode;
    }

    levelOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }

        if (this._root !== null) {
            let queue = [this._root];

            while (queue.length > 0) {
                let node = queue.shift();
                callback(node);

                if (node.left !== null) {
                    queue.push(node.left);
                }

                if (node.right !== null) {
                    queue.push(node.right);
                }
            }
        }
    }

    inOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }

        let queue = [];
        this._inOrderForEachRec(this._root, queue);

        while(queue.length > 0) {
            let node = queue.shift();
            callback(node);
        } 
    }

    _inOrderForEachRec(node, queue) {
        if(node !== null) {
            this._inOrderForEachRec(node.left, queue);
            queue.push(node);
            this._inOrderForEachRec(node.right, queue);
        }
    }

    preOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }

        if (this._root !== null) {
            let stack = [this._root];

            while (stack.length > 0) {
                let node = stack.pop();
                callback(node);

                if (node.right !== null) {
                    stack.push(node.right);
                }

                if (node.left !== null) {
                    stack.push(node.left);
                }
            }
        }
    }

    postOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }

        let queue = [];
        this._postOrderForEachRec(this._root, queue);

        while(queue.length > 0) {
            let node = queue.shift();
            callback(node);
        } 
    }

    _postOrderForEachRec(node, queue) {
        if(node !== null) {
            this._postOrderForEachRec(node.left, queue);
            this._postOrderForEachRec(node.right, queue);
            queue.push(node);
        }
    }

    height(value) {
        let node = this.find(value);

        return node === null ? null : Math.max(this._nodeHeight(node.left), this._nodeHeight(node.right));
    }

    _nodeHeight(node) {
        if(node === null) {
            return -1;
        } else {
            return 1 + Math.max(this._nodeHeight(node.left), this._nodeHeight(node.right));
        }
    }

    depth(value) {
        let node = this._root, targetNode = this.find(value);
        let depth = 0;

        if (targetNode === null) {
            return null;
        } else {
            while(value !== node.value) {
                if(value < node.value) {
                    depth++;
                    node = node.left;
                } else {
                    depth++;
                    node = node.right;
                }
            }

            return depth;
        }
    }

    isBalanced() {
        let leftHeight = this._nodeHeight(this._root.left), rightHeight = this._nodeHeight(this._root.right);

        return ((leftHeight + 1) === rightHeight || leftHeight - 1 === rightHeight || leftHeight === rightHeight) ? true : false;
    }

    rebalance() {
        let array = this.treeToArray();

        this.buildTree(array);
    }

    treeToArray() {
        let array = [];
        
        this._treeToArrayRec(array, this._root);

        return array;
    }
    
    _treeToArrayRec(array, node) {
        if(node !== null) {
            array.push(node.value);
            this._treeToArrayRec(array, node.left);
            this._treeToArrayRec(array, node.right);
        }
    }

    printTree() {
        this._prettyPrint(this._root);
    }

    _prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this._prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
            this._prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    _sortArray(array) {
        let unsortedArray = [];

        array.forEach(element => {
            if(!unsortedArray.includes(element)) {
                unsortedArray.push(element);
            }
        });

        return mergeSortRec(unsortedArray);
    }
}