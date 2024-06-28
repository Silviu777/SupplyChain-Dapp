import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LandingPage.css';
import icon1 from './img2.png';

const LandingPage = () => {
    const servicesRef = useRef(null);

    const scrollToServices = () => {
        servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                toast.success('Wallet connected successfully!');
            } catch (error) {
                console.error('User rejected the connection request');
                toast.error('User rejected the connection request.');
            }
        } else {
            toast.error('MetaMask is not installed. Please install it to use this feature.');
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
                    <a href="https://forms.gle/YOUR_GOOGLE_FORM_ID" target="_blank" rel="noopener noreferrer">Contact</a>
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
                        <img src="/icons/icon1.png" alt="Bitcoin Transaction" />
                        <h3>Bitcoin Transaction</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                    </div>
                    <div className="service-box">
                        <img src="/icons/icon2.png" alt="Instant Exchange" />
                        <h3>Instant Exchange</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                    </div>
                    <div className="service-box">
                        <img src="/icons/icon3.png" alt="Investment Banking" />
                        <h3>Investment Banking</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                    </div>
                    <div className="service-box">
                        <img src="/icons/icon4.png" alt="Safe Browsing" />
                        <h3>Safe Browsing</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                    </div>
                    <div className="service-box">
                        <img src="/icons/icon5.png" alt="Easy Wallet" />
                        <h3>Easy Wallet</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                    </div>
                    <div className="service-box">
                        <img src="/icons/icon6.png" alt="Reliable & Low Cost" />
                        <h3>Reliable & Low Cost</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
