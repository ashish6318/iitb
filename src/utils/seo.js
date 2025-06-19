import { useEffect } from 'react';

// SEO Meta tags configuration
export const seoConfig = {
  defaultTitle: 'Frontend Battle - Award-Winning Web Development',
  titleTemplate: '%s | Frontend Battle',
  defaultDescription: 'Professional web development services with cutting-edge React, modern UI/UX design, and optimized performance. Transform your digital presence with our expert team.',
  siteUrl: 'https://frontend-battle.com',
  defaultImage: '/assets/cards.png',
  twitterHandle: '@frontendbattle',
  author: 'Frontend Battle Team',
  keywords: [
    'web development',
    'react development',
    'ui/ux design',
    'frontend development',
    'modern web apps',
    'responsive design',
    'performance optimization',
    'three.js',
    'framer motion',
    'tailwind css'
  ]
};

// Update page meta tags
export const updateSEO = (config = {}) => {
  const {
    title = seoConfig.defaultTitle,
    description = seoConfig.defaultDescription,
    image = seoConfig.defaultImage,
    url = seoConfig.siteUrl,
    keywords = seoConfig.keywords.join(', ')
  } = config;

  // Update title
  document.title = title;

  // Update meta tags
  const updateMetaTag = (property, content) => {
    let element = document.querySelector(`meta[${property.includes('og:') ? 'property' : 'name'}="${property}"]`);
    if (!element) {
      element = document.createElement('meta');
      if (property.includes('og:')) {
        element.setAttribute('property', property);
      } else {
        element.setAttribute('name', property);
      }
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // Basic meta tags
  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords);
  updateMetaTag('author', seoConfig.author);
  updateMetaTag('robots', 'index,follow');
  updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

  // Open Graph tags
  updateMetaTag('og:title', title);
  updateMetaTag('og:description', description);
  updateMetaTag('og:image', image);
  updateMetaTag('og:url', url);
  updateMetaTag('og:type', 'website');
  updateMetaTag('og:site_name', 'Frontend Battle');

  // Twitter tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:site', seoConfig.twitterHandle);
  updateMetaTag('twitter:title', title);
  updateMetaTag('twitter:description', description);
  updateMetaTag('twitter:image', image);

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
};

// Structured data for rich snippets
export const addStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Frontend Battle",
    "description": seoConfig.defaultDescription,
    "url": seoConfig.siteUrl,
    "logo": `${seoConfig.siteUrl}/assets/cards.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@frontend-battle.com"
    },
    "sameAs": [
      "https://twitter.com/frontendbattle",
      "https://github.com/frontend-battle",
      "https://linkedin.com/company/frontend-battle"
    ],
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "Frontend Battle Team"
      }
    ],
    "areaServed": "Worldwide",
    "serviceType": [
      "Web Development",
      "UI/UX Design",
      "Mobile App Development",
      "Performance Optimization",
      "E-commerce Solutions",
      "Digital Marketing"
    ]
  };

  let script = document.querySelector('script[type="application/ld+json"]');
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(structuredData);
};

// SEO Hook for React components
export const useSEO = (config) => {
  useEffect(() => {
    updateSEO(config);
    addStructuredData();
  }, [config]);
};

// Generate sitemap (for build process)
export const generateSitemap = () => {
  const urls = [
    { loc: '', priority: '1.0', changefreq: 'weekly' },
    { loc: '#features', priority: '0.8', changefreq: 'monthly' },
    { loc: '#services', priority: '0.8', changefreq: 'monthly' },
    { loc: '#showcase', priority: '0.7', changefreq: 'monthly' },
    { loc: '#stats', priority: '0.6', changefreq: 'monthly' },
    { loc: '#testimonials', priority: '0.7', changefreq: 'monthly' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${seoConfig.siteUrl}${url.loc}</loc>
    <priority>${url.priority}</priority>
    <changefreq>${url.changefreq}</changefreq>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('')}
</urlset>`;

  return sitemap;
};

export default {
  seoConfig,
  updateSEO,
  addStructuredData,
  useSEO,
  generateSitemap
};
