// Script d'optimisation d'images pour Ferme Alaafia
// À ajouter dans assets/index.js APRÈS le code existant

/**
 * OPTIMISATION D'IMAGES - LAZY LOADING + RESPONSIVE
 * 
 * Ce script ajoute :
 * 1. Lazy loading natif
 * 2. Lazy loading polyfill pour anciens navigateurs
 * 3. Srcset pour images responsives
 * 4. Placeholder avec blurred version
 */

// ─── 1. LAZY LOADING AVEC INTERSECTION OBSERVER ───

if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in IntersectionObserverEntry.prototype) {
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (src) {
          img.src = src;
        }
        if (srcset) {
          img.srcset = srcset;
        }

        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });

  // Observer toutes les images avec data-src
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ─── 2. SRCSET UTILITAIRE (LOCAL ONLY) ───
/**
 * Génère un srcset simple à partir d'une même image locale (pour sites statiques).
 * Utilisation recommandée : fournir des versions pré-générées ou laisser le build générer
 * des variantes. Ici on propose une implantation sûre qui n'appelle aucun service externe.
 */
function setSrcset(elementId, baseUrl) {
  const img = document.getElementById(elementId);
  if (!img) return;

  // Attendre que l'auteur fournisse des fichiers pré-générés si besoin
  const breakpoints = [480, 768, 1200, 1800];
  const srcsetArray = breakpoints.map(w => `${baseUrl} ${w}w`);
  img.setAttribute('srcset', srcsetArray.join(','));
  img.setAttribute('sizes', '(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1800px');
}

// ─── 3. APPLIQUER SRCSET À IMAGES DE HERO ───

// Exemple : appeler après avoir chargé l'image
// setSrcset('heroImg', 'assets/img/webp/hero.webp');

// ─── 4. AJOUTER LAZY LOADING NATIF ───

/**
 * Ajouter loading="lazy" à toutes images non-critical
 * Les images above-the-fold garderont loading="eager" (défaut)
 */
function enableNativeLazyLoading() {
  const images = document.querySelectorAll('img');
  
  images.forEach((img, index) => {
    // Les 3 premières images : eager loading (hero, about, etc)
    // Les autres : lazy
    if (index > 3) {
      img.setAttribute('loading', 'lazy');
    } else {
      img.setAttribute('loading', 'eager');
    }
  });
}

enableNativeLazyLoading();

// ─── 5. PRELOAD CRITICAL IMAGES (Hero) ───

/**
 * Précharger images critiques (hero section)
 * Améliore Largest Contentful Paint (LCP)
 */
function preloadCriticalImages() {
  // Use local WebP assets for preloading to avoid external requests
  const criticalImages = [
    { id: 'heroImg', url: 'assets/img/webp/hero.webp', type: 'image/webp' },
    { id: 'aboutMain', url: 'assets/img/webp/about-main.webp', type: 'image/webp' }
  ];

  criticalImages.forEach(img => {
    // Option 1: Précharger manuellement (legacy)
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = img.url;
    link.type = img.type;
    document.head.appendChild(link);

    // Option 2: Charger directement l'image
    const element = document.getElementById(img.id);
    if (element && !element.src) {
      element.src = img.url;
    }
  });
}

preloadCriticalImages();

// ─── 6. OPTIMISATION FORMAT (WebP) ───

/**
 * Charger WebP si navigateur supporte, sinon JPEG
 * Utile pour réduire taille de 25-35%
 */
function useWebPIfSupported(elementId, jpegUrl, webpUrl) {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  const isWebPSupported = canvas.toDataURL('image/webp') === 'data:image/webp;base64,UklGRjoIAABXRUJQ';
  
  const img = document.getElementById(elementId);
  if (img) {
    img.src = isWebPSupported ? webpUrl : jpegUrl;
  }
}

// Exemple:
// useWebPIfSupported('heroImg', jpegUrl, webpUrl);

// ─── 7. IMAGE PLACEHOLDER & BLUR ───

/**
 * Ajouter blur progressif pendant chargement
 * Utilise données:uri LQIP (Low Quality Image Placeholder)
 */
function addBlurPlaceholder(elementId, blurDataUri) {
  const img = document.getElementById(elementId);
  if (!img) return;

  // Set background blur avant chargement
  img.style.backgroundImage = `url('${blurDataUri}')`;
  img.style.backgroundSize = 'cover';
  img.style.backgroundPosition = 'center';

  img.addEventListener('load', () => {
    img.style.backgroundImage = 'none';
    img.classList.add('image-loaded');
  });
}

// ─── 8. MONITORER CORE WEB VITALS (LCP) ───

if ('PerformanceObserver' in window) {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('LCP:', entry);
        // À envoyer à analytics
      }
    });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    // Navigateur trop ancien
  }
}

console.log('✅ Image optimization loaded');
