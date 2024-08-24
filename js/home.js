import { fetchData } from './services.js';
import { createCoinCard, handleMoreInfo, handleSwitchChange, selectedCoins } from './util.js';
export const cacheDuration = 2 * 60 * 1000;

export function loadHome() {
    const apiMarkets = 'https://api.coingecko.com/api/v3/coins/markets';
    const now = new Date().getTime();
    const cachedData = localStorage.getItem('coinsData');
    const cachedTime = localStorage.getItem('coinsDataTime');

    if (cachedData && cachedTime && now - cachedTime < cacheDuration) {
        const coins = JSON.parse(cachedData);
        displayCoins(coins);
    } else {
        fetchData(apiMarkets, {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
        }, function (data) {
            localStorage.setItem('coinsData', JSON.stringify(data));
            localStorage.setItem('coinsDataTime', now.toString());
            displayCoins(data);
        }, function (xhr) {
            if (xhr.status === 429) {
                $('#main-content').html('<p>Rate limit exceeded. Please try again later.</p>');
            } else {
                $('#main-content').html('<p>Error loading coins. Please try again later.</p>');
            }
        });
    }
}
export function searchCoins() {
    const query = $('#search-input').val().toLowerCase();
    const cachedData = JSON.parse(localStorage.getItem('coinsData'));

    if (!cachedData) {
        $('#main-content').html('<p>No data available for search. Please try again later.</p>');
        return;
    }

    const filteredCoins = cachedData.filter(coin =>
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
    );

    if (filteredCoins.length > 0) {
        displayCoins(filteredCoins);
    } else {
        $('#main-content').html('<p>No matching coins found for your search.</p>');
    }
}



export function displayCoins(coins) {
    const content = `
        <div class="home-page">
            <h2 class="text-center">Cryptocurrency List</h2>
            <div class="row">
                ${coins.map(coin => createCoinCard(coin)).join('')}
            </div><footer><h3>All rights reserved to ©ShaharMaoz ${new Date().getFullYear()}</h3></footer>
        </div>`;
    $('#main-content').html(content);

    handleSwitchChange();

    $('.more-info').click(function () {
        handleMoreInfo($(this).data('coin-id'));
    });
}

// Toast function
let toastDismissedManually = false;

function showToast(message) {
    if (toastDismissedManually) return;

    const toastElement = $('#coin-limit-toast');
    $('.toast-body').text(message);

    // Reset any previous manual dismissal
    toastDismissedManually = false;

    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 2000
    });

    // Handle what happens when the toast is hidden
    toastElement.on('hidden.bs.toast', function () {
        if (!toastDismissedManually) {
            toast.show(); // Show the toast again if it wasn't manually dismissed
        }
    });

    // Handle manual dismissal
    toastElement.on('click', '.btn-close', function () {
        toastDismissedManually = true;
        toastElement.toast('hide'); // Ensure the toast is fully hidden
    });

    toast.show();
}
