import { fetchData } from './services.js';
import { selectedCoins } from './util.js';

export function loadReports() { 
    if (selectedCoins.length === 0) {
        $('#main-content').html(`<div class="reports-page"><h2>Real-Time Reports</h2><p>No coins selected. Please select coins to display the report.</p><footer><h3>All rights reserved to ©ShaharMaoz ${new Date().getFullYear()}</h3></footer>`);
        return;
    }

    $('#main-content').html('<h2>Real-Time Reports</h2><div id="chartContainer" class="chartContainer"></div>' + `<br><br><footer><h3>All rights reserved to ©ShaharMaoz ${new Date().getFullYear()}</h3></footer>`);

    const dataPoints = {};
    selectedCoins.forEach(coin => {
        dataPoints[coin] = [];
    });

    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: { text: "Real-time Cryptocurrency Analysis" },
        axisX: {
            valueFormatString: "HH:mm:ss",
            title: "Time",
        },
        axisY: {
            title: "Price in USD",
            includeZero: false
        },
        legend: {
            verticalAlign: "top",
            horizontalAlign: "right",
            dockInsidePlotArea: true
        },
        toolTip: {
            shared: true
        },
        data: selectedCoins.map(coin => ({
            name: coin,
            showInLegend: true,
            legendMarkerType: "square",
            type: "area",
            color: getRandomColor(),
            markerSize: 0,
            dataPoints: dataPoints[coin]
        }))
    });

    function updateChart() {
        const apiMarkets = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${selectedCoins.join(",")}&tsyms=USD`;
        fetchData(apiMarkets, {}, function (data) {
            const time = new Date();
            selectedCoins.forEach(coin => {
                if (data[coin]) {
                    dataPoints[coin].push({ x: time, y: data[coin].USD });
                    if (dataPoints[coin].length > 50) dataPoints[coin].shift();
                }
            });
            chart.render();
        }, function () {
            console.error("API request failed.");
        });
    }

    updateChart();
    const intervalId = setInterval(updateChart, 2000);

    return function cleanup() {
        clearInterval(intervalId);
    };
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = (Math.random() * 0.5) + 0.5; // Keeps opacity between 0.5 and 1 for better visibility
    return `rgba(${r},${g},${b},${a})`;
}
