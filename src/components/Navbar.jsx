import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isSignupPage = location.pathname === '/signup';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (section) => {
    if (location.pathname !== '/') {
      navigate(`/?section=${section}`);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <RouterLink to="/" className="text-2xl font-bold gradient-text">
              SocialSync
            </RouterLink>
          </div>
          
          {!isSignupPage && (
            <>
              <div className="hidden md:flex items-center space-x-8">
                {location.pathname === '/' ? (
                  <>
                    <ScrollLink 
                      to="features" 
                      spy={true} 
                      smooth={true} 
                      offset={-80}
                      duration={500} 
                      className="text-gray-600 hover:text-primary cursor-pointer"
                    >
                      Features
                    </ScrollLink>
                    <ScrollLink 
                      to="pricing" 
                      spy={true} 
                      smooth={true} 
                      offset={-80}
                      duration={500} 
                      className="text-gray-600 hover:text-primary cursor-pointer"
                    >
                      Pricing
                    </ScrollLink>
                    <ScrollLink 
                      to="contact" 
                      spy={true} 
                      smooth={true} 
                      offset={-80}
                      duration={500} 
                      className="text-gray-600 hover:text-primary cursor-pointer"
                    >
                      Contact
                    </ScrollLink>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleNavigation('features')} className="text-gray-600 hover:text-primary">
                      Features
                    </button>
                    <button onClick={() => handleNavigation('pricing')} className="text-gray-600 hover:text-primary">
                      Pricing
                    </button>
                    <button onClick={() => handleNavigation('contact')} className="text-gray-600 hover:text-primary">
                      Contact
                    </button>
                  </>
                )}
                <button 
                  onClick={() => navigate('/signup', { state: { plan: 'starter' } })}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-md hover:shadow-lg transition-shadow"
                >
                  Get Started
                </button>
              </div>

              <div className="md:hidden flex items-center">
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                  {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {!isSignupPage && isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/80 backdrop-blur-md">
            {location.pathname === '/' ? (
              <>
                <ScrollLink 
                  to="features" 
                  spy={true} 
                  smooth={true} 
                  offset={-80}
                  duration={500} 
                  className="block px-3 py-2 text-gray-600 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </ScrollLink>
                <ScrollLink 
                  to="pricing" 
                  spy={true} 
                  smooth={true} 
                  offset={-80}
                  duration={500} 
                  className="block px-3 py-2 text-gray-600 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </ScrollLink>
                <ScrollLink 
                  to="contact" 
                  spy={true} 
                  smooth={true} 
                  offset={-80}
                  duration={500} 
                  className="block px-3 py-2 text-gray-600 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </ScrollLink>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    handleNavigation('features');
                    setIsOpen(false);
                  }} 
                  className="block w-full text-left px-3 py-2 text-gray-600"
                >
                  Features
                </button>
                <button 
                  onClick={() => {
                    handleNavigation('pricing');
                    setIsOpen(false);
                  }} 
                  className="block w-full text-left px-3 py-2 text-gray-600"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => {
                    handleNavigation('contact');
                    setIsOpen(false);
                  }} 
                  className="block w-full text-left px-3 py-2 text-gray-600"
                >
                  Contact
                </button>
              </>
            )}
            <button 
              onClick={() => {
                navigate('/signup', { state: { plan: 'starter' } });
                setIsOpen(false);
              }}
              className="w-full text-center bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-md"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
