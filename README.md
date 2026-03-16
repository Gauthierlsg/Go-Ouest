# 🎾 GO OUEST 2026

Application web de gestion de tournoi de tennis mixte en double.

## Format

- **23 duos** répartis en **7 poules** (5 poules de 3 + 2 poules de 4)
- **27 matchs** de poule sur 2 terrains en ~5h
- Phase finale : **Quarts → Demi-finales → Finale** + match pour la 3ème place
- **8 qualifiés** : 1er de chaque poule + meilleur 2ème des poules de 4 (wildcard)

## Fonctionnalités

- Planning automatique anti-back-to-back (aucun duo ne joue 2 fois d'affilée)
- Classements en temps réel par poule
- Bracket de phase finale avec arbre visuel QF → SF → Finale
- Page publique en lecture seule pour les participants
- Connexion admin simple par mot de passe pour les organisateurs
- Saisie des scores synchronisée entre appareils via Vercel Blob
- Réinitialisation rapide + génération de mock data côté admin
- Interface mobile-first (optimisée téléphone pour le jour J)

## Stack

Vanilla JS + [Vite](https://vitejs.dev/) — aucune dépendance front.

## Lancer en local

```bash
npm install
npm run dev
```

En local avec `vite`, l'app passe automatiquement en mode local de développement :
- lecture / écriture sur `localStorage`,
- pas d'API admin,
- pas de synchro multi-appareils.

## Déploiement jour J

Pour avoir la version publique + admin partagée sur Vercel, configure ces variables d'environnement :

- `ADMIN_PASSWORD` : mot de passe simple partagé aux organisateurs
- `ADMIN_SESSION_SECRET` : secret long pour signer le cookie admin
- `BLOB_READ_WRITE_TOKEN` : token du store Vercel Blob
- `TOURNAMENT_STATE_PATH` : optionnel, chemin du JSON de tournoi dans Blob

Le fonctionnement une fois déployé :

- tous les participants voient la même page en lecture seule,
- les organisateurs cliquent sur `Connexion admin` en haut à droite,
- après mot de passe, cet appareil peut saisir / tester / réinitialiser,
- les autres appareils reçoivent les mises à jour automatiquement.

Pour tester les routes API en local, utilise `vercel dev` plutôt que `vite`.
