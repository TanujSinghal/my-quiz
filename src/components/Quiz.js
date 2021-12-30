import {React, useState, useEffect } from 'react';
import Data from '../Data';
import { useNavigate } from "react-router-dom";

export default function Quiz(prop) {
  
  const [questionIndex, setQuestionIndex] = useState(0);

  let questionnaire = Data();
  let timeoutDuration = 20;
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft]  = useState(timeoutDuration);

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
      setTimeLeft(timeoutDuration);
      setSubmitted(false);
      setQuestionIndex(questionIndex + 1);
    }
    else {
      setTimeout(() => {
        navigate("/summary");
      }, 0); 
    }
  }

  const doSomething = () => {/*to eliminate warning*/}

  useEffect(()=>{
    const timer =
    timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if(timeLeft == 0) skipQuestion();

  return (
    <div>
      <p>Time Remaing: { timeLeft } second(s)</p>
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
