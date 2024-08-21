import { cacheDuration } from './home.js';

export let selectedCoins = [];
let cache = [];

export function handleSwitchChange() {
    $('.coin-switch').off('change').on('change', function () {
        const coin = $(this).data('coin').toUpperCase();

        if (this.checked) {
            // Check if the limit of 5 coins is exceeded
            if (selectedCoins.length < 5) {
                selectedCoins.push(coin);
            } else {
                // Show the Bootstrap toast notification
                const toastElement = $('#coin-limit-toast');
                const toast = new bootstrap.Toast(toastElement);
                toast.show();

                // Uncheck the 6th coin
                this.checked = false;
            }
        } else {
            // Remove the coin if it's unselected
            selectedCoins = selectedCoins.filter(c => c !== coin);
        }

    });
}

function renderCoinInfo(data) {
    if (!data || !data.market_data || !data.image) {
        return '<p>Coin information is not available at the moment.</p>';
    }

    const usdPrice = formatCurrency(data.market_data.current_price.usd, 'USD', 'en-US');
    const eurPrice = formatCurrency(data.market_data.current_price.eur, 'EUR', 'en-EU');
    const ilsPrice = formatCurrency(data.market_data.current_price.ils, 'ILS', 'he-IL');

    return `
        <img src="${data.image.small}" class="coinLogo" alt="${data.name}">
        <p>USD: ${usdPrice}</p>
        <p>EUR: ${eurPrice}</p>
        <p>ILS: ${ilsPrice}</p>
    `;
}

export function handleMoreInfo(coinId) {
    const collapseId = `#collapse-${coinId}`;
    const infoId = `#info-${coinId}`;

    if (cache[coinId] && (new Date().getTime() - cache[coinId].timestamp < cacheDuration)) {
        $(infoId).html(renderCoinInfo(cache[coinId].data));
    } else {
        $(infoId).html('<div class="progress"><div class="progress-bar progress-bar-animated progress-bar-striped bg-danger"></div></div>');

        $.ajax({
            url: `https://api.coingecko.com/api/v3/coins/${coinId}`,
            success: function (data) {
                cache[coinId] = {
                    data: data,
                    timestamp: new Date().getTime()
                };
                $(infoId).html(renderCoinInfo(data));
            },
            error: function (xhr) {
                if (xhr.status === 429) {
                    $(infoId).html('<p>Rate limit exceeded. Please wait a moment and try again.</p>');
                } else {
                    $(infoId).html('<p>Error loading coin information. Please try again later.</p>');
                }
            }
        });
    }
    $(collapseId).collapse('toggle');
}

// Function to format currency
function formatCurrency(value, currency, locale) {
    return value.toLocaleString(locale, { style: 'currency', currency: currency });
}


export function showSelectedCoins() {
    const selectedCoinsList = $('#selected-coins-list');
    selectedCoinsList.empty();

    if (selectedCoins.length === 0) {
        selectedCoinsList.append('<li class="list-group-item">Select up to 5 coins to display here.</li>');
    } else {
        selectedCoins.forEach(coin => {
            selectedCoinsList.append(`<li class="list-group-item">${coin}</li>`);
        });
    }
}

export function createCoinCard(coin) {
    const isChecked = selectedCoins.includes(coin.symbol.toUpperCase()) ? 'checked' : '';
    return `
        <div class="col-md-2">
            <div class="card">
                <div class="card-body">
                    <div class="content">
                        <div class="d-flex justify-content-between align-items-center">
                            <h4 class="card-title">${coin.symbol.toUpperCase()}</h4>
                            <label class="switch">
                                <input type="checkbox" class="coin-switch" data-coin="${coin.symbol.toUpperCase()}" ${isChecked}>
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <p class="card-text">${coin.name}</p>
                        <button class="btn btn-info more-info" data-coin-id="${coin.id}">More Info</button>
                        <div class="collapse mt-2" id="collapse-${coin.id}">
                            <div class="card card-body" id="info-${coin.id}">
                                <!-- Additional info will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}