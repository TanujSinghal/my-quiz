import React from 'react';
import Data from '../Data';
import { Link } from 'react-router-dom';

export default function Summary(prop) {
    
  let questionnaire = Data();

  return (
    <div className="summary">
        Quiz Results
        <table>
            <thead>
                <tr>
                    <td>Correct Answer</td>
                    <td>Your Answer</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {questionnaire.map((element, index)=>
                    <tr key={index}>
                        <td>{element.options[element.answerIndex]}</td>
                        <td>{element.options[prop.yourAnswer[index]]}</td>
                        <td>{prop.yourAnswer[index] 
                            ? (element.answerIndex == prop.yourAnswer[index] ? 'Correct' : 'Wrong')
                            : 'No Answer'
                            }
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        
        <Link to="/"><button className="start">RETAKE</button></Link>
    </div>
  )
}
