import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/library.css";

const AddBook = () => {
  const [formData, setFormData] = useState({
    bookId: "",
    bookName: "",
    author: "",
    quantity: "",
    description: "",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("bookId", formData.bookId);
    data.append("bookName", formData.bookName);
    data.append("author", formData.author);
    data.append("quantity", formData.quantity);
    data.append("description", formData.description);
    data.append("category", formData.category);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:7000/addbook", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setFormData({
          bookId: "",
          bookName: "",
          author: "",
          quantity: "",
          description: "",
          category: "",
          image: null,
        });

        navigate("/Dashboard"); 
      }
    } catch (err) {
      console.error(err);
      setError("Error while adding the book!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Registration">
      <div className="Registration-container">
        <h1>Add New Book</h1>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="Registrationfield">
            <input
              type="text"
              placeholder="Book ID"
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Book Name"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
