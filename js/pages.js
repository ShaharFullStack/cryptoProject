
// Function to load the About section
export function loadAbout() {
    const aboutContent = `
        <div class="about-page">
            <h2>About Shahar's Cryptonite</h2>
            <p><strong>Shahar's Cryptonite</strong> is a comprehensive platform designed to provide real-time insights and updates on cryptocurrency trends and data. Whether you're a casual observer, a trader, or a crypto enthusiast, this website is built to deliver reliable and up-to-date information on the digital currency market.</p>
            <h2>Key Features</h2>
            <ul>
                <li><strong>Real-Time Reports:</strong> Track the live performance of your selected cryptocurrencies with our dynamic charts that update in real-time. Monitor price fluctuations, identify trends, and make informed decisions with the most accurate data at your fingertips.</li>
                <li><strong>Customizable Dashboard:</strong> Select up to five cryptocurrencies of your choice to create a personalized report that suits your interests and needs. Tailor the display to focus on the data that matters most to you.</li>
                <li><strong>Interactive Visuals:</strong> Our platform offers engaging and responsive visualizations that allow users to see trends and data points in a clear and accessible format. You can even change the color scheme of the charts to match your preferences.</li>
                <li><strong>Comprehensive Data:</strong> From market prices in multiple currencies to detailed information on each cryptocurrency, our site is designed to be your go-to resource for understanding the crypto landscape.</li>
            </ul>
            <h2>Mission</h2>
            <p>Our goal is to simplify cryptocurrency tracking and make the vast amount of data accessible and visually appealing. We aim to create a platform where users of all levels can find value, whether you’re new to crypto or an experienced trader.</p>
        </div>
    `;
    $('#main-content').html(aboutContent + `<footer><h3>All rights reserved to ©ShaharMaoz ${new Date().getFullYear()}</h3></footer>`);
}


    // Function to load the About Project section
    export function loadAboutProject() {
        const aboutProjectContent = `
            <div class="project-page">
                <h2>About This Site</h2>
                <p>This website was created by Shahar Maoz</p> 
                <ul>and includes:</ul>
                <li>HTML, JavaScript, and CSS code</li>
                <li>Website Design</li>
                <li>Original Background Image Using AI Tools</li>
                <li>Original Background Video Using AI Tools</li>
                <ul>For more awesome projects and amazing designs</ul>
                <a href="https://github.com/ShaharFullStack">Visit My GitHub Page</a>
            </div>
        `;
        $('#main-content').html(aboutProjectContent + `<footer><h3>All rights reserved to ©ShaharMaoz ${new Date().getFullYear()}</h3></footer>`);
    }