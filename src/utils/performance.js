// Performance Optimization Utilities
import { lazy, Suspense } from 'react';

// Lazy load components for better performance
export const LazyHero = lazy(() => import('./components/HeroBeautiful'));
export const LazyServices = lazy(() => import('./components/ServicesBeautiful'));
export const LazyFeatures = lazy(() => import('./components/Features'));
export const LazyShowcase = lazy(() => import('./components/Showcase'));
export const LazyStats = lazy(() => import('./components/Stats'));
export const LazyTestimonials = lazy(() => import('./components/Testimonials'));
export const LazyFooter = lazy(() => import('./components/FooterBeautiful'));

// Loading component for lazy loaded sections
export const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
  </div>
);

// Image optimization helper
export const optimizeImage = (src, quality = 80, format = 'webp') => {
  // This would typically integrate with an image optimization service
  return src;
};

// Video optimization helper
export const optimizeVideo = (src, quality = 'auto') => {
  // This would typically integrate with a video optimization service
  return src;
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalVideos = [
    '/assets/homepage.mp4',
    '/assets/loader.mp4',
  ];

  criticalVideos.forEach(video => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = video;
    document.head.appendChild(link);
  });
};

// Intersection Observer for lazy loading
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, options]);

  return [setElement, isIntersecting];
};

// Performance monitoring
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      console.log(`Page load time: ${loadTime}ms`);
      
      // You could send this data to analytics
      if (window.gtag) {
        window.gtag('event', 'page_load_time', {
          event_category: 'Performance',
          value: Math.round(loadTime)
        });
      }
    });
  }
};

export default {
  LazyHero,
  LazyServices,
  LazyFeatures,
  LazyShowcase,
  LazyStats,
  LazyTestimonials,
  LazyFooter,
  SectionLoader,
  optimizeImage,
  optimizeVideo,
  preloadCriticalResources,
  useIntersectionObserver,
  trackPerformance
};
