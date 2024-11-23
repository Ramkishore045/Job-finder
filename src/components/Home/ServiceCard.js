import React from 'react';
import './Home.css';

function ServiceCard({ image, title, description }) {
    return (
        <div className="service-card">
            <img src={image} alt={title} className="service-card-img" />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default ServiceCard;
