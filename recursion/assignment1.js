
function fibs(n) {
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const arr = [0, 1];
    for (let i = 2; i < n; i++) {
        const [prev1, prev2] = [arr[i - 1], arr[i - 2]];
        arr.push(prev1 + prev2);
    }
    return arr;
}

function fibsRec(n) {
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const arr = fibsRec(n - 1);
    const [prev1, prev2] = [arr[n-2], arr[n-3]]; // n - 1 terms in arr, so n - 2 is its last index
    arr.push(prev1 + prev2);
    return arr;
}
