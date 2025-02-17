import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  message: Yup.string()
    .min(10, 'Message too short')
    .required('Required'),
});

export default function ContactForm() {
  return (
    <div id="contact" className="bg-white py-24 relative overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/95"></div>
        <img 
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl"
          >
            Contact Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl text-gray-600"
          >
            Have questions? We'd love to hear from you.
          </motion.p>
        </div>

        <div className="mt-12 max-w-lg mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <Formik
              initialValues={{
                name: '',
                email: '',
                message: '',
              }}
              validationSchema={ContactSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                  console.log(values);
                  setSubmitting(false);
                  resetForm();
                  alert('Thank you for your message. We will get back to you soon!');
                }, 400);
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <div className="mt-1">
                      <Field
                        name="name"
                        className="h-11 appearance-none block w-full px-4 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                      />
                      {errors.name && touched.name && (
                        <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1">
                      <Field
                        name="email"
                        type="email"
                        className="h-11 appearance-none block w-full px-4 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <div className="mt-1">
                      <Field
                        name="message"
                        as="textarea"
                        rows={4}
                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                      />
                      {errors.message && touched.message && (
                        <div className="text-red-500 text-sm mt-1">{errors.message}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 w-full flex justify-center items-center px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-shadow"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
