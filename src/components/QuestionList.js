import React from 'react';

const QuestionList = ({ questions, deleteQuestion, updateQuestion }) => {
  const handleChange = (id, event) => {
    updateQuestion(id, { correctIndex: parseInt(event.target.value) });
  };

  return (
    <ul>
      {questions.map(question => (
        <li key={question.id}>
          <p>{question.prompt}</p>
          <select value={question.correctIndex} onChange={(e) => handleChange(question.id, e)}>
            {question.answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer}
              </option>
            ))}
          </select>
          <button onClick={() => deleteQuestion(question.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default QuestionList;
