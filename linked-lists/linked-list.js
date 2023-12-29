
class LinkedList {
    head = null;
    tail = null;

    static $Node = class Node {
        constructor(value = null, nextNode = null) {
            this.value = value;
            this.nextNode = nextNode;
        }
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
linkedList.append(1);
linkedList.append(1);
linkedList.append(2);
linkedList.append(1);
linkedList.append(31);
linkedList.append(192);
console.log(linkedList.toString());