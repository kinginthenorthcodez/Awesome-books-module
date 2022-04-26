import { libraryContainer } from './navigation.js';

class BookManager {
  constructor() {
    this.library = JSON.parse(localStorage.getItem('Books')) || [];
  }

  removeBook(e) {
    this.library = JSON.parse(localStorage.getItem('Books')) || [];
    const bookId = e.target.id;
    const filteredLibrary = this.library.filter((book) => book.id !== bookId);
    localStorage.setItem('Books', JSON.stringify(filteredLibrary));

    e.target.parentElement.remove();

    if (this.library.length === 1) {
      const tmpBox = document.querySelector('#tmp-box');
      if (tmpBox) tmpBox.remove();
    }
  }

  displayLibrary() {
    this.library = JSON.parse(localStorage.getItem('Books')) || [];

    let tmpBox = document.querySelector('#tmp-box');
    if (tmpBox) tmpBox.remove();

    tmpBox = document.createElement('div');
    tmpBox.classList.add('tmp-cont');
    tmpBox.id = 'tmp-box';

    if (this.library.length !== 0) {
      this.library.forEach((item) => {
        const bookCont = document.createElement('div');
        bookCont.classList.add('book-cont');

        const bookData = document.createElement('h2');
        bookData.textContent = `"${item.title}" by ${item.author}`;
        bookData.classList.add('book-info');
        bookCont.appendChild(bookData);

        const removeBtn = document.createElement('button');
        removeBtn.id = item.id;
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'Remove';
        bookCont.appendChild(removeBtn);

        removeBtn.addEventListener('click', this.removeBook);

        tmpBox.appendChild(bookCont);
      });
      libraryContainer.appendChild(tmpBox);
    }
  }

  addBook(title, author) {
    this.library = JSON.parse(localStorage.getItem('Books')) || [];
    const bookId = Math.random().toString(36).replace(/[^a-z]+/g, '').slice(2, 5);
    const newBook = { title, author, id: bookId };
    this.library.push(newBook);
    localStorage.setItem('Books', JSON.stringify(this.library));
    this.displayLibrary();
  }
}

export default BookManager;