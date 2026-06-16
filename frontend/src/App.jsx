import React, { useState, useEffect, useRef, useContext } from 'react';
import Layout from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/Hersection';
import LoanApplicationForm from './pages/Application';
function App() {
  return (
    <Router>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/applications" element={<LoanApplicationForm />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;

