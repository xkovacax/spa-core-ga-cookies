import React from 'react';
import { 
  Code, 
  Smartphone, 
  Globe, 
  BarChart3, 
  Shield, 
  Headphones, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { trackClickEvent } from '../../utils/analytics';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './Services.module.css';

const Services: React.FC = () => {
  const { elementRef } = useIntersectionObserver('services');

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies for optimal performance and user experience.',
      features: [
        'Responsive Design',
        'Performance Optimization',
        'SEO Friendly',
        'Cross-browser Compatibility'
      ]
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications that engage users and drive business growth.',
      features: [
        'iOS & Android',
        'Cross-platform Solutions',
        'App Store Optimization',
        'Push Notifications'
      ]
    },
    {
      icon: Globe,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to increase your online presence and reach.',
      features: [
        'SEO & SEM',
        'Social Media Marketing',
        'Content Strategy',
        'Analytics & Reporting'
      ]
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Data-driven insights and analytics to help you make informed business decisions.',
      features: [
        'Custom Dashboards',
        'Real-time Reporting',
        'Performance Metrics',
        'Predictive Analytics'
      ]
    },
    {
      icon: Shield,
      title: 'Security Solutions',
      description: 'Comprehensive security solutions to protect your business and customer data.',
      features: [
        'Security Audits',
        'Data Protection',
        'Compliance Management',
        '24/7 Monitoring'
      ]
    },
    {
      icon: Headphones,
      title: 'Support & Maintenance',
      description: 'Ongoing support and maintenance services to ensure your systems run smoothly.',
      features: [
        '24/7 Support',
        'Regular Updates',
        'Performance Monitoring',
        'Issue Resolution'
      ]
    }
  ];

  const handleServiceClick = (serviceName: string) => {
    trackClickEvent(`${serviceName} Service`, 'service_card');
  };

  return (
    <section id="services" ref={elementRef} className={styles.services}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Services</h2>
          <p className={styles.subtitle}>
            We offer a comprehensive range of services to help your business thrive 
            in the digital age with innovative solutions and expert support.
          </p>
        </div>
        
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div 
              key={index} 
              className={styles.card}
              onClick={() => handleServiceClick(service.title)}
            >
              <service.icon className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
              
              <ul className={styles.cardFeatures}>
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className={styles.cardFeature}>
                    <Check className={styles.cardFeatureIcon} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className={styles.cardAction}>
                Learn More
                <ArrowRight className={styles.cardActionIcon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;