
class LinkedList {
    head = null;
    tail = null;

    static $Node = class Node {
        constructor(value = null, nextNode = null) {
            this.value = value;
            this.nextNode = nextNode;
        }
    }

    prepend(value) {
        // Works whether head is null or not
        this.head = new LinkedList.$Node(value, this.head);
        // If the LinkedList is originally empty, update the tail to point to the new node
        if(this.tail === null) {
            this.tail = this.head;
        }
        return this;
    }

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

    get size() {
        let count = 0;
        let cur = this.head;
        while(cur !== null) {
            count++;
            cur = cur.nextNode;
        }
        return count;
    }

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
}

const linkedList = new LinkedList();
linkedList.append(1).append(2).append(1).append(31).append(192);
console.log(linkedList.toString());

const linkedList2 = new LinkedList();
linkedList2.prepend(1).prepend(2).prepend(1).prepend(31).prepend(192);
console.log(linkedList2.toString());
