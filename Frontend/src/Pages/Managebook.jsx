import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Managebook = () => {
  const [issuedBooks, setIssuedBooks] = useState([]); // Store books here
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const fetchIssuedBooks = async () => {
    try {
      // Fetch books from the backend
      const res = await axios.get("http://localhost:7000/issued", { withCredentials: true });

      console.log('API Response:', res.data); // Log the response to inspect the structure

      // Directly assign the response books to state if the structure is correct
      if (res.data.success && res.data.books) {
        setIssuedBooks(res.data.books); // Use 'books' or adjust based on your API response
      } else {
        setError('No books found or failed to fetch books.');
      }
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to fetch issued books.');
    } finally {
      setLoading(false); // End loading state
    }
  };

  const handleReturn = async (bookId) => {
    try {
      const token = Cookies.get('token'); // Get the token from cookies
      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }

      // Send a request to return the book
      const res = await axios.post(
        "http://localhost:7000/returnbook", 
        { bookId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // If the return is successful, update the list of books
      if (res.data.success) {
        setIssuedBooks(prevBooks => prevBooks.filter(book => book.bookId !== bookId));
      }
    } catch (err) {
      console.error('Error returning book:', err);
      alert('Error returning the book!');
    }
  };

  return (
    <div>
      <h1>Issued Books</h1>

      {/* Loading State */}
      {loading && <p>Loading issued books...</p>}

      {/* Error Handling */}
      {error && <p>{error}</p>}

      {/* Check if books are available */}
      {issuedBooks.length === 0 && !loading && <p>No books issued.</p>}

      {/* List of Issued Books */}
      <ul>
        {issuedBooks.map((book) => (
          <li key={book.bookId}>
            <div>
              <h3>{book.studentName}</h3>
              <p>Book ID: {book.bookId}</p>
              <p>Issued on: {new Date(book.date).toLocaleString()}</p>
              <p>Action: {book.action}</p>
              <button onClick={() => handleReturn(book.bookId)}>Return Book</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Managebook;
