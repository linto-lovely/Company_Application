import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignUpPage.jsx';
import Home from './pages/Home.jsx';
import AddCompany from './pages/AddCompany.jsx';
import ViewCompany from './pages/ViewCompany.jsx';
import EditCompany from './pages/EditCompany.jsx';
import DeleteCompany from './pages/DeleteCompany.jsx';

const App = () => {
  const [companies, setCompanies] = useState([]);

  const addCompany = (company) => {
    setCompanies([...companies, company]);
  };

  return (
    <Router>
      <Routes>
        {/* Default route goes to LoginPage */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<Home companies={companies} />} />
        <Route path="/add-company" element={<AddCompany onAddCompany={addCompany} />} />
        <Route path="/view-company/:id" element={<ViewCompany />} />
        <Route path="/edit-company/:id" element={<EditCompany />} />
        <Route path="/delete-company/:id" element={<DeleteCompany />} />
      </Routes>
    </Router>
  );
};

export default App;
