# Seat Search

> **Fini le stress d'avant-partiel.** Seat Search permet aux étudiants de localiser instantanément leur siège dans un amphithéâtre grâce à un plan interactif généré dynamiquement.

**Lien direct :** [seatsearch.antoineragot.com](https://seatsearch.antoineragot.com)

---

## Le Projet

Lors des examens universitaires, trouver sa place exacte dans un grand amphithéâtre peut être source de stress et de perte de temps. **Seat Search** est une application web ultra-légère conçue pour résoudre ce problème. 

L'étudiant scanne un QR code affiché à l'entrée, sélectionne son amphi, tape son numéro de place, et l'application met en surbrillance sa table exacte sur un plan interactif en 2D. En bonus, une petite phrase de motivation aléatoire s'affiche pour détendre l'atmosphère avant l'épreuve.

## Fonctionnalités

* **Recherche instantanée :** Localisation visuelle de la place sur un plan d'amphithéâtre.
* **Génération SVG dynamique :** Les plans (comme l'Amphi Bernard, Paris, Recoura, etc.) sont générés en JavaScript pur avec le DOM SVG.
* **Algorithme de Mapping :** Prise en charge des numérotations complexes en "serpentin" (un siège sur deux, rangées inversées, etc.) grâce à des matrices de données personnalisées.
* **Animations CSS fluides :** Apparition des sièges en cascade pour un effet visuel moderne.
* **Privacy-First (Conforme RGPD) :** Aucun cookie traceur n'est utilisé sur le front-end.
* **Monitoring Serverless :** Statistiques d'usage basiques et envois de notifications en temps réel gérés via un Cloudflare Worker indépendant.

## Stack Technique

Ce projet est conçu pour être rapide, sans dépendances lourdes, et hébergé gratuitement.

* **Front-end :** HTML5, CSS3, Vanilla JavaScript (Manipulation du DOM et SVG).
* **Hébergement Front :** GitHub Pages.
* **Back-end / Analytics :** Cloudflare Workers (Edge Computing) + SQLite (D1).
* **Notifications :** API Telegram Bot (intégrée au Worker).

## Structure Mathématique des Amphis

La complexité du projet réside dans le mapping entre le "numéro de place" (logique administrative) et l'"index physique" du siège sur le dessin vectoriel. 

Le système utilise des tableaux de configuration (`amphiMapPersonalisee`) représentant la grille de la salle. Les places vides ou les allées sont marquées par `-1`, et des fonctions utilitaires (`createReverseMap`) permettent de générer automatiquement les plans inversés pour les amphis symétriques sans dupliquer la donnée.

## Confidentialité & RGPD

Seat Search a été pensé dans le respect de la vie privée des étudiants :
* **Zéro Cookie :** Le front-end ne dépose aucun traceur sur l'appareil.
* **Anonymisation :** Le système de statistiques backend (Cloudflare Worker) tronque automatiquement les adresses IP (ex: 192.168.1.XXX) avant tout stockage en base de données.
* Les données techniques de connexion sont conservées pour une durée maximale de 6 mois à des fins exclusives de maintenance technique et de sécurité.

## Développement Local

Pour faire tourner le projet sur votre machine, aucune installation complexe n'est requise :

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/Codexydev/SeatSearch.git
