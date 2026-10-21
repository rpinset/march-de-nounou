# Le marché de Nounou

Site : https://rpinset.github.io/march-de-nounou/


Petite application web de caisse de dînette pour enfant, destinée à une ancienne tablette Apple (paysage).

Application **statique** : HTML + CSS + JavaScript simple, sans framework, sans CDN, sans backend, sans Internet.

## Démarrer la démonstration (ordinateur)

### Option A — ouvrir le fichier

1. Ouvrir `index.html` dans un navigateur (double-clic ou glisser-déposer).
2. Parcourir les familles, ajouter des articles, valider le panier.

Le mode `file://` convient pour une démo rapide. La persistance (`localStorage`) n’est **pas** utilisée et n’est pas nécessaire.

### Option B — serveur local (recommandé)

Depuis la racine du dépôt :

```bash
# Python 3
python3 -m http.server 8080

# ou Node (si disponible)
npx --yes serve -l 8080
```

Puis ouvrir `http://localhost:8080` dans le navigateur.

## Accéder depuis la tablette (iPad)

1. Brancher l’ordinateur et l’iPad sur le **même réseau Wi‑Fi**.
2. Lancer un serveur statique sur l’ordinateur (voir ci-dessus).
3. Repérer l’adresse IP locale de l’ordinateur (ex. `192.168.1.42`).
4. Sur l’iPad, ouvrir Safari et aller sur `http://192.168.1.42:8080`.

### GitHub Pages

Site du projet :

**https://rpinset.github.io/march-de-nounou/**

Aucun service externe n’est requis au runtime : toutes les images et scripts sont locaux.

## Parcours

1. Accueil — choisir une famille (10 familles illustrées).
2. Liste — 12 articles en grille 4×3 (la 3ᵉ ligne se découvre en défilant).
3. Fiche — quantité (− / +) puis « Ajouter au panier ».
4. Pied de page — résumé permanent du panier + validation.
5. Récapitulatif → félicitations → « Recommencer ».

## Modifier le catalogue

Fichier : `js/catalog.js`

### Ajouter ou modifier une famille

Dans `categories` :

```js
{
  id: 'legumes',
  name: 'Légumes',
  image: 'assets/images/categories/legumes.svg'
}
```

- `id` : identifiant unique, sans espaces ni accents.
- Placer l’illustration dans `assets/images/categories/`.
- Prévoir **exactement 12 produits** rattachés à cet `id`.

### Ajouter ou modifier un article

Dans `products` :

```js
{
  id: 'tomate',
  categoryId: 'legumes',
  name: 'Tomate',
  image: 'assets/images/products/tomate.svg'
}
```

- `categoryId` doit correspondre à une famille existante.
- Image dans `assets/images/products/` (noms de fichiers simples).

### Nombre de miniatures dans le pied de page

```js
maxCartThumbnails: 4
```

## Couleurs et dimensions

Fichier : `css/styles.css` — variables en tête de fichier :

| Variable | Rôle |
| --- | --- |
| `--brand` / `--brand-dark` | Bleu marché |
| `--accent` | Boutons principaux (jaune/orangé) |
| `--bg-top` / `--bg-bottom` | Fond dégradé |
| `--touch` | Taille minimale tactile (56px) |
| `--header-h` / `--cart-h` | Hauteurs en-tête / panier |

La grille produits occupe **toute la hauteur restante** entre le titre de famille et le pied de page panier. La hauteur de ligne est calculée pour que **exactement 2 lignes** remplissent cette zone ; la 3ᵉ ligne se découvre au défilement (selon la résolution de l’écran).

## Ce qui est conservé / perdu

| Action | Effet |
| --- | --- |
| Navigation entre familles | Panier **conservé** |
| Rotation portrait / paysage | Panier **conservé** |
| Rechargement de la page | Panier **vidé** (mémoire seule) |
| « Recommencer » | Panier vidé, retour accueil |

## Hors périmètre (PoC)

- Pas de prix / paiement
- Pas de stock
- Pas de compte utilisateur
- Pas de connexion Odoo
- Pas de backend / base de données
- Pas d’ESP32 / Arduino dans cette version
- Pas d’admin catalogue

## Préparation ESP32 / Raspberry / Arduino

Décisions déjà respectées pour une migration future :

- Application entièrement statique
- Catalogue séparé de la logique d’affichage
- Chemins relatifs
- Images locales
- Aucune dépendance réseau ni compilation

La faisabilité matérielle fera l’objet d’une spécification dédiée.

## Structure

```
.
├── index.html
├── css/styles.css
├── js/catalog.js
├── js/app.js
├── assets/images/
│   ├── categories/
│   ├── products/
│   └── interface/
├── TESTS.md
└── README.md
```

## Tests de recette

Voir `TESTS.md` (checklist issue des spécifications).

## Licence

Contenu pédagogique libre d’usage dans le cadre du projet.

## Illustrations

Pictogrammes **Fluent Emoji** (Microsoft, licence MIT), avec quelques variantes dessinées pour distinguer les articles d’une même famille. Détail : `assets/images/CREDITS.md`.
