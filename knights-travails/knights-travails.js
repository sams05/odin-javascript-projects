
class Node {
    constructor(coord, prev = null) {
        this.coord = coord;
        this.prev = prev;
    }

    static BOARD_DIM = 8;

    getPath() {
        if (this.prev === null) return [this.coord];

        // Get path to previous node then add current node to the end of the path
        const path = this.prev.getPath();
        path.push(this.coord);
        return path;
    }

    getNeighbors() {
        const [x, y] = this.coord;
        const neighbors = [];
        // The nested for loops will give the 8 pairings between xShift and yShift to produce all the
        // possible moves of a knight. ref: image on https://www.theodinproject.com/lessons/javascript-knights-travails
        for (let xShift = -2; xShift <= 2; xShift++) {
            if (xShift === 0) continue;
            const newX = x + xShift;
            // Total shifts for knights for any move is 3, so 3 - |xShift| will get |yShift|
            const yShift = -(3 - Math.abs(xShift));
            for (const yShiftOrientation of [-1, 1]) {
                const newY = y + yShiftOrientation * yShift;
                // Validate that the coordinate of the neighbor is within the board
                if (newX >= 0 && newX < Node.BOARD_DIM && newY >= 0 && newY < Node.BOARD_DIM) {
                    neighbors.push(new Node([newX, newY], this));
                }
            }
        }
        return neighbors;
    }
}

Object.defineProperty(Node, 'BOARD_DIM', {
    writable: false,
    configurable: false
});

// prettier-ignore
/*
// Pseudo-code
// BFS:
// Create queue
// Add coordStart to queue
// while queue is not empty
    // pop node from queue
        // if node.coord = coordEnd
            // return path to current node
    // add neighbors to queue with reference to current node
// return null (not found)
*/
function knightMoves(coordStart, coordEnd) {
    const queue = [];
    queue.push(new Node(coordStart));

    while (queue.length > 0) {
        const curNode = queue.shift();
        if (curNode.coord[0] === coordEnd[0] && curNode.coord[1] === coordEnd[1]) {
            return curNode.getPath();
        }

        const neighbors = curNode.getNeighbors();
        queue.push(...neighbors);
    }
    return null;
}

export { knightMoves };
