import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import Register from './register/register';
import Login from './login/login';

function Home() {
  return <h2>Inicio</h2>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="top-bar">
          <h1 className="page-title">Epitech</h1>
        </header>

        <div className="button-bar">
          <Link to="/"><button>Home</button></Link>
          <Link to="/register"><button>register</button></Link>
          <Link to="/login"><button>login</button></Link>
        </div>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;