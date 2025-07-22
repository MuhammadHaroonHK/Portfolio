import { motion } from 'framer-motion';
import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    setSubmitStatus('error');
      setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
    >
      <h3 className="text-xl font-semibold mb-6 text-primary-light dark:text-primary-dark">Send Me a Message</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition-colors duration-300 disabled:opacity-70"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        
        {submitStatus === 'success' && (
          <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
            Message sent successfully!
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
            Sorry, this service is not available.
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default ContactForm;