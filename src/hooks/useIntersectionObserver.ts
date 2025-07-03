import { useEffect, useRef, useState } from 'react';
import { trackSectionView } from '../utils/analytics';

export const useIntersectionObserver = (sectionName: string) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        
        if (isIntersecting && !hasBeenViewed) {
          setHasBeenViewed(true);
          trackSectionView(sectionName);
        }
      },
      {
        threshold: 0.5,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [sectionName, hasBeenViewed]);

  return { elementRef, isVisible, hasBeenViewed };
};