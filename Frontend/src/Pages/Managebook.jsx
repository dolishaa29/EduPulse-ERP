import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Managebook = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const fetchIssuedBooks = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        alert("You are not authenticated. Please log in.");
        navigate('/login');  
        return;
      }

      const res = await axios.get('http://localhost:7000/issued', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log('API Response:', res.data); 
      if (res.data.success) {
        setIssuedBooks(res.data.books );  
      } else {
        setError('No books found or failed to fetch books.');
        setIssuedBooks([]); 
      }
    } catch (err) {
      console.error('Error fetching books:', err);
      if (err.response && err.response.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/login');
      } else {
        setError('Failed to fetch issued books.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      alert("Returning book with ID: " + bookId);
      const token = Cookies.get('token');
      if (!token) {
        alert("You are not authenticated. Please log in.");
        navigate('/login'); 
        return;
      }

      const res = await axios.post(
        'http://localhost:7000/returnbook',
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) { 
        setIssuedBooks(prevBooks => prevBooks.filter(book => book.bookId !== bookId));
      }
    } catch (err) {
      console.error('Error returning book:', err);
      if (err.response && err.response.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/login');
      } else {
        alert('Error returning the book!');
      }
    }
  };

  return (
    <div>
      <h1>Issued Books</h1>

      {loading && <p>Loading issued books...</p>}
      {error && <p>{error}</p>}
      {issuedBooks.length === 0 && !loading && <p>No books issued.</p>}

      <ul>
        {issuedBooks.length > 0 ? (
          issuedBooks.map((book) => (
            <li key={book.bookId}>
              <div>
                <h3>{book.studentName}</h3>
                <p>Book ID: {book.bookId}</p>
                <p>Issued on: {new Date(book.date).toLocaleString()}</p>
                <p>Action: {book.action}</p>
                <button onClick={() => handleReturn(book.bookId)}>Return Book</button>
              </div>
            </li>
          ))
        ) : (
          <p>No books issued.</p> 
        )}
      </ul>
    </div>
  );
};

export default Managebook;
