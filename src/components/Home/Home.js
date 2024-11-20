import React from 'react'
import "./Home.css"

function Home() {
  return (
    <div className="container">
    <div className="section">
        <h2 className="subtitle">ABOUT US</h2>
        <h1 className="title">Welcome to AHIMAY TECHNOLOGY SOLUTIONS</h1>
        <p>
            Ahimay Technology Solutions is founded by very experienced industry professionals with the mission of providing value based solutions to its clients in the areas of Application Development, Quality Engineering and Professional Services.
        </p>
        <h2>Our Vision:</h2>
        <p>Vision is to build a strong team which delivers the projects with quality and dedication.</p>
        <h2>Our Mission</h2>
        <p>Our mission statement enforces that our two important key stakeholders are customers and our people.</p>
        <h2>Our Values and Culture</h2>
        <p>What brings our employees together in building an organization that has a unique culture is our value system. Every employee is driven by dedication, commitment and social responsibility.</p>
    </div>

    <div className="services">
             <h2 className='section-title'>our services</h2>
            <h2>Explore Our <span>SERVICES</span></h2>
            <div className="parent-card">
                <div className="service-card">
                    <img src="https://ahimay.com/images/software-services-img1.png" alt="Software Services" />
                    <h3>Software Services</h3>
                    <p>Ahimay Technology Solutions can be...</p>
                    <p>Extra dummy text for scrolling...</p>
                    <p>Extra dummy text for scrolling...</p>
                    <p>Extra dummy text for scrolling...</p>
                    <p>Extra dummy text for scrolling...</p>
                    <p>Extra dummy text for scrolling...</p>
                    <p>Extra dummy text for scrolling...</p>
                </div>
                <div className="service-card">
                    <img src="https://ahimay.com/images/busenss-consult-img2.png" alt="Business & Technology Consulting" />
                    <h3>Business & Technology Consulting</h3>
                    <p>Ahnay Technology Solutions offers...</p>
                    <p>Extra dummy text for scrolling...</p>
                    <p>Extra dummy text for scrolling...</p>
                    <p>Extra dummy text for scrolling...</p>
                    <p>Extra dummy text for scrolling...</p>
                    <p>Extra dummy text for scrolling...</p>
                    <p>Extra dummy text for scrolling...</p>
                </div>
                <div className="service-card">
                    <img src="https://ahimay.com/images/professionalserv-img6.png" alt="Professional Services" />
                    <h3>Professional Services</h3>
                    <p>Ahnay Technology Solutions provides...</p>
                    <p>Extra dummy text for scrolling...</p>
                    <p>Extra dummy text for scrolling...</p>
                    <p>Extra dummy text for scrolling...</p>
                    <p>Extra dummy text for scrolling...</p>
                    <p>Extra dummy text for scrolling...</p>
                    <p>Extra dummy text for scrolling...</p>
                </div>
            </div>
        </div>
        
</div>
  )
}

export default Home