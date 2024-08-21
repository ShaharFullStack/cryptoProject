
    // Function to load the About section
    export function loadAbout() {
        const aboutContent = `
            <div class="about-page">
                <h2>About Cryptonite</h2>
                <p>Cryptonite is your go-to application for cryptocurrency information.</p> 
                <p>Our platform provides real-time data on various cryptocurrencies, including their prices, history, and more.</p> 
                <p>Whether you're a seasoned trader or just getting started, Cryptonite offers the tools you need to make informed decisions in the world of virtual trading.</p>
                <p>Our mission is to make cryptocurrency trading accessible and understandable for everyone.</p>
            </div>
        `;
        $('#main-content').html(aboutContent + `<footer><h3>All rights reserved to ©ShaharMaoz ${new Date().getFullYear()}</h3></footer>`);
    }

    // Function to load the About Project section
    export function loadAboutProject() {
        const aboutProjectContent = `
            <div class="project-page">
                <h2>About This Site</h2>
                <p id="special">This website was created by Shahar Maoz</p> 
                <ul id="special">and includes:</ul>
                <li id="special">HTML, JavaScript, and CSS code</li>
                <li id="special">Website Design</li>
                <li id="special">Original Background Image Using AI Tools</li>
                <li id="special">Original Background Video Using AI Tools</li>
                <p id="special">For more awesome projects and amazing designs</p>
                <a href="https://github.com/ShaharFullStack">Visit My GitHub Page</a>
            </div>
        `;
        $('#main-content').html(aboutProjectContent + `<footer><h3>All rights reserved to ©ShaharMaoz ${new Date().getFullYear()}</h3></footer>`);
    }