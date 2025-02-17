import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechStart Inc.',
    content: 'SocialSync has revolutionized our social media management. The ability to schedule posts across multiple platforms has saved us countless hours.',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Social Media Manager',
    company: 'Global Brands',
    content: 'The analytics and insights provided by SocialSync have helped us optimize our content strategy and increase engagement by 200%.',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    id: 3,
    name: 'Emma Davis',
    role: 'Founder',
    company: 'CreativeHub',
    content: 'As a small business owner, SocialSync has been a game-changer. The intuitive interface and powerful features make social media management a breeze.',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
  }
];

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid mobile number')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
});

export default function SignupForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const plan = location.state?.plan || 'starter';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleEmailSignup = async (values, { setSubmitting }) => {
    try {
      setError(null);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            mobile: values.mobile,
            plan: plan
          }
        }
      });

      if (error) throw error;

      navigate('/success', { 
        state: { 
          message: "Please check your email to confirm your account." 
        }
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const handleSSOSignup = async (provider) => {
    try {
      setError(null);
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          data: {
            plan: plan
          }
        }
      });

      if (error) throw error;

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Signup Form Section */}
      <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden order-2 lg:order-1">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 shape-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 shape-blob"></div>
        <div className="max-w-md w-full mx-auto relative">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Selected plan: {plan.charAt(0).toUpperCase() + plan.slice(1)}
          </p>

          {/* SSO Buttons */}
          <div className="mt-6 space-y-4">
            <button
              onClick={() => handleSSOSignup('google')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <FaGoogle className="w-5 h-5 text-red-500" />
              Continue with Google
            </button>
            
            <button
              onClick={() => handleSSOSignup('github')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <FaGithub className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mt-8">
            <Formik
              initialValues={{
                email: '',
                mobile: '',
                password: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={handleEmailSignup}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Business/Personal Email
                    </label>
                    <div className="mt-1">
                      <Field
                        name="email"
                        type="email"
                        disabled={loading}
                        className="h-11 appearance-none block w-full px-4 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base"
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <div className="mt-1">
                      <Field
                        name="mobile"
                        type="tel"
                        disabled={loading}
                        className="h-11 appearance-none block w-full px-4 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base"
                      />
                      {errors.mobile && touched.mobile && (
                        <div className="text-red-500 text-sm mt-1">{errors.mobile}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <Field
                        name="password"
                        type="password"
                        disabled={loading}
                        className="h-11 appearance-none block w-full px-4 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base"
                      />
                      {errors.password && touched.password && (
                        <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading || isSubmitting}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                    >
                      {loading ? 'Creating account...' : 'Create account'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="hidden lg:flex items-center justify-center bg-primary text-white p-12 relative overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-90"></div>
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What our users say</h2>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <blockquote className="text-xl italic mb-4">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div className="font-semibold">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="text-sm opacity-80">
                {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentTestimonial ? 'bg-white w-4' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
