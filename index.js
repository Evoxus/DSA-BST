class BST {
  constructor(
    key = null,
    value = null,
    parent = null,
    right = null,
    left = null
  ) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.right = right;
    this.left = left;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BST(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BST(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Error");
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error("Key not found");
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

const numBST = new BST();

numBST.insert(3, 3);
numBST.insert(1, 1);
numBST.insert(4, 4);
numBST.insert(6, 6);
numBST.insert(9, 9);
numBST.insert(2, 2);
numBST.insert(5, 5);
numBST.insert(7, 7);

// console.log(numBST);

const question = new BST();

question.insert("E", "E");
question.insert("A", "A");
question.insert("S", "S");
question.insert("Y", "Y");
question.insert("Q", "Q");
question.insert("U", "U");
question.insert("E", "E");
question.insert("S", "S");
question.insert("T", "T");
question.insert("I", "I");
question.insert("O", "O");
question.insert("N", "N");

// console.log(question);

/* What does this program do?
 * Without running this code in your code editor, explain what the following program does.
 * Show with an example the result of executing this program. Assuming we used the numBST above the
 * output would be 37 as this program sums the values in a tree (or concatenates strings with 0 being
 * inserted at null nodes).
 * What is the runtime of this algorithm? O(n)
 *
 * function tree(t){
 *     if(!t){
 *         return 0;
 *     }
 *     return tree(t.left) + t.value + tree(t.right)
 * }
 */

/* Height of a BST
 * Write an algorithm to find the height of a binary search tree. What is the time complexity of your
 * algorithm?
 */

function height(tree, count = 0) {
  if (tree === null) {
    return count;
  }
  if (height(tree.left, count + 1) > height(tree.right, count + 1)) {
    return height(tree.left, count + 1);
  }
  return height(tree.right, count + 1);
}

// console.log('height test case: ', height(numBST));

/* 6. Is it a BST?
 * Write an algorithm to check whether an arbitrary binary tree is a binary search tree, assuming
 * the tree does not contain duplicates.
 */

function isBST(tree) {
  if (tree !== null && isBST(tree.left) > isBST(tree.right)) {
    return false;
  }
  return true;
}

// console.log('isBST test case: ', isBST(numBST));

/* 7. 3rd largest node
 * Write an algorithm to find the 3rd largest node in a binary search tree.
 */

function thirdLargest(tree, k, count) {
  if (tree == null) {
    return null;
  }

  count++;
  if (count === k) {
    return `${tree.key} is the 3rd largest node`;
  }
  if (count < k) {
    return thirdLargest(tree.right, k, count);
  }

  return thirdLargest(tree.left, k, count);
}

// console.log("thirdLargest test case: ", thirdLargest(numBST, 3, 0));

/* 8. Balanced BST
 * Write an algorithm that checks if a BST is balanced (i.e., a tree where no 2 leaves differ in
 * distance from the root by more than 1).
 */

function isBalanced(tree) {
  if (!tree) {
    return true;
  }
  let diff = Math.abs(height(tree.left) - height(tree.right));
  if (diff > 1) {
    return false;
  } else {
    return isBalanced(tree.left) && isBalanced(tree.right);
  }
}

// console.log('isBalanced test case: ', isBalanced(numBST));

/* 9. Are they the same BSTs?
 * You are given two arrays which represent two sequences of keys that are used to create two binary
 * search trees. Write a program that will tell whether the two BSTs will be identical or not without
 * actually constructing the tree. You may use another data structure such as an array or a linked list
 * but don't construct the BST. What is the time complexity of your algorithm? E.g., 3, 5, 4, 6, 1, 0, 2
 * and 3, 1, 5, 2, 4, 6, 0 are two sequences of arrays but will create the exact same BSTs and your program
 * should return true.
 */

function sameBST(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  if (array1.length === 0) {
    return true;
  }
  if (array1[0] !== array2[0]) {
    return false;
  }
  const array1left = [];
  const array1right = [];
  const array2left = [];
  const array2right = [];

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] < array1[0]) {
      array1left.push(array1[i]);
    } else {
      array1right.push(array1[i]);
    }
    for (let i = 0; i < array2.length; i++) {
      if (array2[i] < array2[0]) {
        array2left.push(array2[i]);
      } else {
        array2right.push(array2[i]);
      }
    }
  }

  return sameBST(array1left, array2left) && sameBST(array1right, array2right);
}

console.log(
  "sameBST test case: ",
  sameBST([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0])
); // true
