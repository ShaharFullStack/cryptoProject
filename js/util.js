import { cacheDuration } from './home.js';

export let selectedCoins = [];
export let cache = [];

// Handle switch changes (selecting coins)
export function handleSwitchChange() {
    $('.coin-switch').off('change').on('change', function () {
        const coin = $(this).data('coin').toUpperCase();

        if (this.checked) {
            // Check if the limit of 5 coins is exceeded
            if (selectedCoins.length < 5) {
                selectedCoins.push(coin);

            } else {
                // Temporarily select the sixth coin
                this.checked;
                
                // Show SweetAlert2 dialog
                Swal.fire({
                    title: 'You can only select 5 coins',
                    text: 'Please remove a coin before selecting another.',
                    icon: 'error',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    confirmButtonText: 'Remove a coin',
                }).then((coinRemoved) => {
                    if (coinRemoved.isConfirmed) {
                        showCoinDeselectOptions(coin);
                    } else {
                        // Deselect the sixth coin if the user cancels
                        const lastchecked =this.checked = false;
                    }
                });
            }
        } else {
            // Remove the coin if it's unselected
            selectedCoins = selectedCoins.filter(c => c !== coin);
        }
    });
}

// Function to show options for deselecting a coin
export function showCoinDeselectOptions(newCoin) {
    const options = selectedCoins.map(coin => `<li class="list-group-item selectable-coin">${coin}</li>`).join('');

    Swal.fire({
        title: 'Choose a coin to remove',
        html: `<ul class="list-group">${options}</ul>`,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            // Add click event listeners to the list items
            $('.selectable-coin').on('click', function () {
                const coinToRemove = $(this).text();
                if(!coinToRemove) {
                    $(`.coin-switch[data-coin="${selectedCoins.slice(0, -1)}]`);
                }
                // Remove the selected coin
                selectedCoins = selectedCoins.filter(c => c !== coinToRemove);
                // Add the new coin
                selectedCoins.push(newCoin);
                // Update the checkbox states
                $(`.coin-switch[data-coin="${coinToRemove}"]`).prop('checked', false);
                Swal.close();
            });

        }
    });
}

// Render coin information
function renderCoinInfo(data) {
    if (!data || !data.market_data || !data.image) {
        return '<p>Coin information is not available at the moment.</p>';
    }
    const usdPrice = formatCurrency(data.market_data.current_price.usd, 'USD', 'en-US');
    const eurPrice = formatCurrency(data.market_data.current_price.eur, 'EUR', 'en-EU');
    const ilsPrice = formatCurrency(data.market_data.current_price.ils, 'ILS', 'he-IL');

    return `
        <p>USD: ${usdPrice}</p>
        <p>EUR: ${eurPrice}</p>
        <p>ILS: ${ilsPrice}</p>
    `;
}

// Display the coins
export function displayCoins(coins) {
    const coinsListHtml = coins.map(coin => createCoinCard(coin)).join('');
    $('#filtered-coins-list').html(coinsListHtml);

    handleSwitchChange();
    $('.more-info').click(function () {
        handleMoreInfo($(this).data('coin-id'));
    });
}

// Show toast notifications
export function showToast(message) {    
    const toastElement = $('#coin-limit-toast');
    $('.toast-body').text(message);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

// Handle "More Info" button clicks
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

// Show selected coins in the modal
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

// Create and display a coin card
export function createCoinCard(coin) {
    const isChecked = selectedCoins.includes(coin.symbol.toUpperCase()) ? 'checked' : '';
    return `
        <div class="col-md-2">
            <div class="card">
                <div class="card-body">
                    <div class="content">
                        <div class="d-flex justify-content-between align-items-center">
                            <img class="card-img" src="${coin.image}" alt="${coin.symbol.toUpperCase()}">
                            <h4 class="card-title">${coin.symbol.toUpperCase()}</h4>
                            <label class="checkbox switch">
                                <input type="checkbox" class="coin-checkBox coin-switch" data-coin="${coin.symbol.toUpperCase()}" ${isChecked}>
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <p class="card-text">${coin.name}</p>
                        <div class="collapse mt-2" id="collapse-${coin.id}">
                            <div class="card card-body" id="info-${coin.id}">
                            <!-- Additional info will be loaded here -->
                            </div>
                        </div><br>
                        <button class="btn btn-info more-info" data-coin-id="${coin.id}">More Info</button>
                    </div>
                </div>
            </div>
        </div>`;
}
