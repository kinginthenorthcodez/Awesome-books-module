// Nav bar Menu
import {
  welcomeMsg, libraryContainer, form, contact,
} from './navigation.js';

const showSection = (e) => {
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
};

export default showSection;