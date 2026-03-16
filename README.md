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
- Saisie des scores directement sur l'interface
- Persistance des scores en localStorage
- Export / import JSON des scores + réinitialisation rapide
- Partage multi-appareils via lien snapshot en lecture seule
- Interface mobile-first (optimisée téléphone pour le jour J)

## Stack

Vanilla JS + [Vite](https://vitejs.dev/) — aucune dépendance front.

## Lancer en local

```bash
npm install
npm run dev
```
