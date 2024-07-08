// import React from 'react'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import LoginPage from './components/LoginPage';
// import Layout from './layout/Layout'
// import './App.css';

// const App = () => {
//   return (
//     <Router>
//       <Layout />
//       {/* <Routes>
//       <Route path="/login" element={<LoginPage />} />
//       </Routes> */}
//     </Router>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import LoginPage from './components/LoginPage'; // Ensure this is imported
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<Layout />} /> {/* Layout will handle further routing */}
      </Routes>
    </Router>
  );
};

export default App;

