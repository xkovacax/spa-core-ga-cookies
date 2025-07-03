import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  Building2,
  MessageCircle
} from 'lucide-react';
import { trackFormSubmission, trackClickEvent } from '../../utils/analytics';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const { elementRef } = useIntersectionObserver('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      text: 'hello@company.com'
    },
    {
      icon: Phone,
      text: '+1 (555) 123-4567'
    },
    {
      icon: MapPin,
      text: '123 Business Street, City, State 12345'
    },
    {
      icon: Clock,
      text: 'Mon-Fri: 9:00 AM - 6:00 PM'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    trackFormSubmission('contact_form');
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  const handleContactClick = (type: string) => {
    trackClickEvent(`${type} Contact`, 'contact_info');
  };

  return (
    <section id="contact" ref={elementRef} className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Get in Touch</h2>
          <p className={styles.subtitle}>
            Ready to start your project? Contact us today and let's discuss how we can 
            help transform your business with innovative solutions.
          </p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>
                <Building2 className={styles.infoIcon} />
                Contact Information
              </h3>
              <div className={styles.infoItems}>
                {contactInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className={styles.infoItem}
                    onClick={() => handleContactClick(info.icon.name)}
                  >
                    <info.icon className={styles.infoIcon} />
                    <span className={styles.infoText}>{info.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>
                <MessageCircle className={styles.infoIcon} />
                Let's Talk
              </h3>
              <p className={styles.infoText}>
                Have a project in mind? We'd love to hear from you. Our team is ready to 
                discuss your requirements and provide you with a tailored solution that 
                meets your business needs.
              </p>
            </div>
          </div>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.formTitle}>Send us a Message</h3>
            
            {isSubmitted && (
              <div className={styles.successMessage}>
                <CheckCircle className={styles.successIcon} />
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={styles.formInput}
                placeholder="Enter your full name"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={styles.formInput}
                placeholder="Enter your email address"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="company" className={styles.formLabel}>
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Enter your company name"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className={styles.formTextarea}
                placeholder="Tell us about your project or requirements"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={styles.formButton}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;