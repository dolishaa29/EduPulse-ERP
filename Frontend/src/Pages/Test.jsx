import React, { useEffect, useState } from 'react';
import axios from "axios";
import Box3 from '../components/box3/Box3';

const Test = () => {
  const [questions, setQuestions] = useState([]); 

  const fetchQuestionData = async () => {
    try {
      const response = await axios.get("http://localhost:7000/viewquestion"); 
      const data = response.data.form; 
      setQuestions(data); 
    } catch (error) {
      console.error("Error fetching questions data:", error); 
    }
  };

  useEffect(() => {
    fetchQuestionData(); 
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Questions</h1> 
      <form>
        {questions.map((question) => (
          <Box3 _id={question._id} question={question.question} option1={question.option1} option2={question.option2} option3={question.option3} option4={question.option4} /> 
        ))}
      </form>
    </div>
  );
};

export default Test;
