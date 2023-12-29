
class LinkedList {
    head = null;
    tail = null;

    static $Node = class Node {
        constructor(value = null, nextNode = null) {
            this.value = value;
            this.nextNode = nextNode;
        }
    }

    get size() {
        let count = 0;
        let cur = this.head;
        while(cur !== null) {
            count++;
            cur = cur.nextNode;
        }
        return count;
    }

    /**
     * Represents the LinkedList as strings. 
     * The format should be: `( value ) -> ( value ) -> ( value ) -> null`
     * @returns {String} the LinkedList represented as a string
     */
    toString() {
        if(this.head === null) {
            return 'null';
        }

        let cur = this.head;
        let str = '';
        while(cur !== null) {
            str += `( ${cur.value} ) -> `;
            cur = cur.nextNode;
        }
        str += 'null';

        return str;
    }

    /**
     * Adds a new node containing value to the start of the list
     * @param {*} value 
     * @returns the updated list
     */
    prepend(value) {
        // Works whether head is null or not
        this.head = new LinkedList.$Node(value, this.head);
        // If the LinkedList is originally empty, update the tail to point to the new node
        if(this.tail === null) {
            this.tail = this.head;
        }
        return this;
    }

    /**
     * Adds a new node containing value to the end of the list
     * @param {*} value 
     * @returns the updated list
     */
    append(value) {
        const newNode = new LinkedList.$Node(value, null);
        // Case: empty list
        if(this.head === null) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        // Case: list is not empty
        this.tail.nextNode = newNode;
        this.tail = newNode;
        return this;
    }

    /**
     * Removes the last element from the list
     * @returns Value of the removed element
     */
    pop() {
        if(this.head === null) {
            throw new Error('Array is empty');
        }
        // Single element in LinkedList
        if(this.head === this.tail) {
            const val = this.head.value;
            this.head = null;
            this.tail = null;
            return val;
        }

        let cur = this.head;
        // Traverse the list until we get to the second to last node
        while(cur.nextNode !== null) {
            if(cur.nextNode === this.tail) {
                const val = cur.nextNode.value;
                cur.nextNode = null;
                this.tail = cur;
                return val;
            }
            cur = cur.nextNode;
        }
    }

    /**
     * Returns the value at the given index
     * @param {Number} index 
     * @returns the value at the given index
     */
    at(index) {
        // Invalid index
        if(index === undefined || index < 0 || index >= this.size) {
            return undefined;
        }

        let curNode = this.head;
        let curIndex = 0;
        while(this.curNode !== null) {
            if(curIndex === index) {
                return curNode.value;
            }
            curNode = curNode.nextNode;
            curIndex++;
        }
    }

    /**
     * Returns true if the passed in value is in the list and otherwise returns false.
     * @param {*} value 
     * @returns {Boolean} whether the value is in the list
     */
    contains(value) {
        let cur = this.head;
        while(cur !== null) {
            if(cur.value === value) {
                return true;
            }
            cur = cur.nextNode;
        }
        return false;
    }

    /**
     * Returns the index of the node containing value, or null if not found.
     * @param {*} value 
     * @returns {Number|null} the index of the value
     */
    find(value) {
        let curNode = this.head;
        let curIndex = 0;
        while(curNode !== null) {
            if(curNode.value === value) {
                return curIndex;
            }
            curNode = curNode.nextNode;
            curIndex++;
        }
        return null;
    }
}
