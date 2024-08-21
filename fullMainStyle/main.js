$(document).ready(function () {
    const cache = {};
    const cacheDuration = 2 * 60 * 1000; // Cache for 2 minutes
    const selectedCoins = [];
    let currentCleanup = null;
    const year = new Date().getFullYear();

    // Load the initial content (Home page)
    loadHome();

    // Event listeners for navigation
    $('#home, #about').click(function () {
        cleanupCurrentTask();
        setActiveNavItem(this);
        $(this).attr('id') === 'home' ? loadHome() : loadAbout();
    });

    $('#about-project').click(function () {
        cleanupCurrentTask();
        setActiveNavItem(this);
        currentCleanup = loadAboutProject();
    });

    $('#reports').click(function () {
        cleanupCurrentTask();
        setActiveNavItem(this);
        currentCleanup = loadReports();
    });

    $('#search-button').click(function (event) {
        event.preventDefault();
        searchCoins();
    });

    $('#show-selected-coins').click(function () {
        cleanupCurrentTask();
        setActiveNavItem(this);
        currentCleanup = showSelectedCoins();
    });

    // Bind the showSelectedCoins function to the modal's show event
    $('#selectedCoinsModal').on('show.bs.modal', function () {
        cleanupCurrentTask();
        showSelectedCoins();
    });

    // Function to clean up current task
    function cleanupCurrentTask() {
        if (currentCleanup) currentCleanup();
        currentCleanup = null;
    }

    // Function to set the active navigation item
    function setActiveNavItem(navItem) {
        $('.nav-link').removeClass('active');
        $(navItem).addClass('active');
    }

    // Function to load the Home page
    function loadHome() {
        loadCoins();
    }

    // Function to load coins from CoinGecko API with caching
    function loadCoins() {
        const now = new Date().getTime();
        const cachedData = localStorage.getItem('coinsData');
        const cachedTime = localStorage.getItem('coinsDataTime');

        if (cachedData && cachedTime && now - cachedTime < cacheDuration) {
            const coins = JSON.parse(cachedData);
            displayCoins(coins);
        } else {
            $.ajax({
                url: 'https://api.coingecko.com/api/v3/coins/markets',
                method: 'GET',
                data: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 100,
                },
                success: function (data) {
                    localStorage.setItem('coinsData', JSON.stringify(data));
                    localStorage.setItem('coinsDataTime', now.toString());
                    displayCoins(data);
                },
                error: function (xhr, status, error) {
                    if (xhr.status === 429) {
                        $('#main-content').html('<p>Rate limit exceeded. Please try again later.</p>');
                    } else {
                        $('#main-content').html('<p id="special">Error loading coins. Please try again later.</p>');
                    }
                }
            });
        }
    }

    // Function to display coins on the Home page
    function displayCoins(coins) {
        const content = `
            <div class="home-page">
                <h2 class="text-center">Cryptocurrency Market Cap</h2>
                <div class="row">
                    ${coins.map(coin => createCoinCard(coin)).join('')}
                </div>
            </div>
            <footer><h3>All rights reserved to ©ShaharMaoz ${year}</h3></footer>
        `;
        $('#main-content').html(content);

        // Event delegation for dynamically created switches
        $('#main-content').on('change', '.coin-switch', function () {
            const coin = $(this).data('coin').toUpperCase();
            console.log('Coin:', coin); // Check what value is being used
        
            if (this.checked) {
                if (selectedCoins.length < 5) {
                    if (!selectedCoins.includes(coin)) {
                        selectedCoins.push(coin);
                    }
                } else {
                    this.checked = false;
                    alert('You can select up to 5 coins only.');
                }
            } else {
                selectedCoins = selectedCoins.filter(c => c !== coin);
            }
        
            console.log('Selected Coins:', selectedCoins); // Verify that the list updates correctly
        });
        

    // Function to create a coin card
    function createCoinCard(coin) {
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
            </div>
        `;
    }

    // Function to handle "More Info" button click
    function handleMoreInfo(coinId) {
        const collapseId = `#collapse-${coinId}`;
        const infoId = `#info-${coinId}`;

        if (cache[coinId] && (new Date().getTime() - cache[coinId].timestamp < cacheDuration)) {
            $(infoId).html(renderCoinInfo(cache[coinId].data));
        } else {
            $(infoId).html('<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated"></div></div>');

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

    // Function to render coin information
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

    // Function to format currency
    function formatCurrency(value, currency, locale) {
        return value.toLocaleString(locale, { style: 'currency', currency: currency });
    }

    // Function to show selected coins in the modal
    function showSelectedCoins() {
        const selectedCoinsList = $('#selected-coins-list');
        selectedCoinsList.empty();

        if (selectedCoins.length === 0) {
            selectedCoinsList.append('<li class="list-group-item">No coins selected. Please select coins to display here.</li>');
        } else {
            selectedCoins.forEach(coin => {
                selectedCoinsList.append(`<li class="list-group-item">${coin}</li>`);
            });
        }
    }

    // Function to load the About Project section
    function loadAboutProject() {
        const aboutProjectContent = `
            <div class="project-page">
                <h2>About This Site</h2>
                <p id="special">This website was created by Shahar Maoz</p> 
                <ul id="special">and includes: </ul>
                <li id="special">HTML code</li>
                <li id="special">JavaScript code</li>
                <li id="special">CSS code</li>
                <li id="special">Website Design</li>
                <li id="special">Original Background Image Using AI Tools</li>
                <li id="special">Original Background Video Using AI Tools</li>
                <p id="special">For more awesome projects and amazing designs</p>
                <a href="https://github.com/ShaharFullStack">Visit My GitHub Page</a>
            </div>
        `;
        $('#main-content').html(aboutProjectContent + `<footer><h3>All rights reserved to ©ShaharMaoz ${year}</h3></footer>`);
    }

    // Function to load the About section
    function loadAbout() {
        const aboutContent = `
            <div class="about-page">
                <h2>About Cryptonite</h2>
                <p>Cryptonite is your go-to application for cryptocurrency information.</p> 
                <p>Our platform provides real-time data on various cryptocurrencies, including their prices, history, and more.</p> 
                <p>Whether you're a seasoned trader or just getting started, Cryptonite offers the tools you need to make informed decisions in the world of virtual trading.</p>
                <p>Our mission is to make cryptocurrency trading accessible and understandable for everyone. We believe in the power of blockchain technology and are committed to providing accurate and up-to-date information to our users.</p>
            </div>
        `;
        $('#main-content').html(aboutContent + `<footer><h3>All rights reserved to ©ShaharMaoz ${year}</h3></footer>`);
    }

    // Function to load the Live Reports section
    function loadReports() {
        if (selectedCoins.length === 0) {
            $('#main-content').html('<div class="reports-page"><h2>Real-Time Reports</h2><p id="special">No coins selected. Please select coins to display the report.</p>');
            return;
        }

        $('#main-content').html('<h2>Real-Time Reports</h2><div id="chartContainer" class="chartContainer"></div>' + `<br><br><footer><h3>All rights reserved to ©ShaharMaoz ${year}</h3></footer>`);

        const dataPoints = {};
        selectedCoins.forEach(coin => {
            dataPoints[coin] = [];
        });

        const chart = new CanvasJS.Chart("chartContainer", {
            title: { text: "Real-time Selected Coins Chart" },
            axisX: { title: "Time", valueFormatString: "HH:mm:ss" },
            axisY: { title: "Price in USD", includeZero: false },
            legend: { verticalAlign: "top" },
            data: selectedCoins.map(coin => ({
                type: "line",
                name: coin,
                showInLegend: true,
                dataPoints: dataPoints[coin]
            }))
        });

        function updateChart() {
            const apiURL = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${selectedCoins.join(",")}&tsyms=USD`;
            $.getJSON(apiURL, function (data) {
                const time = new Date();
                selectedCoins.forEach(coin => {
                    if (data[coin]) {
                        dataPoints[coin].push({ x: time, y: data[coin].USD });
                        if (dataPoints[coin].length > 50) dataPoints[coin].shift();
                    }
                });
                chart.render();
            }).fail(function () {
                console.error("API request failed.");
            });
        }

        updateChart();
        const intervalId = setInterval(updateChart, 2000);

        return function cleanup() {
            clearInterval(intervalId);
        };
    }

    // Function to search coins
    function searchCoins() {
        const query = $('#search-input').val().toLowerCase();
        $.ajax({
            url: 'https://api.coingecko.com/api/v3/coins/list',
            method: 'GET',
            success: function (data) {
                const filteredCoins = data.filter(coin =>
                    coin.name.toLowerCase().includes(query) ||
                    coin.symbol.toLowerCase().includes(query)
                );
                displayCoins(filteredCoins);
            },
            error: function () {
                $('#main-content').html('<p>Error searching coins. Please try again later.</p>');
            }
        });
    }
}})
