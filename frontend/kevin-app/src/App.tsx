import React from 'react';
import BasicSelect from './pages/addValue';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ButtonAppBar from './components/navbar'
import Create from './pages/create';
import Update from './pages/update';
import Upload from './pages/upload';


function App() {
  return (
    <Router>
      <ButtonAppBar /> 
    <div className="App">   
      <Routes>
          <Route path="/" element={<BasicSelect />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update" element={<Update />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
