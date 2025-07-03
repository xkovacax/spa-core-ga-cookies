import React from 'react';
import { ExternalLink, Eye, ThumbsUp, Calendar } from 'lucide-react';
import { trackClickEvent } from '../../utils/analytics';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './Portfolio.module.css';

const Portfolio: React.FC = () => {
  const { elementRef } = useIntersectionObserver('portfolio');

  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A modern e-commerce solution with advanced features for online retail businesses.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=400',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      views: 2500,
      likes: 145,
      date: 'Dec 2024'
    },
    {
      title: 'Healthcare Dashboard',
      description: 'Comprehensive healthcare management dashboard for medical professionals.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800&h=400',
      tags: ['Vue.js', 'Laravel', 'MySQL', 'Chart.js'],
      views: 1800,
      likes: 98,
      date: 'Nov 2024'
    },
    {
      title: 'Financial Analytics',
      description: 'Advanced financial analytics platform with real-time data visualization.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=400',
      tags: ['Python', 'Django', 'PostgreSQL', 'D3.js'],
      views: 3200,
      likes: 203,
      date: 'Oct 2024'
    },
    {
      title: 'Social Media App',
      description: 'Feature-rich social media application with real-time messaging and content sharing.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=400',
      tags: ['React Native', 'Firebase', 'Redux', 'WebSocket'],
      views: 4100,
      likes: 287,
      date: 'Sep 2024'
    },
    {
      title: 'Learning Management System',
      description: 'Comprehensive LMS platform for educational institutions and online courses.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800&h=400',
      tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'AWS'],
      views: 2900,
      likes: 156,
      date: 'Aug 2024'
    },
    {
      title: 'IoT Monitoring System',
      description: 'Real-time IoT device monitoring and management system for industrial applications.',
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800&h=400',
      tags: ['React', 'Node.js', 'MQTT', 'InfluxDB'],
      views: 1650,
      likes: 89,
      date: 'Jul 2024'
    }
  ];

  const handleProjectClick = (projectTitle: string) => {
    trackClickEvent(`${projectTitle} Project`, 'portfolio_project');
  };

  return (
    <section id="portfolio" ref={elementRef} className={styles.portfolio}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Portfolio</h2>
          <p className={styles.subtitle}>
            Explore our latest projects and success stories that showcase our expertise 
            and commitment to delivering exceptional results for our clients.
          </p>
        </div>
        
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={styles.card}
              onClick={() => handleProjectClick(project.title)}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className={styles.cardImage}
              />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>
                
                <div className={styles.cardTags}>
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className={styles.cardTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className={styles.cardFooter}>
                  <div className={styles.cardStats}>
                    <div className={styles.cardStat}>
                      <Eye className={styles.cardStatIcon} />
                      {project.views}
                    </div>
                    <div className={styles.cardStat}>
                      <ThumbsUp className={styles.cardStatIcon} />
                      {project.likes}
                    </div>
                    <div className={styles.cardStat}>
                      <Calendar className={styles.cardStatIcon} />
                      {project.date}
                    </div>
                  </div>
                  
                  <div className={styles.cardAction}>
                    View Details
                    <ExternalLink className={styles.cardActionIcon} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;