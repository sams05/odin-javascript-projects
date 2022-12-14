let myLibrary = [
    new Book('title1', 'author1', 32, true), 
    new Book('title2', 'author2', 42, false), 
    new Book('title3', 'author3', 291, false)
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
};

Book.prototype.changeStatus = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function removeAllChildren(parentNode) {
    while(parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}

// Create button in table cell
function createCellButton(text, btnClass, attr) {
    const bookRemovalTd = document.createElement('td');
    const bookRemovalBtn = document.createElement('button');
    bookRemovalBtn.textContent = text;
    bookRemovalBtn.classList.add(btnClass);
    bookRemovalBtn.setAttribute('type', 'button');
    bookRemovalBtn.setAttribute(attr.attr, attr.value);
    bookRemovalTd.appendChild(bookRemovalBtn);
    return bookRemovalTd;
}

function addEventListenerList(list, event, func) {
    for(let node of list) {
        node.addEventListener(event, func);
    }
}

function removeBookHandler() {
    const idx = this.dataset.idx;
    myLibrary.splice(idx, 1);
    displayBooks();
}

function toggleStatusHandler() {
    const idx = this.dataset.idx;
    myLibrary[idx].changeStatus();
    displayBooks();
}

function displayBooks() {
    const tableBody = document.querySelector('tbody');
    removeAllChildren(tableBody);
    for(let [idx, book] of myLibrary.entries()) {
        const tr = document.createElement('tr');
        for(let field in book) {
            if(!book.hasOwnProperty(field)) {
                // Skip over book.info method
                break;
            }
            const td = document.createElement('td');
            td.textContent = book[field];
            tr.appendChild(td);
        }
        const btnAttr = {
            attr: 'data-idx',
            value: idx
        };
        // Create read status change button
        tr.appendChild(createCellButton('????', 'statusChangeBtn', btnAttr));
        // Create book removal button
        tr.appendChild(createCellButton('??', 'removalBtn', btnAttr));
        tableBody.appendChild(tr);
    }
    // Attach event handlers
    const removalBtns = document.querySelectorAll('.removalBtn');
    addEventListenerList(removalBtns, 'click', removeBookHandler);
    const statusChangeBtns = document.querySelectorAll('.statusChangeBtn');
    addEventListenerList(statusChangeBtns, 'click', toggleStatusHandler);

}

function toggleForm() {
    const form = document.querySelector('form');
    form.classList.toggle('hidden');
}

function newBookHandler() {
    const form = document.forms[0];
    const author = form.elements.author.value;
    const title = form.elements.title.value;
    const pages = +form.elements.pages.value;
    const read = form.elements.read.checked;
    addBookToLibrary(author, title, pages, read);
    displayBooks();
}

displayBooks();

const formToggleBtn = document.querySelector('#form-toggle-btn');
formToggleBtn.addEventListener('click', toggleForm);

const submitBookBtn = document.querySelector('#submit-book-btn');
submitBookBtn.addEventListener('click', newBookHandler);
