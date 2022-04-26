import storageAvailable from './modules/checkstorage.js';
import {
  menuLinks, titleInput, authorInput, submitBtn,
} from './modules/navigation.js';
import showSection from './modules/showsection.js';
import resetInput from './modules/clearinputs.js';
import BookManager from './modules/bookmanager.js';
import setTime from './modules/datetime.js';

// init book object
const book = new BookManager();

if (storageAvailable('localStorage')) {
  window.addEventListener('load', () => {
    book.displayLibrary();
  });
  submitBtn.addEventListener('click', () => {
    book.addBook(titleInput.value, authorInput.value);
    resetInput();
  });
}

menuLinks.forEach((link) => {
  link.addEventListener('click', showSection);
});

// Set timeDate
setTime();
