import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import NewQuestionForm from './NewQuestionForm';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch questions from the API
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:4000/questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const addQuestion = async (newQuestion) => {
    try {
      const response = await fetch('http://localhost:4000/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion),
      });
      const data = await response.json();
      setQuestions([...questions, data]);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'DELETE',
      });
      setQuestions(questions.filter(question => question.id !== id));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const updateQuestion = async (id, updatedData) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      setQuestions(questions.map(question =>
        question.id === id ? { ...question, ...updatedData } : question
      ));
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div>
      <h1>Quiz App</h1>
      <NewQuestionForm addQuestion={addQuestion} />
      {loading ? <p>Loading...</p> : <QuestionList questions={questions} deleteQuestion={deleteQuestion} updateQuestion={updateQuestion} />}
    </div>
  );
};

export default App;
