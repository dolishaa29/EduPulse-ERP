import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Test.css';

const createInitialQuestions = () => {
  return Array.from({ length: 3 }, () => ({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  }));
};

const Test = () => {
  const [quizTitle, setQuizTitle] = useState('New ERP Assessment');
  const [questions, setQuestions] = useState(createInitialQuestions());
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, option) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = option;
    setQuestions(newQuestions);
  };

  const validateQuiz = () => {
    for (const question of questions) {
      if (!question.text || question.options.some(option => !option) || !question.correctAnswer) {
        setMessage('Please fill all the question fields.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateQuiz()) return;

    setIsSaving(true);
    setMessage('');

    const quizData = {
      title: quizTitle,
      questions,
    };

    try {
      const response = await axios.post('http://localhost:7000/addquestion', quizData);
      setMessage('Quiz successfully saved!');
      setQuestions(createInitialQuestions());
      setQuizTitle('');
    } catch (error) {
      setMessage(`Error saving quiz: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container">
      <h1>Create a Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quiz Title</label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Quiz Title"
            required
          />
        </div>

        {questions.map((q, index) => (
          <div key={index}>
            <h3>Question {index + 1}</h3>
            <div>
              <label>Question Text</label>
              <input
                type="text"
                value={q.text}
                onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                placeholder="Enter question text"
                required
              />
            </div>

            {['A', 'B', 'C', 'D'].map((option, i) => (
              <div key={i}>
                <label>{`Option ${option}`}</label>
                <input
                  type="text"
                  value={q.options[i]}
                  onChange={(e) => handleOptionChange(index, i, e.target.value)}
                  placeholder={`Option ${option}`}
                  required
                />
              </div>
            ))}

            <div>
              <label>Correct Answer</label>
              <select
                value={q.correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                required
              >
                <option value="">Select Correct Answer</option>
                {['A', 'B', 'C', 'D'].map((option) => (
                  <option key={option} value={option}>Option {option}</option>
                ))}
              </select>
            </div>
          </div>
        ))}

        {message && <p>{message}</p>}
        <button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Quiz'}
        </button>
      </form>
    </div>
  );
};

export default Test;
