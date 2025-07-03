import React from 'react';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';
import { trackClickEvent } from '../../utils/analytics';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const { elementRef } = useIntersectionObserver('hero');

  const handleGetStartedClick = () => {
    trackClickEvent('Get Started', 'hero_cta');
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchVideoClick = () => {
    trackClickEvent('Watch Video', 'hero_video');
    // Add video modal logic here
  };

  const handleScrollClick = () => {
    trackClickEvent('Scroll Down', 'hero_scroll');
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" ref={elementRef} className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Transform Your Business with Innovation
        </h1>
        <p className={styles.subtitle}>
          We deliver cutting-edge solutions that drive growth, enhance efficiency, 
          and create lasting value for your organization in today's digital landscape.
        </p>
        <div className={styles.actions}>
          <button 
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={handleGetStartedClick}
          >
            Get Started <ArrowRight size={20} />
          </button>
          <button 
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={handleWatchVideoClick}
          >
            <Play size={20} /> Watch Video
          </button>
        </div>
        
        <div className={styles.scrollIndicator} onClick={handleScrollClick}>
          <span className={styles.scrollText}>Scroll Down</span>
          <ChevronDown size={24} className={styles.scrollArrow} />
        </div>
      </div>
    </section>
  );
};

export default Hero;