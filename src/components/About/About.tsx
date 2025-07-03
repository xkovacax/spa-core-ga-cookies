import React from 'react';
import { CheckCircle, Users, Target, Award, TrendingUp } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './About.module.css';

const About: React.FC = () => {
  const { elementRef } = useIntersectionObserver('about');

  const stats = [
    { number: '500+', label: 'Happy Clients' },
    { number: '50+', label: 'Team Members' },
    { number: '15+', label: 'Years Experience' },
    { number: '99%', label: 'Success Rate' },
  ];

  const features = [
    { icon: Users, text: 'Expert team of professionals' },
    { icon: Target, text: 'Focused on results and ROI' },
    { icon: Award, text: 'Award-winning solutions' },
    { icon: TrendingUp, text: 'Proven track record' },
  ];

  return (
    <section id="about" ref={elementRef} className={styles.about}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>About Our Company</h2>
            <p className={styles.description}>
              We are a forward-thinking company dedicated to delivering innovative solutions 
              that transform businesses and drive sustainable growth. Our expert team combines 
              cutting-edge technology with deep industry knowledge to create value for our clients.
            </p>
            
            <div className={styles.stats}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.stat}>
                  <span className={styles.statNumber}>{stat.number}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.features}>
              {features.map((feature, index) => (
                <div key={index} className={styles.feature}>
                  <feature.icon className={styles.featureIcon} />
                  <span className={styles.featureText}>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <img 
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800&h=600" 
                alt="Our team working together" 
                className={styles.image}
              />
              <div className={styles.imageOverlay}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;