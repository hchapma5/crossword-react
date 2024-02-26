import { useState, useEffect } from 'react'
import Clues from './components/Clues'
import Crossword from './components/Crossword'
import { CrosswordData, fetchCrosswordData } from './utils'

import './App.css'

function App() {
  const [crosswordData, setCrosswordData] = useState<CrosswordData | undefined>(undefined);

  useEffect(() => {
    fetchCrosswordData('Computer Science', 20)
      .then(data => setCrosswordData(data));
  }, []);

  return ( 
    <div className="container">
      <Crossword data={crosswordData}/>
      <Clues />
    </div>
  );
}

export default App
