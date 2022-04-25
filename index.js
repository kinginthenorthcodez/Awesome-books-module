// Extracted function from lesson
function storageAvailable(type) {
  let storage;
  try {
    const x = '__storage_test__';
    storage = window[type];
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException
        // everything except Firefox
        && (e.code === 22
          // Firefox
          || e.code === 1014
          // test name field too, because code might not be present
          // everything except Firefox
          || e.name === 'QuotaExceededError'
          // Firefox
          || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
        // acknowledge QuotaExceededError only if there's something already stored
        && storage
        && storage.length !== 0
    );
  }
}

const menuLinks = document.querySelectorAll('.link-item');

const date = document.querySelector('.date-item');

const welcomeMsg = document.querySelector('.welcome-msg');

const libraryContainer = document.querySelector('#library-container');

const form = document.querySelector('.form-container');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const submitBtn = document.querySelector('#btn');

const contact = document.querySelector('.contact');

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

const book = new BookManager();
function resetInput() {
  titleInput.value = '';
  authorInput.value = '';
}

if (storageAvailable('localStorage')) {
  window.addEventListener('load', () => {
    book.displayLibrary();
  });
  submitBtn.addEventListener('click', () => {
    book.addBook(titleInput.value, authorInput.value);
    resetInput();
  });
}

// Nav bar Menu

function showSection(e) {
  if (e.target.id === 'list') {
    libraryContainer.style.display = 'block';
    form.style.display = 'none';
    contact.style.display = 'none';
    welcomeMsg.style.display = 'none';
  } else if (e.target.id === 'add-new') {
    libraryContainer.style.display = 'none';
    form.style.display = 'block';
    contact.style.display = 'none';
    welcomeMsg.style.display = 'none';
  } else if (e.target.id === 'contact') {
    libraryContainer.style.display = 'none';
    form.style.display = 'none';
    contact.style.display = 'flex';
    welcomeMsg.style.display = 'none';
  }
}

menuLinks.forEach((link) => {
  link.addEventListener('click', showSection);
});

// Date

date.textContent = new Date().toUTCString();
