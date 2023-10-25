import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About.js';
import Contact from '../pages/Contact.js';
import AuthorList from '../pages/Author';
import AuthorCreate from '../pages/AuthorCreate';
import AuthorEdit from '../pages/AuthorEdit';
import BookList from '../pages/Book';
import BookCreate from '../pages/BookCreate';
import BookEdit from '../pages/BookEdit';

function MyRouter() {  
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about-us' element={<About />} />
      <Route path='/contact-us' element={<Contact />} />
      <Route path='/authors' element={<AuthorList />} />
      <Route path='/authors/create' element={<AuthorCreate />} />
      <Route path='/authors/:id/edit' element={<AuthorEdit />} />
      <Route path='/books' element={<BookList />} />
      <Route path='/books/create' element={<BookCreate />} />
      <Route path='/books/:id/edit' element={<BookEdit />} />
    </Routes>
  );
}

export default MyRouter;
