
function analyzeArray(arr) {
    if(arr.length === 0) throw new Error('Error: Empty array');
    const sum = arr.reduce((acc, cur) => acc + cur, 0);
    return {
        average: sum / arr.length,
        min: Math.min(...arr),
        max: Math.max(...arr),
        length: arr.length
    }
}

export { analyzeArray };