import logo from './logo.svg';
import './App.css';
import Tracker from './component/Tracker';
import Home from './component/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/create" element={<Tracker/>} />
          <Route path="/create/:id" element={<Tracker/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
