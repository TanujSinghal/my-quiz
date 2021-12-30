import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
        <p>Press start button to start your quiz..</p>
        <Link to="/quiz"><button className="start">START</button></Link>
    </div>
  )
}
