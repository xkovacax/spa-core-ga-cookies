import { useEffect, useRef } from 'react';
import { trackScrollEvent } from '../utils/analytics';

export const useScrollTracking = () => {
  const scrollThresholds = useRef(new Set<number>());
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollY / documentHeight) * 100);

      // Track scroll milestones (25%, 50%, 75%, 100%)
      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !scrollThresholds.current.has(milestone)) {
          scrollThresholds.current.add(milestone);
          trackScrollEvent(milestone);
        }
      });

      lastScrollY.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollThresholds: scrollThresholds.current };
};