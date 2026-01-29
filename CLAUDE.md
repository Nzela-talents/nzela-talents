# Nzela Talents - Site Web

## Description du projet
Site vitrine statique pour l'association Nzela Talents, une initiative qui valorise les talents de la diaspora congolaise et africaine pour créer un pont vers le développement du continent.

## Stack technique
- **Framework** : Astro
- **Styles** : SCSS + CSS Modules (`.module.scss`)
- **Animations** : AOS (Animate On Scroll)
- **Fonts** : Inter (Google Fonts)

## Structure du projet
```
src/
  ├── components/              # Composants réutilisables
  │   ├── Header/
  │   │   ├── Header.astro
  │   │   └── Header.module.scss
  │   └── Footer/
  │       ├── Footer.astro
  │       └── Footer.module.scss
  ├── layouts/                 # Layouts de page
  │   └── Layout/
  │       ├── Layout.astro
  │       └── Layout.module.scss
  ├── pages/                   # Pages du site
  │   ├── index.astro
  │   ├── index.module.scss
  │   ├── mission.astro
  │   ├── actions.astro
  │   ├── talents.astro
  │   ├── a-propos.astro
  │   └── contact.astro
  └── styles/                  # Styles globaux
      ├── _variables.scss      # Couleurs, typo, espacements
      ├── _mixins.scss         # Mixins (breakpoints, boutons, etc.)
      ├── _base.scss           # Reset et styles globaux
      └── main.scss            # Point d'entrée global
public/
  ├── images/                  # Images (logo, etc.)
  └── fonts/                   # Polices locales (si besoin)
```

## Convention CSS Modules

Chaque composant a son fichier `.module.scss` séparé :

```astro
---
import styles from './Header.module.scss';
---

<header class={styles.header}>
  <nav class={styles.nav}>
    <a class={styles.link}>Accueil</a>
  </nav>
</header>
```

**Noms de classes** : camelCase simple (`.navLink`, `.heroTitle`)
**Scoping** : automatique via CSS Modules

## Charte graphique

### Couleurs (issues du logo)
- **Primaire** : `#1e3a5f` (bleu marine)
- **Secondaire** : `#c45a3b` (terre cuite/orange)
- **Background** : `#faf8f5` (beige clair)
- **Texte** : `#2d2d2d`
- **Texte light** : `#666666`

### Typographie
- Police : Inter
- Weights : 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## Pages à créer
1. ✅ Accueil (index.astro)
2. ⬜ Notre mission (mission.astro)
3. ⬜ Nos actions (actions.astro)
4. ⬜ Les Talents (talents.astro)
5. ⬜ À propos (a-propos.astro)
6. ⬜ Contact (contact.astro)

## Commandes
```bash
npm run dev      # Serveur de développement
npm run build    # Build pour production
npm run preview  # Prévisualiser le build
```

## Inspiration design
- Site Ticket for Change
- Design épuré, ton inspirant et engagé
- Mise en avant de l'impact humain
- Navigation simple et fluide

## Contact association
- Email : contact@nzelatalents.com
- Présidente : Kahembe de Maere Evelyne

## Évolutions futures prévues
- Phase 2 : CMS headless (Strapi/Sanity) pour gestion du contenu
- Phase 3 : Espace membre / plateforme de talents
