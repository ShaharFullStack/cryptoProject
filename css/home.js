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
    const query = $('#search-input').val().toLowerCase(); // Get the user's input and convert it to lowercase
    const cachedData = JSON.parse(localStorage.getItem('coinsData')); // Retrieve the coin data from local storage

    if (!cachedData) {
        $('#main-content').html('<p>No data available for search. Please try again later.</p>');
        return;
    }

    const filteredCoins = cachedData.filter(coin => 
        coin.name.toLowerCase().includes(query) || 
        coin.symbol.toLowerCase().includes(query)
    );

    if (filteredCoins.length > 0) {
        displayCoins(filteredCoins); // Display the filtered coins from local storage
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

    // Attach event listeners after dynamic content is loaded
    handleSwitchChange(); // Attach event listeners for coin switches

    $('.more-info').click(function () {
        handleMoreInfo($(this).data('coin-id')); // Handle the More Info button clicks
    });
}
