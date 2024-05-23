const paymentPage = document.querySelector('#payment-page');
const paymentModal = document.querySelector('#payment-modal');
const paymentPanel = document.querySelector('#payment-panel');
const paymentStatus = document.querySelector('#payment-status');
const paymentState = document.querySelector('#payment-state');
const selectedProductHeader = document.querySelector('#selected-product-header');
const selectedProduct = document.querySelector('#selected-product');
const bundleContent = document.querySelector('#bundle-content');
const proceedButtonPanel = document.querySelector('#proceed-button-panel');
const proceedButton = document.querySelector('#proceed-button');
const coinsBundleGrid = document.querySelector('#coins-bundle-grid');

// BUNDLES
const bundles = document.querySelectorAll('.coins-bundle');
const selectedProductImg = document.getElementById('bundle-img');
const selectedProductInfo = document.getElementById('bundle-info');
const selectedProductPrice = document.getElementById('bundle-price');

// Shop Tabs
const storeTab = document.querySelector('#store-tab');
const payTab = document.querySelector('#pay-tab');
const completeTab = document.querySelector('#complete-tab');
const prevTab = document.querySelector('#prev-tab');

// Shop Parts
const shopPanel = document.querySelector('#shop-panel');
const shopPay = document.querySelector('#shop-pay');
const shopThanks = document.querySelector('#shop-thanks');
const otherPaymentMethods = document.querySelector('#other-payment-methods');

// Keys
const adminKeyField = document.querySelector('#admin-key');
const creditKeyField = document.querySelector('#credit-key');
let ADMIN_KEYS = ['Admin', 'Admin2', 'Admin3', 'Admin4', 'Admin5'];
let CREDIT_KEYS = ['Credit', 'Credit2', 'Credit3', 'Credit4', 'Credit5'];
let ADMIN_KEYS_MATCHED = false;
let CREDIT_KEYS_MATCHED = false;

function closeShop() {
    gameModeSelection.style.position = 'relative';
    paymentPage.style.display = 'none';
    resetShop();
}

function resetShop() {
    shopPanel.style.display = 'flex';
    coinsBundleGrid.style.display = 'grid';
    paymentPanel.style.flex = '0 0 30%';
    paymentPanel.style.marginRight = '1rem';
    shopPay.style.display = 'none';
    shopThanks.style.display = 'none';
    otherPaymentMethods.style.display = 'none';
    paymentState.style.display = 'block';
    paymentStatus.style.display = 'none';
    proceedButtonPanel.style.display = 'none';
}

function buyCoins() {
    gameModeSelection.style.position = 'absolute';
    paymentPage.style.display = 'flex';
    shopTab(storeTab);
}

document.addEventListener('DOMContentLoaded', function() {
    const bundles = document.querySelectorAll('.coins-bundle');
    const selectedProductImg = document.getElementById('bundle-img');
    const selectedProductInfo = document.getElementById('bundle-info');
    const selectedProductPrice = document.getElementById('bundle-price');

    bundles.forEach(bundle => {
        bundle.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const infoText = this.querySelector('.bundle-info').textContent;
            const priceText = this.querySelector('.bundle-price').textContent;

            selectedProductImg.src = imgSrc;
            selectedProductInfo.textContent = infoText;
            selectedProductPrice.textContent = priceText;

            paymentState.style.display = 'none';
            paymentStatus.style.display = 'flex';
            proceedButtonPanel.style.display = 'flex';
        });
    });
});

function shopTab(tab) {
    const allTabs = [storeTab, payTab, completeTab];
    allTabs.forEach(tab => tab.classList.remove('active-tab'));

    switch (tab) {
        case storeTab:
        case payTab:
        case completeTab:
            tab.classList.add('active-tab');
            tab === payTab ? prevTab.style.display = 'flex' : prevTab.style.display = 'none';
            break;
        default:
            throw new Error('Invalid tab: ' + tab);
    }
}

function previousShopTab() {
    resetShop();
    buyCoins();
}

function checkout() {
    setupPaymentPage();
}

function setupPaymentPage() {
    shopTab(payTab);
    shopPanel.style.display = 'none';
    paymentPanel.style.flex = '1';
    shopPay.style.display = 'flex';
    coinsBundleGrid.style.display = 'none';
    otherPaymentMethods.style.display = 'flex';
}

function thankYouPage() {
    shopTab(completeTab);
    shopPanel.style.display = 'none';
    shopThanks.style.display = 'flex';
    paymentPanel.style.flex = '1';
    paymentPanel.style.marginRight = '0';
    shopPay.style.display = 'none';
    coinsBundleGrid.style.display = 'none';
    otherPaymentMethods.style.display = 'none';
}

function confirmPurchase() {
    checkKeys();
    if (ADMIN_KEYS_MATCHED && CREDIT_KEYS_MATCHED) {
        let coinAmountText = selectedProductInfo.textContent;
        let coinAmount = parseInt(coinAmountText.replace(/[^0-9]/g, ''), 10);
        shopTab(completeTab);
        modifyCoins(coinAmount);
        saveCoins(USER_COINS);
        thankYouPage();
    }
}

function checkKeys() {
    try {
        let adminKey = adminKeyField.value.toLowerCase();
        let creditKey = creditKeyField.value.toLowerCase();
        ADMIN_KEYS_MATCHED = ADMIN_KEYS.map(key => key.toLowerCase()).includes(adminKey);
        CREDIT_KEYS_MATCHED = CREDIT_KEYS.map(key => key.toLowerCase()).includes(creditKey);
    }
    catch (e) {
        console.error('Keys check failed:', e.message);
        throw new Error('Keys check failed');
    }
}