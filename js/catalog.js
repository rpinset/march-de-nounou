/**
 * Product catalog for "Le marche de Nounou".
 * Loaded as a classic script (no fetch / JSON) for offline / file:// friendliness.
 */
window.NOUNOU_CATALOG = {
    maxCartThumbnails: 4,
    categories: [
        {
            id: 'fruits',
            name: 'Fruits',
            image: 'assets/images/categories/fruits.svg'
        },
        {
            id: 'legumes',
            name: 'Légumes',
            image: 'assets/images/categories/legumes.svg'
        },
        {
            id: 'produits-laitiers',
            name: 'Produits laitiers',
            image: 'assets/images/categories/produits-laitiers.svg'
        },
        {
            id: 'boulangerie',
            name: 'Pain et boulangerie',
            image: 'assets/images/categories/boulangerie.svg'
        },
        {
            id: 'sucreries',
            name: 'Gourmandises',
            image: 'assets/images/categories/sucreries.svg'
        },
        {
            id: 'boissons',
            name: 'Boissons',
            image: 'assets/images/categories/boissons.svg'
        },
        {
            id: 'epicerie',
            name: 'Épicerie',
            image: 'assets/images/categories/epicerie.svg'
        },
        {
            id: 'poissons',
            name: 'Poissons',
            image: 'assets/images/categories/poissons.svg'
        },
        {
            id: 'viandes',
            name: 'Viandes et œufs',
            image: 'assets/images/categories/viandes.svg'
        },
        {
            id: 'maison',
            name: 'Pour la maison',
            image: 'assets/images/categories/maison.svg'
        }
    ],
    products: [
        // Fruits
        { id: 'pomme', categoryId: 'fruits', name: 'Pomme', image: 'assets/images/products/pomme.svg' },
        { id: 'banane', categoryId: 'fruits', name: 'Banane', image: 'assets/images/products/banane.svg' },
        { id: 'orange', categoryId: 'fruits', name: 'Orange', image: 'assets/images/products/orange.svg' },
        { id: 'fraise', categoryId: 'fruits', name: 'Fraise', image: 'assets/images/products/fraise.svg' },
        { id: 'raisin', categoryId: 'fruits', name: 'Raisin', image: 'assets/images/products/raisin.svg' },
        { id: 'poire', categoryId: 'fruits', name: 'Poire', image: 'assets/images/products/poire.svg' },
        { id: 'cerise', categoryId: 'fruits', name: 'Cerise', image: 'assets/images/products/cerise.svg' },
        { id: 'ananas', categoryId: 'fruits', name: 'Ananas', image: 'assets/images/products/ananas.svg' },
        { id: 'pasteque', categoryId: 'fruits', name: 'Pastèque', image: 'assets/images/products/pasteque.svg' },
        { id: 'kiwi', categoryId: 'fruits', name: 'Kiwi', image: 'assets/images/products/kiwi.svg' },
        { id: 'peche', categoryId: 'fruits', name: 'Pêche', image: 'assets/images/products/peche.svg' },
        { id: 'citron', categoryId: 'fruits', name: 'Citron', image: 'assets/images/products/citron.svg' },

        // Legumes
        { id: 'carotte', categoryId: 'legumes', name: 'Carotte', image: 'assets/images/products/carotte.svg' },
        { id: 'tomate', categoryId: 'legumes', name: 'Tomate', image: 'assets/images/products/tomate.svg' },
        { id: 'poireau', categoryId: 'legumes', name: 'Poireau', image: 'assets/images/products/poireau.svg' },
        { id: 'salade', categoryId: 'legumes', name: 'Salade', image: 'assets/images/products/salade.svg' },
        { id: 'courgette', categoryId: 'legumes', name: 'Courgette', image: 'assets/images/products/courgette.svg' },
        { id: 'navet', categoryId: 'legumes', name: 'Navet', image: 'assets/images/products/navet.svg' },
        { id: 'oignon', categoryId: 'legumes', name: 'Oignon', image: 'assets/images/products/oignon.svg' },
        { id: 'radis', categoryId: 'legumes', name: 'Radis', image: 'assets/images/products/radis.svg' },
        { id: 'potiron', categoryId: 'legumes', name: 'Potiron', image: 'assets/images/products/potiron.svg' },
        { id: 'brocoli', categoryId: 'legumes', name: 'Brocoli', image: 'assets/images/products/brocoli.svg' },
        { id: 'poivron', categoryId: 'legumes', name: 'Poivron', image: 'assets/images/products/poivron.svg' },
        { id: 'chou', categoryId: 'legumes', name: 'Chou', image: 'assets/images/products/chou.svg' },

        // Produits laitiers
        { id: 'lait', categoryId: 'produits-laitiers', name: 'Lait', image: 'assets/images/products/lait.svg' },
        { id: 'fromage', categoryId: 'produits-laitiers', name: 'Fromage', image: 'assets/images/products/fromage.svg' },
        { id: 'yaourt', categoryId: 'produits-laitiers', name: 'Yaourt', image: 'assets/images/products/yaourt.svg' },
        { id: 'beurre', categoryId: 'produits-laitiers', name: 'Beurre', image: 'assets/images/products/beurre.svg' },
        { id: 'creme', categoryId: 'produits-laitiers', name: 'Crème', image: 'assets/images/products/creme.svg' },
        { id: 'mozzarella', categoryId: 'produits-laitiers', name: 'Mozzarella', image: 'assets/images/products/mozzarella.svg' },
        { id: 'emmental', categoryId: 'produits-laitiers', name: 'Emmental', image: 'assets/images/products/emmental.svg' },
        { id: 'ricotta', categoryId: 'produits-laitiers', name: 'Ricotta', image: 'assets/images/products/ricotta.svg' },
        { id: 'fromage-blanc', categoryId: 'produits-laitiers', name: 'Fromage blanc', image: 'assets/images/products/fromage-blanc.svg' },
        { id: 'petit-suisse', categoryId: 'produits-laitiers', name: 'Petit suisse', image: 'assets/images/products/petit-suisse.svg' },
        { id: 'creme-fraiche', categoryId: 'produits-laitiers', name: 'Crème fraîche', image: 'assets/images/products/creme-fraiche.svg' },
        { id: 'lait-chocolat', categoryId: 'produits-laitiers', name: 'Lait chocolat', image: 'assets/images/products/lait-chocolat.svg' },

        // Boulangerie
        { id: 'baguette', categoryId: 'boulangerie', name: 'Baguette', image: 'assets/images/products/baguette.svg' },
        { id: 'pain-campagne', categoryId: 'boulangerie', name: 'Pain campagne', image: 'assets/images/products/pain-campagne.svg' },
        { id: 'croissant', categoryId: 'boulangerie', name: 'Croissant', image: 'assets/images/products/croissant.svg' },
        { id: 'pain-mie', categoryId: 'boulangerie', name: 'Pain de mie', image: 'assets/images/products/pain-mie.svg' },
        { id: 'brioche', categoryId: 'boulangerie', name: 'Brioche', image: 'assets/images/products/brioche.svg' },
        { id: 'pain-complet', categoryId: 'boulangerie', name: 'Pain complet', image: 'assets/images/products/pain-complet.svg' },
        { id: 'tortilla', categoryId: 'boulangerie', name: 'Tortilla', image: 'assets/images/products/tortilla.svg' },
        { id: 'muffin', categoryId: 'boulangerie', name: 'Muffin', image: 'assets/images/products/muffin.svg' },
        { id: 'pain-cereales', categoryId: 'boulangerie', name: 'Pain céréales', image: 'assets/images/products/pain-cereales.svg' },
        { id: 'pretzels', categoryId: 'boulangerie', name: 'Pretzel', image: 'assets/images/products/pretzels.svg' },
        { id: 'pain-hamburger', categoryId: 'boulangerie', name: 'Pain burger', image: 'assets/images/products/pain-hamburger.svg' },
        { id: 'galette', categoryId: 'boulangerie', name: 'Galette', image: 'assets/images/products/galette.svg' },

        // Sucreries
        { id: 'biscuit', categoryId: 'sucreries', name: 'Biscuit', image: 'assets/images/products/biscuit.svg' },
        { id: 'chocolat', categoryId: 'sucreries', name: 'Chocolat', image: 'assets/images/products/chocolat.svg' },
        { id: 'bonbon', categoryId: 'sucreries', name: 'Bonbon', image: 'assets/images/products/bonbon.svg' },
        { id: 'gateau', categoryId: 'sucreries', name: 'Gâteau', image: 'assets/images/products/gateau.svg' },
        { id: 'glace', categoryId: 'sucreries', name: 'Glace', image: 'assets/images/products/glace.svg' },
        { id: 'confiture', categoryId: 'sucreries', name: 'Confiture', image: 'assets/images/products/confiture.svg' },
        { id: 'miel', categoryId: 'sucreries', name: 'Miel', image: 'assets/images/products/miel.svg' },
        { id: 'cookie', categoryId: 'sucreries', name: 'Cookie', image: 'assets/images/products/cookie.svg' },
        { id: 'brownie', categoryId: 'sucreries', name: 'Brownie', image: 'assets/images/products/brownie.svg' },
        { id: 'donut', categoryId: 'sucreries', name: 'Donut', image: 'assets/images/products/donut.svg' },
        { id: 'marshmallow', categoryId: 'sucreries', name: 'Marshmallow', image: 'assets/images/products/marshmallow.svg' },
        { id: 'caramel', categoryId: 'sucreries', name: 'Caramel', image: 'assets/images/products/caramel.svg' },

        // Boissons
        { id: 'eau', categoryId: 'boissons', name: 'Eau', image: 'assets/images/products/eau.svg' },
        { id: 'jus-orange', categoryId: 'boissons', name: 'Jus d\'orange', image: 'assets/images/products/jus-orange.svg' },
        { id: 'soda', categoryId: 'boissons', name: 'Soda', image: 'assets/images/products/soda.svg' },
        { id: 'the', categoryId: 'boissons', name: 'Thé', image: 'assets/images/products/the.svg' },
        { id: 'cafe', categoryId: 'boissons', name: 'Café', image: 'assets/images/products/cafe.svg' },
        { id: 'jus-pomme', categoryId: 'boissons', name: 'Jus de pomme', image: 'assets/images/products/jus-pomme.svg' },
        { id: 'smoothie', categoryId: 'boissons', name: 'Smoothie', image: 'assets/images/products/smoothie.svg' },
        { id: 'limonade', categoryId: 'boissons', name: 'Limonade', image: 'assets/images/products/limonade.svg' },
        { id: 'sirop', categoryId: 'boissons', name: 'Sirop', image: 'assets/images/products/sirop.svg' },
        { id: 'eau-gazeuse', categoryId: 'boissons', name: 'Eau gazeuse', image: 'assets/images/products/eau-gazeuse.svg' },
        { id: 'jus-raisin', categoryId: 'boissons', name: 'Jus de raisin', image: 'assets/images/products/jus-raisin.svg' },
        { id: 'chocolat-chaud', categoryId: 'boissons', name: 'Chocolat chaud', image: 'assets/images/products/chocolat-chaud.svg' },

        // Epicerie
        { id: 'pates', categoryId: 'epicerie', name: 'Pâtes', image: 'assets/images/products/pates.svg' },
        { id: 'riz', categoryId: 'epicerie', name: 'Riz', image: 'assets/images/products/riz.svg' },
        { id: 'farine', categoryId: 'epicerie', name: 'Farine', image: 'assets/images/products/farine.svg' },
        { id: 'sucre', categoryId: 'epicerie', name: 'Sucre', image: 'assets/images/products/sucre.svg' },
        { id: 'sel', categoryId: 'epicerie', name: 'Sel', image: 'assets/images/products/sel.svg' },
        { id: 'huile', categoryId: 'epicerie', name: 'Huile', image: 'assets/images/products/huile.svg' },
        { id: 'conserve-tomate', categoryId: 'epicerie', name: 'Tomates', image: 'assets/images/products/conserve-tomate.svg' },
        { id: 'cereales', categoryId: 'epicerie', name: 'Céréales', image: 'assets/images/products/cereales.svg' },
        { id: 'lentilles', categoryId: 'epicerie', name: 'Lentilles', image: 'assets/images/products/lentilles.svg' },
        { id: 'haricots', categoryId: 'epicerie', name: 'Haricots', image: 'assets/images/products/haricots.svg' },
        { id: 'couscous', categoryId: 'epicerie', name: 'Couscous', image: 'assets/images/products/couscous.svg' },
        { id: 'semoule', categoryId: 'epicerie', name: 'Semoule', image: 'assets/images/products/semoule.svg' },

        // Poissons
        { id: 'saumon', categoryId: 'poissons', name: 'Saumon', image: 'assets/images/products/saumon.svg' },
        { id: 'thon', categoryId: 'poissons', name: 'Thon', image: 'assets/images/products/thon.svg' },
        { id: 'cabillaud', categoryId: 'poissons', name: 'Cabillaud', image: 'assets/images/products/cabillaud.svg' },
        { id: 'sardine', categoryId: 'poissons', name: 'Sardine', image: 'assets/images/products/sardine.svg' },
        { id: 'crevette', categoryId: 'poissons', name: 'Crevette', image: 'assets/images/products/crevette.svg' },
        { id: 'moule', categoryId: 'poissons', name: 'Moule', image: 'assets/images/products/moule.svg' },
        { id: 'sole', categoryId: 'poissons', name: 'Sole', image: 'assets/images/products/sole.svg' },
        { id: 'truite', categoryId: 'poissons', name: 'Truite', image: 'assets/images/products/truite.svg' },
        { id: 'crabe', categoryId: 'poissons', name: 'Crabe', image: 'assets/images/products/crabe.svg' },
        { id: 'calamars', categoryId: 'poissons', name: 'Calamars', image: 'assets/images/products/calamars.svg' },
        { id: 'anchois', categoryId: 'poissons', name: 'Anchois', image: 'assets/images/products/anchois.svg' },
        { id: 'homard', categoryId: 'poissons', name: 'Homard', image: 'assets/images/products/homard.svg' },

        // Viandes
        { id: 'oeufs', categoryId: 'viandes', name: 'Œufs', image: 'assets/images/products/oeufs.svg' },
        { id: 'poulet', categoryId: 'viandes', name: 'Poulet', image: 'assets/images/products/poulet.svg' },
        { id: 'steak', categoryId: 'viandes', name: 'Steak', image: 'assets/images/products/steak.svg' },
        { id: 'jambon', categoryId: 'viandes', name: 'Jambon', image: 'assets/images/products/jambon.svg' },
        { id: 'saucisse', categoryId: 'viandes', name: 'Saucisse', image: 'assets/images/products/saucisse.svg' },
        { id: 'dinde', categoryId: 'viandes', name: 'Dinde', image: 'assets/images/products/dinde.svg' },
        { id: 'bacon', categoryId: 'viandes', name: 'Bacon', image: 'assets/images/products/bacon.svg' },
        { id: 'cotelette', categoryId: 'viandes', name: 'Côtelette', image: 'assets/images/products/cotelette.svg' },
        { id: 'merguez', categoryId: 'viandes', name: 'Merguez', image: 'assets/images/products/merguez.svg' },
        { id: 'nuggets', categoryId: 'viandes', name: 'Nuggets', image: 'assets/images/products/nuggets.svg' },
        { id: 'pate', categoryId: 'viandes', name: 'Pâté', image: 'assets/images/products/pate.svg' },
        { id: 'lardons', categoryId: 'viandes', name: 'Lardons', image: 'assets/images/products/lardons.svg' },

        // Maison
        { id: 'eponge', categoryId: 'maison', name: 'Éponge', image: 'assets/images/products/eponge.svg' },
        { id: 'savon', categoryId: 'maison', name: 'Savon', image: 'assets/images/products/savon.svg' },
        { id: 'serpilliere', categoryId: 'maison', name: 'Serpillière', image: 'assets/images/products/serpilliere.svg' },
        { id: 'balai', categoryId: 'maison', name: 'Balai', image: 'assets/images/products/balai.svg' },
        { id: 'torchon', categoryId: 'maison', name: 'Torchon', image: 'assets/images/products/torchon.svg' },
        { id: 'assiette', categoryId: 'maison', name: 'Assiette', image: 'assets/images/products/assiette.svg' },
        { id: 'verre', categoryId: 'maison', name: 'Verre', image: 'assets/images/products/verre.svg' },
        { id: 'fourchette', categoryId: 'maison', name: 'Fourchette', image: 'assets/images/products/fourchette.svg' },
        { id: 'cuillere', categoryId: 'maison', name: 'Cuillère', image: 'assets/images/products/cuillere.svg' },
        { id: 'casserole', categoryId: 'maison', name: 'Casserole', image: 'assets/images/products/casserole.svg' },
        { id: 'panier', categoryId: 'maison', name: 'Panier', image: 'assets/images/products/panier.svg' },
        { id: 'tablier', categoryId: 'maison', name: 'Tablier', image: 'assets/images/products/tablier.svg' }
    ]
};
