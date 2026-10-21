(function () {
    'use strict';

    var PLACEHOLDER = 'assets/images/interface/placeholder.svg';
    var MIN_QTY = 1;
    var MAX_QTY = 99;

    /* Tiny closest polyfill for older WebKit (iPad) */
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (selector) {
            var el = this;
            while (el && el.nodeType === 1) {
                if (el.matches ? el.matches(selector) : (el.msMatchesSelector && el.msMatchesSelector(selector))) {
                    return el;
                }
                el = el.parentElement || el.parentNode;
            }
            return null;
        };
    }
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    }

    var catalog = window.NOUNOU_CATALOG;
    var state = {
        currentView: 'home',
        selectedCategoryId: null,
        selectedProductId: null,
        selectedQuantity: 1,
        cart: [],
        categoryScrollPosition: 0,
        previousView: 'home',
        addLocked: false,
        scrollHintDismissed: false
    };

    var els = {};

    function byId(id) {
        return document.getElementById(id);
    }

    function getCategory(id) {
        var i;
        for (i = 0; i < catalog.categories.length; i += 1) {
            if (catalog.categories[i].id === id) {
                return catalog.categories[i];
            }
        }
        return null;
    }

    function getProduct(id) {
        var i;
        for (i = 0; i < catalog.products.length; i += 1) {
            if (catalog.products[i].id === id) {
                return catalog.products[i];
            }
        }
        return null;
    }

    function productsForCategory(categoryId) {
        var list = [];
        var i;
        for (i = 0; i < catalog.products.length; i += 1) {
            if (catalog.products[i].categoryId === categoryId) {
                list.push(catalog.products[i]);
            }
        }
        return list;
    }

    function cartTotalUnits() {
        var total = 0;
        var i;
        for (i = 0; i < state.cart.length; i += 1) {
            total += state.cart[i].quantity;
        }
        return total;
    }

    function findCartLine(productId) {
        var i;
        for (i = 0; i < state.cart.length; i += 1) {
            if (state.cart[i].productId === productId) {
                return state.cart[i];
            }
        }
        return null;
    }

    function setImageFallback(img) {
        img.onerror = function () {
            if (img.getAttribute('data-fallback') === '1') {
                return;
            }
            img.setAttribute('data-fallback', '1');
            img.src = PLACEHOLDER;
        };
    }

    function showToast(message) {
        els.toast.textContent = message;
        els.toast.classList.add('is-visible');
        window.clearTimeout(showToast._timer);
        showToast._timer = window.setTimeout(function () {
            els.toast.classList.remove('is-visible');
        }, 1400);
    }

    function hideAllViews() {
        var nodes = document.querySelectorAll('.view');
        var i;
        for (i = 0; i < nodes.length; i += 1) {
            nodes[i].hidden = true;
        }
    }

    function setBackVisible(visible) {
        els.btnBack.hidden = !visible;
    }

    function updateQtyButtons(minusBtn, plusBtn, quantity) {
        minusBtn.disabled = quantity <= MIN_QTY;
        plusBtn.disabled = quantity >= MAX_QTY;
    }

    function renderCartFooter() {
        var total = cartTotalUnits();
        var maxThumbs = catalog.maxCartThumbnails || 4;
        var html = '';
        var i;
        var line;
        var product;
        var extra;

        els.btnValidateCart.disabled = total === 0;

        if (total === 0) {
            els.cartSummary.innerHTML = '<p class="cart-empty-label">Mon panier est vide</p>';
            els.cartTotal.textContent = '';
            return;
        }

        html += '<span class="cart-label">Mon panier</span>';
        html += '<div class="cart-thumbs">';

        for (i = 0; i < state.cart.length && i < maxThumbs; i += 1) {
            line = state.cart[i];
            product = getProduct(line.productId);
            if (!product) {
                continue;
            }
            html += '<div class="cart-thumb">';
            html += '<img src="' + product.image + '" alt="" data-fallback="0">';
            html += '<span>×' + line.quantity + '</span>';
            html += '</div>';
        }

        extra = state.cart.length - maxThumbs;
        if (extra > 0) {
            html += '<div class="cart-more">+' + extra + ' autres</div>';
        }

        html += '</div>';
        els.cartSummary.innerHTML = html;
        els.cartTotal.textContent = total + (total > 1 ? ' articles' : ' article');

        var imgs = els.cartSummary.querySelectorAll('img');
        for (i = 0; i < imgs.length; i += 1) {
            setImageFallback(imgs[i]);
        }
    }

    function renderHome() {
        var html = '';
        var i;
        var cat;

        state.currentView = 'home';
        hideAllViews();
        els.viewHome.hidden = false;
        setBackVisible(false);
        els.appSubtitle.textContent = 'Qu\'est-ce qu\'on achète aujourd\'hui ?';

        for (i = 0; i < catalog.categories.length; i += 1) {
            cat = catalog.categories[i];
            html += '<button type="button" class="tile category-tile" data-category-id="' + cat.id + '">';
            html += '<img src="' + cat.image + '" alt="" data-fallback="0">';
            html += '<span class="tile-label">' + cat.name + '</span>';
            html += '</button>';
        }

        els.categoryGrid.innerHTML = html;

        var imgs = els.categoryGrid.querySelectorAll('img');
        for (i = 0; i < imgs.length; i += 1) {
            setImageFallback(imgs[i]);
        }

        renderCartFooter();
    }

    function getGridColumnCount(grid) {
        var template;
        var parts;

        if (!window.getComputedStyle) {
            return 4;
        }

        template = window.getComputedStyle(grid).gridTemplateColumns || '';
        parts = template.replace(/\[.*?\]/g, '').trim().split(/\s+/).filter(Boolean);
        return parts.length > 0 ? parts.length : 4;
    }

    function measureProductGridViewport() {
        var grid = els.productGrid;
        var gap = 12;
        var available;
        var rowHeight;
        var cols;

        if (!grid || !grid.querySelector('.product-tile')) {
            return;
        }

        /* Let the flex layout give the grid 100% of the free space */
        grid.style.height = '';
        grid.style.maxHeight = '';
        grid.style.gridAutoRows = '';

        /* Force layout, then size rows so exactly 2 fill the viewport */
        available = grid.clientHeight;
        if (window.getComputedStyle) {
            gap = parseFloat(window.getComputedStyle(grid).rowGap || window.getComputedStyle(grid).gap) || 12;
        }

        if (available < 80) {
            return;
        }

        cols = getGridColumnCount(grid);
        rowHeight = Math.floor((available - gap) / 2);

        /*
         * In portrait (fewer columns), avoid extremely tall cells that
         * stretch cards out of proportion — prefer a near-square card.
         */
        if (cols <= 2 && grid.clientWidth > 0) {
            var colWidth = (grid.clientWidth - (gap * Math.max(cols - 1, 0))) / cols;
            var maxProportional = Math.floor(colWidth * 1.2);
            if (rowHeight > maxProportional) {
                rowHeight = maxProportional;
            }
        }

        if (rowHeight < 56) {
            rowHeight = 56;
        }

        grid.style.gridAutoRows = rowHeight + 'px';
    }

    function updateScrollHint() {
        var grid = els.productGrid;
        var atBottom;

        if (!grid || state.scrollHintDismissed) {
            els.scrollHint.hidden = true;
            return;
        }

        atBottom = grid.scrollTop + grid.clientHeight >= grid.scrollHeight - 4;
        els.scrollHint.hidden = atBottom;
        if (atBottom) {
            state.scrollHintDismissed = true;
        }
    }

    function renderCategory() {
        var category = getCategory(state.selectedCategoryId);
        var products = productsForCategory(state.selectedCategoryId);
        var html = '';
        var i;
        var product;

        state.currentView = 'category';
        state.addLocked = false;
        hideAllViews();
        els.viewCategory.hidden = false;
        setBackVisible(true);
        els.appSubtitle.textContent = 'Choisis un article';
        els.categoryTitle.textContent = category ? category.name : '';

        for (i = 0; i < products.length; i += 1) {
            product = products[i];
            html += '<button type="button" class="tile product-tile" data-product-id="' + product.id + '">';
            html += '<img src="' + product.image + '" alt="" data-fallback="0">';
            html += '<span class="tile-label">' + product.name + '</span>';
            html += '</button>';
        }

        els.productGrid.innerHTML = html;

        var imgs = els.productGrid.querySelectorAll('img');
        for (i = 0; i < imgs.length; i += 1) {
            setImageFallback(imgs[i]);
        }

        state.scrollHintDismissed = false;
        els.scrollHint.hidden = false;

        scheduleProductGridMeasure();
        renderCartFooter();
    }

    function scheduleProductGridMeasure() {
        var run = function () {
            measureProductGridViewport();
            els.productGrid.scrollTop = state.categoryScrollPosition || 0;
            updateScrollHint();
        };

        if (window.requestAnimationFrame) {
            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(run);
            });
        } else {
            window.setTimeout(run, 50);
        }
    }

    function renderProduct() {
        var product = getProduct(state.selectedProductId);
        var category = getCategory(state.selectedCategoryId);

        state.currentView = 'product';
        state.selectedQuantity = 1;
        state.addLocked = false;
        hideAllViews();
        els.viewProduct.hidden = false;
        setBackVisible(true);
        els.appSubtitle.textContent = category ? category.name : '';

        if (!product) {
            return;
        }

        els.productName.textContent = product.name;
        els.productImage.src = product.image;
        els.productImage.alt = product.name;
        els.productImage.setAttribute('data-fallback', '0');
        setImageFallback(els.productImage);
        els.productQty.textContent = String(state.selectedQuantity);
        updateQtyButtons(els.btnQtyMinus, els.btnQtyPlus, state.selectedQuantity);
        els.btnAddToCart.disabled = false;

        renderCartFooter();
    }

    function renderCartModal() {
        var html = '';
        var i;
        var line;
        var product;

        if (state.cart.length === 0) {
            html = '<p class="modal-empty">Mon panier est vide</p>';
        } else {
            for (i = 0; i < state.cart.length; i += 1) {
                line = state.cart[i];
                product = getProduct(line.productId);
                if (!product) {
                    continue;
                }
                html += '<div class="cart-line" data-product-id="' + product.id + '">';
                html += '<img src="' + product.image + '" alt="' + product.name + '" data-fallback="0">';
                html += '<div class="cart-line-info">';
                html += '<strong>' + product.name + '</strong>';
                html += '<div class="qty-controls">';
                html += '<button type="button" class="btn btn-qty btn-cart-minus" aria-label="Diminuer la quantité" ' +
                    (line.quantity <= MIN_QTY ? 'disabled' : '') + '>−</button>';
                html += '<span class="qty-value">' + line.quantity + '</span>';
                html += '<button type="button" class="btn btn-qty btn-cart-plus" aria-label="Augmenter la quantité" ' +
                    (line.quantity >= MAX_QTY ? 'disabled' : '') + '>+</button>';
                html += '</div>';
                html += '</div>';
                html += '<button type="button" class="btn btn-danger btn-remove" aria-label="Supprimer ' + product.name + '">Supprimer</button>';
                html += '</div>';
            }
        }

        els.cartLines.innerHTML = html;

        var imgs = els.cartLines.querySelectorAll('img');
        for (i = 0; i < imgs.length; i += 1) {
            setImageFallback(imgs[i]);
        }

        els.modalCart.hidden = false;
        els.overlay.hidden = false;
    }

    function renderRecap() {
        var html = '';
        var i;
        var line;
        var product;
        var total = cartTotalUnits();

        for (i = 0; i < state.cart.length; i += 1) {
            line = state.cart[i];
            product = getProduct(line.productId);
            if (!product) {
                continue;
            }
            html += '<div class="recap-line">';
            html += '<img src="' + product.image + '" alt="" data-fallback="0">';
            html += '<span class="recap-name">' + product.name + '</span>';
            html += '<span class="recap-qty">× ' + line.quantity + '</span>';
            html += '</div>';
        }

        els.recapLines.innerHTML = html;
        els.recapTotal.textContent = total + (total > 1 ? ' articles' : ' article');

        var imgs = els.recapLines.querySelectorAll('img');
        for (i = 0; i < imgs.length; i += 1) {
            setImageFallback(imgs[i]);
        }

        hideAllViews();
        els.viewRecap.hidden = false;
        setBackVisible(false);
        els.appSubtitle.textContent = 'Voici tes courses';
        state.currentView = 'recap';
        renderCartFooter();
    }

    function renderDone() {
        hideAllViews();
        els.viewDone.hidden = false;
        setBackVisible(false);
        els.appSubtitle.textContent = '';
        state.currentView = 'done';
        els.toast.classList.remove('is-visible');
        renderCartFooter();
    }

    function closeModals() {
        els.modalCart.hidden = true;
        els.modalConfirm.hidden = true;
        els.modalRecap.hidden = true;
        els.overlay.hidden = true;
    }

    function openCategory(categoryId) {
        state.selectedCategoryId = categoryId;
        state.categoryScrollPosition = 0;
        state.selectedProductId = null;
        renderCategory();
    }

    function openProduct(productId) {
        state.categoryScrollPosition = els.productGrid.scrollTop || 0;
        state.selectedProductId = productId;
        renderProduct();
    }

    function addToCart() {
        var productId;
        var qty;
        var line;
        var capped;

        if (state.addLocked) {
            return;
        }

        state.addLocked = true;
        els.btnAddToCart.disabled = true;

        productId = state.selectedProductId;
        qty = state.selectedQuantity;
        line = findCartLine(productId);
        capped = false;

        if (line) {
            if (line.quantity + qty > MAX_QTY) {
                line.quantity = MAX_QTY;
                capped = true;
            } else {
                line.quantity += qty;
            }
        } else {
            state.cart.push({
                productId: productId,
                quantity: qty > MAX_QTY ? MAX_QTY : qty
            });
            if (qty > MAX_QTY) {
                capped = true;
            }
        }

        if (capped) {
            showToast('Maximum atteint pour cet article');
        } else {
            showToast('Ajouté au panier !');
        }

        renderCategory();
    }

    function startNewGame() {
        state.cart = [];
        state.selectedCategoryId = null;
        state.selectedProductId = null;
        state.selectedQuantity = 1;
        state.categoryScrollPosition = 0;
        state.addLocked = false;
        state.scrollHintDismissed = false;
        closeModals();
        renderHome();
    }

    function onBack() {
        if (state.currentView === 'product') {
            renderCategory();
            return;
        }
        if (state.currentView === 'category') {
            state.selectedCategoryId = null;
            state.categoryScrollPosition = 0;
            renderHome();
        }
    }

    function bindEvents() {
        els.btnBack.addEventListener('click', onBack);

        els.categoryGrid.addEventListener('click', function (event) {
            var btn = event.target.closest('[data-category-id]');
            if (!btn) {
                return;
            }
            openCategory(btn.getAttribute('data-category-id'));
        });

        els.productGrid.addEventListener('click', function (event) {
            var btn = event.target.closest('[data-product-id]');
            if (!btn) {
                return;
            }
            openProduct(btn.getAttribute('data-product-id'));
        });

        els.productGrid.addEventListener('scroll', function () {
            state.categoryScrollPosition = els.productGrid.scrollTop;
            updateScrollHint();
        });

        els.btnQtyMinus.addEventListener('click', function () {
            if (state.selectedQuantity > MIN_QTY) {
                state.selectedQuantity -= 1;
                els.productQty.textContent = String(state.selectedQuantity);
                updateQtyButtons(els.btnQtyMinus, els.btnQtyPlus, state.selectedQuantity);
            }
        });

        els.btnQtyPlus.addEventListener('click', function () {
            if (state.selectedQuantity < MAX_QTY) {
                state.selectedQuantity += 1;
                els.productQty.textContent = String(state.selectedQuantity);
                updateQtyButtons(els.btnQtyMinus, els.btnQtyPlus, state.selectedQuantity);
            }
        });

        els.btnAddToCart.addEventListener('click', addToCart);

        els.cartBar.addEventListener('click', function (event) {
            if (event.target.closest('#btn-validate-cart')) {
                return;
            }
            if (event.target.closest('#cart-summary') || event.target.closest('#cart-total')) {
                if (state.currentView === 'done' || state.currentView === 'recap') {
                    return;
                }
                state.previousView = state.currentView;
                renderCartModal();
            }
        });

        els.btnValidateCart.addEventListener('click', function () {
            if (state.cart.length === 0) {
                return;
            }
            closeModals();
            renderRecap();
        });

        els.btnContinueShopping.addEventListener('click', function () {
            closeModals();
        });

        els.btnEmptyCart.addEventListener('click', function () {
            els.modalConfirm.hidden = false;
        });

        els.btnConfirmEmptyNo.addEventListener('click', function () {
            els.modalConfirm.hidden = true;
        });

        els.btnConfirmEmptyYes.addEventListener('click', function () {
            state.cart = [];
            closeModals();
            renderCartFooter();
            if (state.currentView === 'home') {
                renderHome();
            } else if (state.currentView === 'category') {
                renderCategory();
            } else if (state.currentView === 'product') {
                renderProduct();
            }
        });

        els.btnValidateFromCart.addEventListener('click', function () {
            if (state.cart.length === 0) {
                return;
            }
            closeModals();
            renderRecap();
        });

        els.cartLines.addEventListener('click', function (event) {
            var lineEl = event.target.closest('.cart-line');
            var productId;
            var line;

            if (!lineEl) {
                return;
            }

            productId = lineEl.getAttribute('data-product-id');
            line = findCartLine(productId);
            if (!line) {
                return;
            }

            if (event.target.closest('.btn-cart-minus')) {
                if (line.quantity > MIN_QTY) {
                    line.quantity -= 1;
                    renderCartModal();
                    renderCartFooter();
                }
                return;
            }

            if (event.target.closest('.btn-cart-plus')) {
                if (line.quantity < MAX_QTY) {
                    line.quantity += 1;
                    renderCartModal();
                    renderCartFooter();
                }
                return;
            }

            if (event.target.closest('.btn-remove')) {
                state.cart = state.cart.filter(function (item) {
                    return item.productId !== productId;
                });
                renderCartModal();
                renderCartFooter();
            }
        });

        els.btnRecapContinue.addEventListener('click', function () {
            if (state.selectedCategoryId) {
                renderCategory();
            } else {
                renderHome();
            }
        });

        els.btnFinish.addEventListener('click', function () {
            renderDone();
        });

        els.btnRestart.addEventListener('click', startNewGame);

        els.overlay.addEventListener('click', function () {
            if (!els.modalConfirm.hidden) {
                return;
            }
            closeModals();
        });

        window.addEventListener('resize', function () {
            if (state.currentView === 'category') {
                scheduleProductGridMeasure();
            }
        });
    }

    function cacheElements() {
        els.appSubtitle = byId('app-subtitle');
        els.btnBack = byId('btn-back');
        els.viewHome = byId('view-home');
        els.viewCategory = byId('view-category');
        els.viewProduct = byId('view-product');
        els.viewRecap = byId('view-recap');
        els.viewDone = byId('view-done');
        els.categoryGrid = byId('category-grid');
        els.productGrid = byId('product-grid');
        els.categoryTitle = byId('category-title');
        els.scrollHint = byId('scroll-hint');
        els.productName = byId('product-name');
        els.productImage = byId('product-image');
        els.productQty = byId('product-qty');
        els.btnQtyMinus = byId('btn-qty-minus');
        els.btnQtyPlus = byId('btn-qty-plus');
        els.btnAddToCart = byId('btn-add-to-cart');
        els.cartBar = byId('cart-bar');
        els.cartSummary = byId('cart-summary');
        els.cartTotal = byId('cart-total');
        els.btnValidateCart = byId('btn-validate-cart');
        els.overlay = byId('overlay');
        els.modalCart = byId('modal-cart');
        els.modalConfirm = byId('modal-confirm');
        els.modalRecap = byId('modal-recap');
        els.cartLines = byId('cart-lines');
        els.btnContinueShopping = byId('btn-continue-shopping');
        els.btnEmptyCart = byId('btn-empty-cart');
        els.btnValidateFromCart = byId('btn-validate-from-cart');
        els.btnConfirmEmptyNo = byId('btn-confirm-empty-no');
        els.btnConfirmEmptyYes = byId('btn-confirm-empty-yes');
        els.recapLines = byId('recap-lines');
        els.recapTotal = byId('recap-total');
        els.btnRecapContinue = byId('btn-recap-continue');
        els.btnFinish = byId('btn-finish');
        els.btnRestart = byId('btn-restart');
        els.toast = byId('toast');
    }

    function init() {
        if (!catalog || !catalog.categories || !catalog.products) {
            document.body.innerHTML = '<p>Catalogue introuvable.</p>';
            return;
        }
        cacheElements();
        bindEvents();
        renderHome();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
