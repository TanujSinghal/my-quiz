import {React, useState } from 'react';
import Data from '../Data';
import { useNavigate } from "react-router-dom";

export default function Quiz(prop) {
  
  const [questionIndex, setQuestionIndex] = useState(0);

  let questionnaire = Data();
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onChangeValue = function(e) {
    setAnswer(e.target.value);
  }

  const navigate = useNavigate();
  const nextQuestion = function(){
    setSubmitted(true);
    if (answer) {
      prop.onAnswerSubmit({questionIndex, answer});
      if (questionIndex < questionnaire.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setAnswer('');
        setSubmitted(false);
      }
      else {
        navigate("/summary");
      }
    }
  }

  const skipQuestion = function(){
    prop.onAnswerSubmit({questionIndex, answer});
    if (questionIndex < questionnaire.length - 1) {
      setSubmitted(false);
      setQuestionIndex(questionIndex + 1);
    }
    else {
      navigate("/summary");
    }
  }

const doSomething = () => {/*to eliminate warning*/}

  return (
    <div>
      <p>Q.{questionIndex+1}) {questionnaire[questionIndex].question}</p>
      <div onChange={onChangeValue}>
        { questionnaire[questionIndex].options.map((element, index) => 
        <p key={index}>
          <input type="radio" value={index} name="question" checked={answer && (index === parseInt(answer)) ? true : false} onChange={doSomething}></input>
          {element}
        </p>
        ) }
      </div>
      { !answer && submitted ? <p className="error">Please select an option</p> : null }
      <div className="footer">
        <button onClick={skipQuestion}>SKIP</button>
        <button onClick={nextQuestion}>SUBMIT</button>
      </div>
    </div>
  )
}
