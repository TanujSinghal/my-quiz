import './App.css';
import Header from './components/Header';
import Quiz from './components/Quiz';
import Home from './components/Home';
import Summary from './components/Summary';
import { useState } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

function App() {

  const [answer, setAnswer] = useState([]);

  const updateAnswer = function(resp){
    let tempAnswer = answer;
    if (tempAnswer.length > resp.questionIndex) 
      tempAnswer[resp.questionIndex] = resp.answer;
    else 
      tempAnswer.push(resp.answer);
    setAnswer(tempAnswer);
    // console.log(tempAnswer)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz onAnswerSubmit={updateAnswer}/>} />
          <Route path="/summary" element={<Summary yourAnswer={answer}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
