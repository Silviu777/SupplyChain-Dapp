import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LandingPage.css';
import icon1 from './img2.png';
import globalImage from './images/global.jpg';
import efficiency from './images/efficiency.png';
import transactions from './images/transactions2.png';
import innovation from './images/innovation1.png';
import cost from './images/cost2.png';

const LandingPage = () => {
    const servicesRef = useRef(null);

    const scrollToServices = () => {
        servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                toast.success('Blockchain wallet connected successfully!');
            } catch (error) {
                console.error('User rejected the connection request');
                toast.error('User rejected the connection request.');
            }
        } else {
            toast.error('MetaMask is not installed. Please install it to connect your crypto wallet.');
        }
    };

    return (
        <div className="landing-page">
            <ToastContainer />
            <nav className="navbar">
                <div className="logo">
                    <img src="/logo-transp.png" alt="ChainSync Logo" />
                    <span>ChainSync</span>
                </div>
                <div className="nav-links">
                    <Link to="/home">Home</Link>
                    <a href="#services" onClick={scrollToServices}>Services</a>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSepxQTmOX_FHKTyqHso6o_Ske-G3hmI_t69sD-9k2s5HZsQWw/viewform" target="_blank" rel="noopener noreferrer">Contact</a>
                    <a href="#" className="connect-wallet" onClick={connectWallet}>Connect Wallet</a>
                </div>
            </nav>
            <div className="hero">
                <div className="hero-content">
                    <h1>Decentralised Supply Chain Platform</h1>
                    <h3>Empowering Supply Chain Operations Through Decentralized Connectivity</h3>
                    <Link to="/home" className="get-started">Get Started</Link>
                </div>
                <div className="hero-image">
                    <img src={icon1} alt="Feature 1" />
                </div>
            </div>

            <div className="services" ref={servicesRef}>
                <h2>Our Services</h2>
                <div className="services-grid">
                    <div className="service-box">
                        <img src={globalImage} alt="Global" />
                        <h3>Global Accessibility</h3>
                        <p>Efficient and transparent partner connectivity beyond geographical boundaries</p>
                    </div>
                    <div className="service-box">
                        <img src={efficiency} alt="Efficiency" />
                        <h3>Efficiency Growth</h3>
                        <p>Improved operations for maximum performance</p>
                    </div>
                    <div className="service-box">
                        <img src={transactions} alt="Transactions" />
                        <h3>Much Safer Transactions</h3>
                        <p>Blockchain technology ensures transparency and reliability of operations</p>
                    </div>
                    <div className="service-box">
                        <img src={innovation} alt="Innovation" />
                        <h3>Innovation</h3>
                        <p>Leveraging the potential of cutting-edge technology</p>
                    </div>
                    <div className="service-box">
                        <img src={cost} alt="Cost" />
                        <h3>Cost Optimization</h3>
                        <p>Reducing operational costs by enabling savings and generating higher profits</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LandingPage;
