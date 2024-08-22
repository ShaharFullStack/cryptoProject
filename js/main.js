import { loadHome } from './home.js';
import { loadReports } from './reports.js';
import { loadAbout, loadAboutProject } from './pages.js';
import { showSelectedCoins, searchCoins } from './util.js';

// Main function to initialize event listeners
$(document).ready(function () {
    loadHome();

    // Event listeners for navigation
    $('#home').click(() => loadHome());
    $('#reports').click(() => loadReports());
    $('#about').click(() => loadAbout());
    $('#about-project').click(() => loadAboutProject());
    $('#search-button').click((e) => {
        e.preventDefault();
        searchCoins();
    });

    $('#show-selected-coins').click(() => showSelectedCoins());
});
