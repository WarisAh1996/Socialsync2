import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import ContactForm from './components/ContactForm';
import SignupForm from './components/SignupForm';
import AuthCallback from './pages/AuthCallback';

// Separate ScrollToSection component
function ScrollToSection() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        navigate('/', { replace: true });
      }
    }
  }, [location, navigate]);

  return null;
}

// HomePage component
function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <ContactForm />
    </>
  );
}

// Main App component
export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <ScrollToSection />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </div>
    </Router>
  );
}
