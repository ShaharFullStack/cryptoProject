
// Function to load the About Me section
export function loadAbout() {
    const aboutMeContent = `
    <div class="aboutImg">
    <div class="about-page">
    <h2>About Shahar Maoz</h2>
    <h6>Hi! I'm Shahar Maoz, a developer with a passion for merging technology and creativity. My expertise lies in frontend and backend development, where I create engaging and responsive applications using technologies like React, TypeScript, and JavaScript.</h6>
    <h6>Beyond coding, I’m also a husband, a father, a musician and music teacher, which has allowed me to take an artistic approach to problem-solving in my projects. My goal is to craft user-centric digital experiences that are both visually appealing and functionally robust.</h6>
    <h2>Why I Built Shahar's Cryptonite</h2>
    <h6><strong>Shahar's Cryptonite</strong> started as an educational project and became a drive to simplify cryptocurrency tracking and present complex data in a clear, accessible format. Whether you're a trader or a crypto hodler, this platform offers the tools you need to stay informed and make data-driven decisions.</h6>
    <h2>My Journey</h2>
    <h6>I’ve always been fascinated by the intersection of art and technology. My experience ranges from creating dynamic web apps to teaching and composing music. Combining these passions, I aim to bring innovation and creativity into every project I undertake.</h6>
    </div>
    </div>
    `;
    $('#main-content').html(
        aboutMeContent +
        `<footer><h3>All rights reserved to ©Shahar Maoz ${new Date().getFullYear()}</h3></footer>`
    );
}



// Function to load the About the Project section
export function loadAboutProject() {
    const aboutProjectContent = `
        <div class="project-page">
            <h2>About This Project</h2>
            <p>This website, <strong>Shahar's Cryptonite</strong>, was built with a focus on providing users with real-time cryptocurrency data in an intuitive and visually appealing way. The project showcases my skills in frontend development while incorporating creativity through custom visuals.</p>
            <h2>Technologies Used</h2>
            <ul>
                <li>HTML, JavaScript, and CSS</li>
                <li>Responsive Web Design with modern layouts</li>
                <li>Original Background Image Using MidJourney AI tool</li>
                <li>Original Background Video Using Runway AI tool</li>
            </ul>
            <h2>Want to See More?</h2>
            <p>If you're interested in exploring more of my work or collaborating on a project, check out my GitHub:</p>
            <a href="https://github.com/ShaharFullStack" target="_blank">Visit My GitHub Page</a>
        </div>
    `;
    $('#main-content').html(
        aboutProjectContent +
        `<footer><h3>All rights reserved to ©Shahar Maoz ${new Date().getFullYear()}</h3></footer>`
    );
}
