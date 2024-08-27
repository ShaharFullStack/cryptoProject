<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cryptonite</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="./css/general.css">
    <link rel="stylesheet" href="./css/home.css">
    <link rel="stylesheet" href="./css/navbar.css">
    <link rel="stylesheet" href="./css/btnAndSwitch.css">
    <link rel="stylesheet" href="./css/modal.css">
    <link rel="stylesheet" href="./css/pages.css">
    <link rel="stylesheet" href="./css/video.css">
    <!-- SweetAlert2 CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
<!-- SweetAlert2 JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- SweetAlert2 CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

    <!-- SweetAlert2 JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Favicon -->
    <link rel="shortcut icon" href="./assets/favicon/favicon.ico" type="image/x-icon">

    <!-- jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <!-- Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- CanvasJS -->
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
    <!-- Custom JS -->
    <script src="./js/main.js" type="module"></script>
    <script src="./js/home.js" type="module"></script>
    <script src="./js/util.js" type="module"></script>
    <script src="./js/services.js" type="module"></script>
    <script src="./js/pages.js" type="module"></script>
    <script src="./js/reports.js" type="module"></script>
</head>

<body>
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Shahar's Cryptonite</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#" id="home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="reports">Real-Time Reports</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="about">About Shahar</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="about-project">Project Info</a>
                    </li>
                </ul>
                <button class="btn btn-coinList" data-bs-toggle="modal" data-bs-target="#selectedCoinsModal"
                    id="show-selected-coins">
                    Show Selected Coins
                </button>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search Coin..." aria-label="Search"
                        id="search-input">
                    <button class="btn btn-outline-success" type="clear" id="clear-button">Clear</button>
                </form>
            </div>
        </div>
    </nav>

    <!-- Parallax Scroller -->
    <div class="parallaxScrolling">
        <marquee direction="left" scrollamount="30">
            <h1>Shahar's Crypto Project</h1>
        </marquee>
    </div>

    <!-- Modal for Selected Coins -->
    <div class="modal fade" id="selectedCoinsModal" tabindex="-1" aria-labelledby="selectedCoinsModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="selectedCoinsModalLabel">Selected Coins</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ul id="selected-coins-list" class="list-group">
                        <!-- List of selected coins will be added here -->
                    </ul>
                </div>
                <div class="modal-footer">
                    <button data-bs-dismiss="modal" type="button" class="btn btn-coinList"
                        id="confirm-selection">OK</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Video Background Container -->
    <div class="video-background">
        <video autoplay muted loop id="bg-video">
            <source src="./assets/vid/bitcoinRain.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>

        <!-- Toast Notification -->
        <div id="coin-limit-toast" class="toast position-fixed top-50 start-50 translate-middle" role="alert"
            aria-live="assertive" data-bs-autohide="true" data-bs-delay="2000">
            <div class="alert alert-danger alert-dismissible fade show text-center custom-toast" role="alert">
                <strong>🛑 Error:</strong> You can select up to 5 coins for Live Reports.
            </div>
        </div>

        <!-- Main Content Container -->
        <div class="container mt-3">
            <div id="main-content"></div>
        </div>
    </div>

</body>


</html>
