import React from 'react';
import './Home.css';
import ServiceCard from './ServiceCard';

function Home() {
    return (
        <div className="container">
            <div className="container-fluid">
                <div className="about-container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h6 className="section-title">About Us</h6>
                            <h1>
                                <span>Welcome to </span>
                                <span className="text-primary">Ahimay Technology Solutions</span>
                            </h1>
                            <p>
                                <b>Ahimay Technology Solutions</b> is founded by very experienced industry
                                professionals with the mission of providing value-based solutions to its clients
                                in the areas of Application Development, Quality Engineering, and Professional Services.
                            </p>
                            <h3>Our Vision:</h3>
                            <span>
                                Vision is to build a strong team that delivers projects with quality and dedication.
                            </span>
                            <ul>
                                <li>
                                    <p><b>Our Mission</b></p>
                                    <p>
                                        Our mission statement enforces that our two important key stakeholders are
                                        customers and our people.
                                    </p>
                                </li>
                                <li>
                                    <p><b>Our Values and Culture</b></p>
                                    <p>
                                        What brings our employees together in building an organization that has a
                                        unique culture is our value system. Every employee is driven by dedication,
                                        commitment, and social responsibility.
                                    </p>
                                </li>
                                <li>
                                    <p><b>Our Success</b></p>
                                    <p>
                                        We are recognized by our clients as the best start-up company in the industry.
                                        Our success and growth have been powered by our consultative approach, our
                                        deep understanding of business and technology, and our passion for innovation.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="services">
                <h2>
                    Explore Our <span>SERVICES</span>
                </h2>
                <div className="parent-card">
                    <div className="service-card">
                        <img src="https://ahimay.com/images/software-services-img1.png" alt="Software Services" />
                        <h3>Software Services</h3>
                        <p>Ahimay Technology Solutions can be...</p>
                    </div>
                    <div className="service-card">
                        <img src="https://ahimay.com/images/busenss-consult-img2.png" alt="Business & Technology Consulting" />
                        <h3>Business & Technology Consulting</h3>
                        <p>Ahnay Technology Solutions offers...</p>
                    </div>
                    <div className="service-card">
                        <img src="https://ahimay.com/images/professionalserv-img6.png" alt="Professional Services" />
                        <h3>Professional Services</h3>
                        <p>Ahnay Technology Solutions provides...</p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;
