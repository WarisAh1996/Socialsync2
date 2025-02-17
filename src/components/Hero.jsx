import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SocialPlatform = ({ Icon, color, position, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      duration: 0.5,
      delay,
      type: "spring",
      stiffness: 100
    }}
    className={`absolute ${position} transform -translate-x-1/2 -translate-y-1/2`}
  >
    <div className={`relative group`}>
      <div className="absolute inset-0 bg-white/80 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 scale-150"></div>
      <div className={`relative w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-xl hover:shadow-2xl transition-all duration-300`}>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </div>
  </motion.div>
);

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Abstract Shapes */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/10 shape-blob"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-secondary/10 shape-blob"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-left"
          >
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="block">Post Once,</span>
              <span className="gradient-text">Reach Everywhere</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl">
              Streamline your social media presence with our all-in-one platform. Schedule, analyze, and manage all your social media posts from a single dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/signup', { state: { plan: 'starter' } })}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg transition-shadow"
              >
                Start Free Trial
              </button>
              <button className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-medium hover:bg-primary/5 transition-colors">
                Watch Demo
              </button>
            </div>
            <div className="mt-12 flex items-center gap-8">
              <FaFacebook className="w-8 h-8 text-blue-600" />
              <FaInstagram className="w-8 h-8 text-pink-600" />
              <FaTwitter className="w-8 h-8 text-blue-400" />
              <FaTiktok className="w-8 h-8 text-gray-900" />
            </div>
          </motion.div>

          <div className="relative hidden lg:block h-[600px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Single Pulse */}
              <div className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-slow"></div>
              </div>
              
              {/* Central SocialSync Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-32 h-32"
              >
                <div className="absolute inset-0 bg-white/80 rounded-full blur-2xl scale-150"></div>
                <div className="relative w-full h-full rounded-full bg-gradient-to-r from-primary to-secondary p-[2px]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-md"></div>
                  <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold text-xl">SocialSync</span>
                  </div>
                </div>
              </motion.div>

              {/* Social Media Platforms */}
              <SocialPlatform 
                Icon={FaFacebook} 
                color="text-blue-600"
                position="left-1/4 top-1/4"
                delay={0.2}
              />
              <SocialPlatform 
                Icon={FaInstagram} 
                color="text-pink-600"
                position="right-1/4 top-1/4"
                delay={0.4}
              />
              <SocialPlatform 
                Icon={FaTwitter} 
                color="text-blue-400"
                position="left-1/4 bottom-1/4"
                delay={0.6}
              />
              <SocialPlatform 
                Icon={FaTiktok} 
                color="text-gray-900"
                position="right-1/4 bottom-1/4"
                delay={0.8}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
