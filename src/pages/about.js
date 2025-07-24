import React from 'react';
import './about.css';

function About() {
    return (
        <div className="page-wrapper">
            <div className="about-page">
                <h1>About Us</h1>
                <p>Welcome to Cars Nest, your go-to platform for buying and selling cars.</p>
                <p>We connect car enthusiasts with their dream vehicles.</p>
                <p>Our mission is to provide a seamless and transparent car marketplace.</p>
                <p>Thank you for choosing Cars Nest!</p><br />

                <h2>What We Do</h2>
                <p>Aggregate Listings from top platforms like AutoTrader, Cars.com, and CarGurus.</p>
                <p>Compare Prices & Mileage at a glance to help you make informed decisions</p>
                <p>Provide a user-friendly interface for searching and filtering cars.</p>
                <p>Offer a secure platform for sellers to list their cars.</p><br />

                <h3>Our Vision</h3>
                <p>To become the most trusted car comparison and resale platform by making the car buying and selling experience faster, smarter, and smoother.</p><br />
            </div>
            <footer className="footer">
                📍Based in India. Follow us on Instagram @carsnest
            </footer>
        </div>
    );
}

export default About;
