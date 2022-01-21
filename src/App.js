import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Student from './pages/Student';
import Addstudent from './pages/Addstudent';
import EditStudent from './pages/EditStudent';
function App() {
  return (
    
    <Router>
      <Routes>
        <Route exact path="/" element={<Student/>} />
        <Route path="/add-student" element={<Addstudent/>} /> 
        <Route path="/detail-student/:id" element= {<EditStudent/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
