import React from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram 
} from 'lucide-react';
import { trackClickEvent } from '../../utils/analytics';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    { name: 'Web Development', href: '#services' },
    { name: 'Mobile Apps', href: '#services' },
    { name: 'Digital Marketing', href: '#services' },
    { name: 'Consulting', href: '#services' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' }
  ];

  const handleLinkClick = (linkName: string, category: string) => {
    trackClickEvent(`${linkName} Footer Link`, category);
  };

  const handleLogoClick = () => {
    trackClickEvent('Footer Logo', 'footer_logo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.companyInfo}>
            <a href="#home" className={styles.logo} onClick={handleLogoClick}>
              <Building2 className={styles.logoIcon} />
              <span>Company</span>
            </a>
            <p className={styles.description}>
              We're passionate about creating innovative solutions that transform businesses 
              and drive growth in the digital age.
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={styles.socialLink}
                  onClick={() => handleLinkClick(social.name, 'social')}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <div className={styles.links}>
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={styles.link}
                  onClick={() => handleLinkClick(link.name, 'quick_links')}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Services</h3>
            <div className={styles.links}>
              {services.map((service, index) => (
                <a
                  key={index}
                  href={service.href}
                  className={styles.link}
                  onClick={() => handleLinkClick(service.name, 'services')}
                >
                  {service.name}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact</h3>
            <div className={styles.contact}>
              <div className={styles.contactItem}>
                <Mail className={styles.contactIcon} />
                <span>hello@company.com</span>
              </div>
              <div className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin className={styles.contactIcon} />
                <span>123 Business Street, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © {currentYear} Company. All rights reserved.
          </div>
          <div className={styles.bottomLinks}>
            <a 
              href="#privacy" 
              className={styles.bottomLink}
              onClick={() => handleLinkClick('Privacy Policy', 'legal')}
            >
              Privacy Policy
            </a>
            <a 
              href="#terms" 
              className={styles.bottomLink}
              onClick={() => handleLinkClick('Terms of Service', 'legal')}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;