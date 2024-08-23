import { loadHome, searchCoins, displayCoins } from './home.js';
import { loadReports } from './reports.js';
import { loadAbout, loadAboutProject } from './pages.js';
import { showSelectedCoins } from './util.js';
const clear = " ";
// Main function to initialize event listeners
$(document).ready(function () {
    loadHome();

    // Event listeners for navigation
    $('#home').click(() => loadHome());
    $('#reports').click(() => loadReports());
    $('#about').click(() => loadAbout());
    $('#about-project').click(() => loadAboutProject());
    $('#show-selected-coins').click(() => showSelectedCoins());
    // Event listener for the search button click
    $('#clear-button').click(function (event) {
        $('#search-input').val('');
        loadHome();
    });

    // Event listener for pressing "Enter" while focused on the search input field
    $('#search-input').on('input', function () {
        searchCoins(); // Calls the search function
    }
    );
    // Change coins colors on chart
    $('#changeColor').click(function () {
        changeChartColors(chart);
    });
});
