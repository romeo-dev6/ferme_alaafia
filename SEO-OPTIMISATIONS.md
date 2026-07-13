# Optimisations SEO - Ferme Alaafia

## ✅ Optimisations appliquées

### 1. **Head Tags Optimisés**
- ✓ Meta description (160 caractères)
- ✓ Meta keywords ciblées
- ✓ Open Graph tags (réseaux sociaux)
- ✓ Twitter Card
- ✓ Canonical URL
- ✓ Favicon personnalisé

### 2. **Structured Data (JSON-LD)**
- ✓ Schema LocalBusiness pour meilleur classement local
- ✓ Schema Organization
- ✓ Schema Offer pour les services/activités
- ✓ Dates de fondation et localisation

### 3. **Performance & Core Web Vitals**
- ✓ Preconnect/DNS-Prefetch pour Google Fonts et Unsplash
- ✓ Script différé (defer)
- ✓ Favicon optimisé (SVG)

### 4. **Fichiers de Crawl**
- ✓ robots.txt : Règles pour moteurs de recherche
- ✓ sitemap.xml : Liste complète des pages/sections

---

## 📝 À FAIRE (Actions restantes importantes)

### 1. **Images - Lazy Loading & Srcset**
```html
<!-- AVANT -->
<img id="heroImg" src="" alt="Vue aérienne de la Ferme Alaafia" class="img-ph">

<!-- APRÈS -->
<img id="heroImg" src="" alt="Vue aérienne de la Ferme Alaafia" class="img-ph" loading="lazy" width="1800" height="1200">
```

Ajouter à toutes les images du HTML :
- `loading="lazy"` pour lazy loading
- `width` et `height` pour éviter le layout shift
- `srcset` pour images responsives

### 2. **Mettre à jour JSON-LD**
Remplacer les valeurs placeholders dans le `<script type="application/ld+json">` :
- `"telephone": "+XX XXX XXX XXX"` → Votre vrai numéro
- `"addressLocality": "Localité"` → Ville
- `"addressRegion": "Région"` → Région/Département
- `"postalCode": "Code postal"`
- `"addressCountry": "Pays"`
- Ajouter les URLs réelles des réseaux sociaux

### 3. **Mettre à jour URLs dynamiques**
Remplacer `https://ferme-alaafia.com` par votre domaine réel dans :
- Open Graph tags
- Canonical URL
- JSON-LD
- robots.txt (Sitemap)
- sitemap.xml (toutes les URLs)

### 4. **Créer une image OG optimisée**
- Créer `assets/og-image.jpg` (1200x630px, optimisée)
- Utilisée pour partages sur réseaux sociaux

### 5. **Ajouter Google Search Console**
```html
<!-- Dans le <head> après meta tags -->
<meta name="google-site-verification" content="VOTRE_TOKEN_GSC">
```

### 6. **Ajouter Microdata supplémentaires**
- Schema BreadcrumbList (navigation hiérarchique)
- Schema Event (pour fêtes culturelles)
- Schema Recipe (pour section restaurant)
- Schema FAQPage (si applicable)

### 7. **Optimisations CSS/JS**
```css
/* style.css : Minifier ou utiliser un bundler */
/* Considérer l'inline du CSS critique */
```

### 8. **Headers HTTP (à configurer sur serveur)**
```
X-UA-Compatible: ie=edge
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
```

### 9. **Compression & Caching (.htaccess)**
Voir le fichier `.htaccess` généré pour compression Gzip et cache navigateur

### 10. **Contenu Textuel**
- Vérifier densité de mots-clés (pas de sur-optimisation)
- Ajouter des H2/H3 structurés (heading hierarchy)
- Ajouter des inner links pertinents
- Considérer un blog pour contenu régulier

---

## 🔍 Tests SEO à faire

1. **Google Search Console** : 
   - Ajouter sitemap.xml
   - Vérifier indexation
   - Corriger erreurs d'exploration

2. **Google PageSpeed Insights** :
   - Analyser Core Web Vitals
   - Optimiser images (WebP)
   - Minifier CSS/JS

3. **Semrush / Ahrefs** :
   - Vérifier mots-clés principaux
   - Analyser concurrence
   - Trouver backlinks potentiels

4. **Mobile Testing** :
   - Responsive design OK ?
   - Touch targets suffisants ?
   - Performance mobile acceptable ?

---

## 📊 Priorités par ordre d'importance

1. **CRITIQUE** : Mettre à jour JSON-LD avec vraies coordonnées
2. **HAUTE** : Ajouter Google Search Console + soumettre sitemap
3. **HAUTE** : Optimiser images (lazy loading, format WebP)
4. **MOYENNE** : Ajouter heading hierarchy (h1, h2, h3)
5. **MOYENNE** : Créer OG image
6. **BASSE** : Micro-données additionnelles (Event, Recipe, BreadcrumbList)
7. **BASSE** : Contenus supplémentaires (blog, FAQ)

---

## 🚀 Checklist SEO Final

- [ ] Domain bien configuré (HTTPS, www vs non-www)
- [ ] robots.txt en place ✓
- [ ] sitemap.xml en place ✓
- [ ] Canonical URL défini ✓
- [ ] Meta tags optimisés ✓
- [ ] JSON-LD complété
- [ ] Images lazy loaded et optimisées
- [ ] Mobile responsive ✓
- [ ] PageSpeed > 80 (desktop et mobile)
- [ ] Google Search Console intégré
- [ ] Analytics configuré (GA4 ou Matomo)
- [ ] Pas d'erreurs 404 ou 5xx
- [ ] Liens internes pertinents
- [ ] Alt text pour toutes images
- [ ] Contenu unique et de qualité

