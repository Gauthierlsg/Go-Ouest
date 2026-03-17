# 🎾 GO OUEST 2026

Application web de gestion de tournoi de tennis mixte en double.

## Format

- **23 duos** répartis en **7 poules** (4 poules de 3 + 3 poules de 4)
- **27 matchs** de poule sur 2 terrains en ~6h
- Phase finale : **Quarts → Demi-finales → Finale** + match pour la 3ème place
- **8 qualifiés** : 1er de chaque poule + meilleur 2ème des poules de 4 (wildcard au goal average)

## Fonctionnalités

- Planning automatique anti-back-to-back (aucun duo ne joue 2 fois d'affilée)
- Classements en temps réel par poule
- Bracket de phase finale avec arbre SVG interactif QF → SF → Finale
- Refresh automatique du bracket après saisie d'un score (propagation au round suivant)
- Page publique en lecture seule pour les participants
- Connexion admin par mot de passe pour les organisateurs (défaut : `mdp`)
- Saisie des scores synchronisée entre appareils via Vercel Blob
- Boutons admin (mock data, reset) visibles uniquement pour les admins connectés
- Footer avec liens rapides : 📸 Photos · 🎾 Tennis · 🏠 AT
- Interface mobile-first (optimisée téléphone pour le jour J)

## Stack

Vanilla JS + [Vite](https://vitejs.dev/) — aucune dépendance front.
API serverless Vercel (Node) pour la session admin et le stockage Blob.

## Lancer en local

```bash
npm install
npm run dev
```

En local avec `vite`, l'app passe automatiquement en mode développement :
- lecture / écriture sur `localStorage`
- pas d'API admin
- pas de synchro multi-appareils

Pour tester les routes API en local :

```bash
vercel dev
```

## Déploiement

Déployer sur [Vercel](https://vercel.com/) avec les variables d'environnement suivantes :

| Variable | Description |
|---|---|
| `ADMIN_PASSWORD` | Mot de passe partagé aux organisateurs (défaut : `mdp`) |
| `ADMIN_SESSION_SECRET` | Secret long pour signer le cookie de session admin |
| `BLOB_READ_WRITE_TOKEN` | Token du store Vercel Blob |
| `TOURNAMENT_STATE_PATH` | *(optionnel)* Chemin du JSON de tournoi dans Blob |

Une fois déployé :
- Tous les participants voient la même page en lecture seule
- Les organisateurs cliquent sur l'icône admin en haut à droite
- Après authentification, l'appareil peut saisir les scores, générer des mock data ou réinitialiser
- Les autres appareils reçoivent les mises à jour automatiquement (polling)
