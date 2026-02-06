# Nzela Talents

Site vitrine de l'association Nzela Talents, une initiative qui valorise les talents de la diaspora congolaise et africaine.

## Installation

```bash
npm install
```

## Commandes

| Commande          | Description                              |
| :---------------- | :--------------------------------------- |
| `npm run dev`     | Lance le serveur de developpement        |
| `npm run build`   | Build le site pour la production         |
| `npm run preview` | Previsualise le build avant deploiement  |

## Configuration

Copier le fichier `.env.example` vers `.env` et renseigner les variables :

```bash
cp .env.example .env
```

Variables requises :
- `RESEND_API_KEY` : Cle API Resend pour l'envoi d'emails
- `CONTACT_EMAIL` : Adresse email de destination du formulaire de contact

## Stack technique

- Astro
- SCSS + CSS Modules
- Resend (envoi d'emails)
- Vercel (hebergement)

## Structure du projet

```
src/
	components/     # Composants reutilisables (Header, Footer, etc.)
	layouts/        # Layout principal
	pages/          # Pages du site
	styles/         # Variables et styles globaux
	public/
	images/         # Images et logo
	videos/         # Videos
```

## Contact

- Site : nzelatalents.com
- Email : contact@nzelatalents.com
