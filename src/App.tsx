// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import HomePage from './pages/HomePage';

// function App() {
//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//       <HomePage />
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CharityDirectoryPage from './pages/CharityDirectoryPage';
import CharityDetailPage from './pages/CharityDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/charities" element={<CharityDirectoryPage />} />
        <Route path="/charities/:id" element={<CharityDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;