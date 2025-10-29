import React, { useState, useEffect } from "react";
import axios from "axios";
import '../CSS/Question.css';

const Question = () => {
  
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => 
    {
      try {
        const response = await axios.get("http://localhost:7000/viewquestion");
        setQuestions(response.data.form);
        alert(response.data.form); 
      } catch (err) {
        console.error("Failed to load questions", err);
      }
    }


useEffect(() => {
        fetchQuestions(); 
    }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/deletequestion/${id}`);
      setQuestions(questions.filter((question) => question._id !== id));
    } catch (err) {
      console.error("Failed to delete the question", err);
    }
  };

  return (
    <div className="ViewPage">
      <div className="ViewPagecontainer">
        <h1>All Questions</h1>

        <div className="questionslist">
          {questions.map((question) => (
            
              <div className="questioncard">
                <h3>{question.question}</h3>
                <ul>
                  <li>Option 1: {question.option1}</li>
                  <li>Option 2: {question.option2}</li>
                  <li>Option 3: {question.option3}</li>
                  <li>Option 4: {question.option4}</li>
                  <li><strong>Answer: </strong>{question.answer}</li>
                </ul>

                <div className="buttons">
                  <button className="edit">Edit</button>
                  <button className="delete" onClick={() => handleDelete(question._id)} >Delete</button>
                </div>
              </div>
         
            ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
