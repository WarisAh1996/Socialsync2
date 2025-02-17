import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const testimonials = [
  // ... existing testimonials
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
      
      // Sign up with Supabase
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

      // If successful, navigate to success page
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
      <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
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

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting || loading}
                      className="h-12 w-full flex justify-center items-center px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-shadow disabled:opacity-50"
                    >
                      {isSubmitting ? 'Creating account...' : 'Create Account'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Testimonials Section (unchanged) */}
      <div className="hidden lg:block bg-gradient-to-br from-primary to-secondary">
        {/* ... existing testimonials code ... */}
      </div>
    </div>
  );
}
