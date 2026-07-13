Procédure pour ajouter et convertir des images locales

1) Déposez vos images sources dans `assets/img/source`.

2) Nommez les fichiers selon la convention suivante (exemples) pour qu'ils correspondent automatiquement à la structure du site :

- hero.jpg -> hero.jpg
- about-main.jpg -> about-main.jpg
- about-sec.jpg -> about-sec.jpg
- act1.jpg, act2.jpg, act3.jpg
- rando1.jpg, rando2.jpg, rando3.jpg
- cult1.jpg, cult2.jpg
- resto-main.jpg
- food1.jpg ... food4.jpg
- gi1.jpg ... gi8.jpg
- temo1.jpg ... temo3.jpg
- contact.jpg
- og-image.jpg

Le script convert-images.js convertira chaque fichier trouvé en WebP et écrira les fichiers de sortie dans `assets/img/webp`.

3) Pour installer la dépendance et lancer la conversion :

```bash
npm install
npm run convert
```

4) Le résultat et la correspondance seront écrits dans `assets/img/webp/conversion-manifest.json`.

5) Vérifiez `index.html` qui pointe déjà vers les fichiers WebP attendus dans `assets/img/webp`.

Remarque: Le script utilise la librairie `sharp`. Sur certaines machines, l'installation peut demander des outils système, mais `npm install` gérera la plupart des cas.
