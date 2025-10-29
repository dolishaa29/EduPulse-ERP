import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:7000/viewbook", {
        withCredentials: true, 
      });
      if (response.data.book) {
        setBooks(response.data.book);  
      } else {
        throw new Error("No books found in response");
      }
    } catch (err) {
      setError("Failed to fetch books: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchBooks();  
  }, []);

  const handleIssue = async (bookId) => {
    setLoading(true);  

    const token = Cookies.get("emtoken");  
    console.log("Token:", token); 
    if (token=='undefined') {
      alert("You must be logged in to issue a book!");
      setLoading(false);
      return;
    }


    try {
      const response = await axios.post(
        `http://localhost:7000/issuebook`,
         {bookId: bookId},
        {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
          withCredentials: true, 
        }
      );

      if (response.status === 200) {
        alert("Book issued successfully");
      } else {
        alert("Failed to issue book: " + response.data.msg);
      }
    } catch (err) {
      console.error("Error while issuing book:", err);
      alert("Failed to issue book: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="book-list">
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        books.map((book) => (
          <div className="book-card" key={book._id}>
            <img src={`/images/${book.image}`} alt={book.bookName} />
            <h3>{book.bookName}</h3>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <p>Category: {book.category}</p>
            <p>Status: {book.status}</p>
            <button 
              onClick={() => handleIssue(book._id)} 
              disabled={book.status !== "Available"}  
            >
              {loading ? "Issuing..." : "Issue"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewBooks;
