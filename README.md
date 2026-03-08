# Portfolio Mélanie Silva Pothupitiyage

Portfolio web moderne et responsive recréé à partir du portfolio Canva original.

## 📋 Structure du projet

```
Portfolio/
├── index.html          # Structure principale du site
├── style.css           # Styles et design
├── script.js           # Interactions et animations
├── images/             # Dossier pour les images
│   ├── hero-bg.jpg
│   ├── profile.jpg
│   ├── project1-12.jpg
│   ├── cert1-4.jpg
│   ├── skill-*.png
│   └── ...
├── videos/             # Dossier pour les vidéos
│   ├── video1.mp4
│   └── video2.mp4
└── README.md           # Ce fichier
```

## 🎨 Images à ajouter

Pour que le portfolio fonctionne correctement, ajoutez les images suivantes dans le dossier `images/` :

### Images essentielles :
- **hero-bg.jpg** : Image de fond pour la section hero (1920x1080px recommandé)
- **profile.jpg** : Photo de profil pour la section "À propos" (800x800px)

### Galerie de projets :
- **project1.jpg** à **project12.jpg** : Images de vos projets et réalisations
- **video1-poster.jpg** et **video2-poster.jpg** : Miniatures pour les vidéos

### Formations :
- **iut-logo.png** : Logo IUT de Créteil
- **munster-logo.png** : Logo Munster Technological University
- **supluxe-logo.png** : Logo Sup de Luxe

### Certifications :
- **cert1.jpg** à **cert4.jpg** : Images de vos certifications

### Compétences (icônes des logiciels) :
- **skill-photoshop.png**
- **skill-illustrator.png**
- **skill-indesign.png**
- **skill-canva.png**
- **skill-premiere.png**
- **skill-figma.png**
- **skill-wordpress.png**
- **skill-wix.png**
- **skill-shopify.png**
- **skill-mailchimp.png**
- **skill-analytics.png**
- **skill-seo.png**

### Projets détaillés :
- **blog-creation.jpg**
- **website-management.jpg**
- **e-merchandising.jpg**
- **newsletters-ai.jpg**
- **merchandising-vitrine.jpg**

## 🚀 Installation et utilisation

### Option 1 : Ouvrir directement
1. Ouvrez le fichier `index.html` dans votre navigateur web

### Option 2 : Serveur local (recommandé)
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Avec PHP
php -S localhost:8000
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.

## 📱 Fonctionnalités

- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Navigation sticky avec effet de scroll
- ✅ Animations au scroll
- ✅ Galerie d'images avec lightbox
- ✅ Timeline interactive pour les expériences
- ✅ Effet parallaxe sur le hero
- ✅ Transitions fluides
- ✅ Performance optimisée

## 🎯 Sections du portfolio

1. **Hero** - Page d'accueil avec votre nom
2. **À propos** - Présentation personnelle
3. **Galerie** - Projets et réalisations visuelles
4. **Formations** - Parcours académique
5. **Compétences** - Outils et savoir-faire
6. **Ce que je peux apporter** - Expertises principales
7. **Parcours** - Expériences professionnelles
8. **Projets détaillés** - Description des projets
9. **Contact** - Footer avec liens

## 🛠️ Personnalisation

### Modifier les couleurs
Éditez les variables CSS dans `style.css` :

```css
:root {
    --primary-color: #1a1a1a;      /* Couleur principale */
    --secondary-color: #f8f8f8;    /* Couleur secondaire */
    --accent-color: #d4af37;       /* Couleur d'accent (or) */
    --text-color: #333;            /* Couleur du texte */
}
```

### Modifier le contenu
Éditez directement le fichier `index.html` pour changer :
- Votre nom et informations
- Les descriptions
- Les dates et lieux
- Les liens de contact

## 📧 Contact

Pour mettre à jour les informations de contact dans le footer, éditez la section footer dans `index.html` :

```html
<a href="mailto:votre.email@example.com">Email</a>
<a href="https://www.linkedin.com/in/votre-profil">LinkedIn</a>
<a href="tel:+33600000000">Téléphone</a>
```

## 🌐 Déploiement

### GitHub Pages
1. Créez un repository GitHub
2. Uploadez tous les fichiers
3. Activez GitHub Pages dans les paramètres
4. Votre site sera accessible à `https://votre-username.github.io/nom-du-repo`

### Netlify / Vercel
1. Glissez-déposez le dossier du projet
2. Le site sera automatiquement déployé

### Hébergement classique
1. Uploadez tous les fichiers via FTP
2. Assurez-vous que `index.html` est à la racine

## 💡 Conseils

- Optimisez vos images (format WebP ou JPEG optimisé)
- Taille recommandée des images :
  - Hero : 1920x1080px
  - Projets : 1200x800px
  - Logos : 200x200px (PNG avec transparence)
  - Icônes skills : 100x100px
- Utilisez des images de haute qualité
- Ajoutez des textes alternatifs (attribut `alt`) pour l'accessibilité

## 📝 Licence

Ce portfolio est créé pour Mélanie Silva Pothupitiyage. Libre d'utilisation et de modification.

---

**Développé avec ❤️**
