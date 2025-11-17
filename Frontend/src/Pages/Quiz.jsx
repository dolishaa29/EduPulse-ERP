import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../CSS/answer.css';

const QuizDetails = () => {
  const { title } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answers, setAnswers] = useState({});
  const [token, setToken] = useState('');

  useEffect(() => {
    const Token = Cookies.get('token');
    if (Token) {
      setToken(Token);
    }
  }, []);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/viewAssessment/${title}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setQuiz(response.data.quiz);
        setLoading(false);
      } catch (err) {
        setError('Error fetching quiz details');
        setLoading(false);
      }
    };

    if (token) {
      fetchQuizDetails();
    }
  }, [title, token]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('Please log in to submit your answers.');
      return;
    }

    const submissionData = {
      quizTitle: quiz.title,
      answers,
    };

    try {
      const response = await axios.post('http://localhost:7000/AssessmentSubmission', submissionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      alert(response.data.msg);
    } catch (err) {
      setError('Error submitting quiz');
    }
  };

  if (loading) {
    return <div>Loading quiz details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div>
      <h2>{quiz.title}</h2>
      <form onSubmit={handleSubmit}>
        <h3>Questions:</h3>
        <ul>
          {quiz.questions.map((question, index) => (
            <li key={question.questionId}>
              <p>{index + 1}. {question.questionText}</p>
              <ul>
                {Object.keys(question.options).map(optionKey => (
                  <li key={optionKey}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${question.questionId}`}
                        value={question.options[optionKey]}
                        onChange={() => handleAnswerChange(question.questionId, question.options[optionKey])}
                      />
                      {question.options[optionKey]}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuizDetails;
