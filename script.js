let booksCollection = []
let booksHtmlList = document.querySelector("ol.books-list")
let booksCounter = document.querySelector("span.number")
let form = document.querySelector("form.new-book-form")

function refreshBookList() {
    booksHtmlList.replaceChildren()
    for (let i = 0; i < booksCollection.length; i++) {
        let bookitemHtml = booksCollection[i].getHtmlItem()


        booksHtmlList.appendChild(bookitemHtml)
    }

    booksCounter.textContent = booksCollection.length
}

function addBook(event) {
    event.preventDefault()

    let book = new BookItem(booksCollection.length,
        form.querySelector("input#book-name").value,
        form.querySelector("input#book-author").value,
        form.querySelector("textarea#book-summary").value
    )

    form.reset()
    booksCollection.push(book)
    refreshBookList()
}

function deleteBook(event) {
    let bookId = event.target.closest("li.book-item").id
    let bookFinder = (value) => value.id != bookId

    booksCollection = booksCollection.filter(bookFinder)
    refreshBookList()
}

class BookItem {

    constructor(id, bookName, bookAuthor, bookSummary) {
        this.id = id
        this.name = bookName
        this.author = bookAuthor
        this.summary = bookSummary
    }

    getHtmlItem() {
        let listItem = document.createElement("li")
        listItem.id = this.id
        listItem.className = "book-item"
        let bookCard = document.createElement("div")
        bookCard.className = "book-item-card"
        let cardHeader = document.createElement("div")
        cardHeader.className = "card-header"
        let name = document.createElement("p")
        name.className = "book-name"
        let author = document.createElement("p")
        author.className = "author"
        author.append("by ")
        let authorName = document.createElement("span")
        authorName.className = "author-name"
        let deleteButton = document.createElement("button")
        deleteButton.className = "delete-button"
        let deleteButtonImg = document.createElement("img")
        deleteButtonImg.src = "images/delete.png"
        deleteButtonImg.alt = "Delete book button"
        let bookSummary = document.createElement("p")
        bookSummary.className = "book-summary"
        let bookSummaryStart = document.createElement("span")
        bookSummaryStart.append("Summary: ")

        listItem.appendChild(bookCard)
        bookCard.append(cardHeader, bookSummary)
        cardHeader.append(name, author, deleteButton)
        author.appendChild(authorName)
        deleteButton.appendChild(deleteButtonImg)
        bookSummary.appendChild(bookSummaryStart)

        name.append(this.name)
        authorName.append(this.author)
        bookSummary.append(this.summary)

        deleteButton.addEventListener("click", deleteBook)

        return listItem
    }


}

form.addEventListener("submit", addBook)