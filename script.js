let placeholderBookItem = document.querySelector("li.book-item")
let booksList = document.querySelector("ol.books-list")
let form = document.querySelector("form.new-book-form")
let booksCounter = document.querySelector("span.number")
placeholderBookItem.remove()
let booksCollection = []

function refreshBookList() {
    booksList.replaceChildren()
    for (let i = 0; i < booksCollection.length; i++) {
        let book = booksCollection[i]
        let bookItem = placeholderBookItem.cloneNode(true)
        bookItem.querySelector(".book-name").textContent = book.bookName
        bookItem.querySelector(".author-name").textContent = book.bookAuthor
        bookItem.querySelector(".book-summary").textContent = book.bookSummary
        bookItem.querySelector("button.delete-button").addEventListener("click", deleteBook)
        booksList.appendChild(bookItem)
    }

    booksCounter.textContent = booksList.children.length
}

function addBook(event) {
    event.preventDefault()

    let book = new Book(form.querySelector("input#book-name").value,
        form.querySelector("input#book-author").value,
        form.querySelector("textarea#book-summary").value
    )

    form.reset()
    booksCollection.push(book)
    refreshBookList()
}

function deleteBook(event) {
    let bookName = event.target.closest("div.book-item-card").querySelector(".book-name").textContent
    let bookFinder = (value) => value.bookName != bookName

    booksCollection = booksCollection.filter(bookFinder)
    refreshBookList()
}

function Book(bookName, bookAuthor, bookSummary) {
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.bookSummary = bookSummary;
}

form.addEventListener("submit", addBook)


