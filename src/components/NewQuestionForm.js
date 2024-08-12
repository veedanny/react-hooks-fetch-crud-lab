import React, { useState } from 'react';

const NewQuestionForm = ({ addQuestion }) => {
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuestion = { prompt, answers, correctIndex };
    addQuestion(newQuestion);
    setPrompt('');
    setAnswers(['', '', '', '']);
    setCorrectIndex(0);
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </label>
      <div>
        {answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          </label>
        ))}
      </div>
      <label>
        Correct Answer Index:
        <select value={correctIndex} onChange={(e) => setCorrectIndex(parseInt(e.target.value))}>
          {answers.map((_, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
};

export default NewQuestionForm;
