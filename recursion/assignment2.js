
/**
 * Takes in an array and returns a sorted array using merge sort
 * @param {Array<*>} arr Array to sort
 * @returns sorted array
 */
function mergeSort(arr) {
    // Base case: Array of just one (or no element) is already sorted
    if (arr.length <= 1) return arr;

    // Recursive case: sort the left and right half of the array then merge
    const midIdx = Math.floor(arr.length / 2);
    let leftHalf = arr.slice(0, midIdx);
    let rightHalf = arr.slice(midIdx);
    leftHalf = mergeSort(leftHalf);
    rightHalf = mergeSort(rightHalf);

    // Merge
    const sortedArr = [];
    // Iteratively add in the smallest element by comparing the smallest element from each half
    // of the array
    while (leftHalf.length !== 0 && rightHalf.length !== 0) {
        if (leftHalf[0] <= rightHalf[0]) {
            sortedArr.push(leftHalf.shift());
        } else {
            sortedArr.push(rightHalf.shift());
        }
    }
    // Push in the rest of the element from the nonempty array
    if (leftHalf.length === 0) {
        sortedArr.push(...rightHalf);
    } else {
        sortedArr.push(...leftHalf);
    }
    return sortedArr;
}

/**
 * Generates an array of random numbers
 * @param {Number} length Length of array
 * @param {Number} max Largest possible number in the array
 * @returns {Array<Number>}
 */
function randArr(length, max) {
    const arr = [];
    for(let i = 0; i < length; i++) {
        arr.push(Math.ceil(Math.random()*max));
    }
    return arr;
}
const test = randArr(12, 100);
console.log(test);
console.log(mergeSort(test));