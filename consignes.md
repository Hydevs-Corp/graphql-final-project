Le but de cet exercice est de créer un réseau social où les utilisateurs peuvent s'inscrire, publier des articles, commenter les publications d'autres utilisateurs, et "liker" des articles.  
Ce projet mettra en pratique l'utilisation des queries, mutations, et l'intégration avec Prisma pour la gestion de la base de données tout en implémentant la partie Frontend de votre produit.

## Groupes

Vous travaillerez en groupe de 2 à 4 (maximum) élèves par groupe.

## Structure du Projet

Le projet sera divisé en deux parties :

1. **Serveur GraphQL (Backend)**
    - Utilisez Apollo Server, Prisma, et GraphQL Codegen comme vu en cours.
    - Implémentez l'authentification JWT pour les utilisateurs comme vu en cours.
    - Créez des modèles Prisma pour les utilisateurs, articles, commentaires, et likes.
    - Développez les queries et mutations nécessaires pour gérer les utilisateurs, les articles, les commentaires, et les likes.
2. **Client Front-End (Frontend)**
    - Utilisez un framework moderne comme React, Vue, ou Svelte.
    - Intégrez Apollo Client pour communiquer avec le serveur GraphQL et gérez l'état des applications.
    - Utilisez GraphQL Codegen pour générer automatiquement les hooks/types à partir des schémas GraphQL.
    - Créez une interface utilisateur pour l'inscription/connexion des utilisateurs, la publication d'articles, l'affichage d'articles avec commentaires et likes, et la navigation entre les articles.

## Fonctionnalités Clés

-   **Authentification des Utilisateurs**
    -   Inscription et connexion avec validation et gestion des sessions utilisateur.
-   **Gestion des Articles**
    -   Création, lecture, mise à jour, et suppression d'articles.
    -   Affichage des articles avec l'auteur, le contenu, les commentaires, et les likes.
-   **Interaction avec les Articles**
    -   Possibilité pour les utilisateurs de commenter les articles.
    -   Système de "like" pour les articles.
-   **Navigation et Filtrage**
    -   Vue d'ensemble des derniers articles sur la page principale.
    -   Filtre des articles par auteur ou popularité (nombre de likes).

### Instructions Spécifiques

-   Assurez-vous que le serveur et le client gèrent correctement les erreurs et les cas d'authentification manquée.

## Notation

### Qualité de code

Vous devrez fournir un code de qualité.

Vous utiliserez TypeScript en mode strict (**s’il n’est pas en mode strict ce sera ZÉRO**) à la fois côté client mais aussi côté serveur.  
Le type `any` est strictement interdit.  
Pareil pour les pratiques `as unknown as Something`.

### Autonomie

Vous serez noté sur votre capacité à résoudre des problèmes de manière autonome et à trouver des solutions par vous-même.

**Si vous rencontrez un problème:**

1. **Effectuez au moins trois recherches sur Google** pour tenter de trouver une solution à votre problème. Prenez le temps de lire attentivement les résultats et de comprendre les différentes approches proposées.
2. **Appliquez les solutions trouvées** à votre problème et observez les résultats. Il est important de tester par vous-même et de tirer des leçons de chaque tentative.

Si, après avoir effectué ces étapes, le problème persiste et que vous ne trouvez pas de solution satisfaisante, **n'hésitez pas à me solliciter pour de l'aide**.

Vous devrez m’expliquer ce qui vous bloque en utilisant des termes techniques

M’appeler et me dire “Monsieur ca marche pas” sans explications vous octroiera un malus sur la notation.  
Pareil pour "Monsieur ca me dit qu'il y'a une erreur"

### Livrables

-   Un monorepo GitHub avec un dossier pour le serveur et un pour le client, chacun avec un README détaillant les instructions d'installation et d'utilisation.
-   Une brève présentation ou démonstration du projet achevé, mettant en évidence les fonctionnalités principales et les défis rencontrés.
