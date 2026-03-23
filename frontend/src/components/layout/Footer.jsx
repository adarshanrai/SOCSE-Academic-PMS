import { Link } from "react-router-dom";
import React from 'react';
import styled from 'styled-components';

// Social Media Icons Component
const SocialIcons = () => {
  return (
    <StyledWrapper>
      <ul className="wrapper">
        <li className="icon facebook">
          <span className="tooltip">Facebook</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1.2em" viewBox="0 0 320 512">
            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
          </svg>
        </li>
        <li className="icon twitter">
          <span className="tooltip">X (Twitter)</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="1.2em">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </li>
        <li className="icon instagram">
          <span className="tooltip">Instagram</span>
          <svg viewBox="0 0 16 16" className="bi bi-instagram" fill="currentColor" height="1.2em" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
          </svg>
        </li>
        <li className="icon linkedin">
          <span className="tooltip">LinkedIn</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="1.2em">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
          </svg>
        </li>
        <li className="icon youtube">
          <span className="tooltip">YouTube</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="1.2em">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </li>
      </ul>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .wrapper {
    display: inline-flex;
    list-style: none;
    height: 120px;
    width: 100%;
    padding-top: 0;
    font-family: "Poppins", sans-serif;
    justify-content: center;
    margin: 0;
  }

  .wrapper .icon {
    position: relative;
    background: #fff;
    z-index: 0;
    border-radius: 50%;
    margin: 10px;
    width: 50px;
    height: 50px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .icon::after {
    content: "";
    position: absolute;
    display: inline-block;
    height: 100%;
    width: 100%;
    background-color: transparent;
    z-index: -1;
    border-radius: 50%;
    top: 100%;
  }
  
  .wrapper .icon:hover:after {
    animation: bg-pos 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1 both;
    animation-timing-function: ease-in-out;
  }

  .wrapper .icon:hover {
    color: #fff;
    overflow: unset;
    transition: color 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    animation: overflow-toggle 0.7s;
  }

  .wrapper .tooltip {
    position: absolute;
    top: 0;
    font-size: 14px;
    background: #fff;
    color: #fff;
    padding: 5px 8px;
    border-radius: 5px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .tooltip::before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    background: #fff;
    bottom: -3px;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    transition: all 0.3s 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .icon:hover .tooltip {
    top: -45px;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .wrapper .icon:hover span,
  .wrapper .icon:hover .tooltip {
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
  }
  
  .wrapper .facebook::after {
    background-color: #1877f2;
  }
  
  .wrapper .twitter::after {
    background-color: #000000;
  }
  
  .wrapper .instagram::after {
    background-color: #e4405f;
  }
  
  .wrapper .linkedin::after {
    background-color: #0a66c2;
  }
  
  .wrapper .youtube::after {
    background-color: #ff0000;
  }

  .wrapper .facebook:hover .tooltip,
  .wrapper .facebook:hover .tooltip::before {
    background: #1877f2;
    color: #fff;
  }

  .wrapper .twitter:hover .tooltip,
  .wrapper .twitter:hover .tooltip::before {
    background: #000000;
    color: #fff;
  }

  .wrapper .instagram:hover .tooltip,
  .wrapper .instagram:hover .tooltip::before {
    background: #e4405f;
    color: #fff;
  }

  .wrapper .linkedin:hover .tooltip,
  .wrapper .linkedin:hover .tooltip::before {
    background: #0a66c2;
    color: #fff;
  }

  .wrapper .youtube:hover .tooltip,
  .wrapper .youtube:hover .tooltip::before {
    background: #ff0000;
    color: #fff;
  }

  @keyframes bg-pos {
    0% {
      top: 100%;
    }
    100% {
      top: 0;
    }
  }

  @keyframes overflow-toggle {
    0% {
      overflow: hidden;
    }
    100% {
      overflow: visible;
    }
  }
`;

export default function Footer() {
  const handleFeatureClick = () => {
    alert("This feature is under development since it requires backend interaction.");
  };

  const handleSocialClick = (platform) => {
    alert(`${platform} integration coming soon!`);
  };

  return (
    <footer className="bg-white border-t border-surface-container pt-20 pb-28 md:pb-12 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-extrabold text-orange-600 tracking-tighter">Bharat Innovate</span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
              SOCSE's central hub for innovation, research management, and academic collaboration at Maharaja Sayajirao University.
            </p>
            <SocialIcons />
          </div>
          <div>
            <h5 className="font-bold mb-6 text-on-surface">Portals</h5>
            <ul className="flex flex-col gap-4 text-on-surface-variant text-sm">
              <li><Link className="hover:text-primary" to="/projects">Research Gateway</Link></li>
              <li><button className="hover:text-primary" onClick={handleFeatureClick}>Student Dashboard</button></li>
              <li><button className="hover:text-primary" onClick={handleFeatureClick}>Mentor Network</button></li>
              <li><button className="hover:text-primary" onClick={handleFeatureClick}>Patent Filing</button></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6 text-on-surface">Support</h5>
            <ul className="flex flex-col gap-4 text-on-surface-variant text-sm">
              <li><button className="hover:text-primary" onClick={handleFeatureClick}>Documentation</button></li>
              <li><button className="hover:text-primary" onClick={handleFeatureClick}>Funding Guidelines</button></li>
              <li><button className="hover:text-primary" onClick={handleFeatureClick}>Technical Help</button></li>
              <li><button className="hover:text-primary" onClick={handleFeatureClick}>Ethical Clearances</button></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6 text-on-surface">Campus</h5>
            <ul className="flex flex-col gap-4 text-on-surface-variant text-sm">
              <li>M Sayajirao University</li>
              <li>Vadodara, Gujarat</li>
              <li>Pin: 390002</li>
              <li>Contact: innovation@socse.msu.in</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-surface-container pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-on-surface-variant text-xs">© 2024 SOCSE MSU. Designed for India.</span>
          <div className="flex gap-8 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
            <button onClick={handleFeatureClick}>Privacy Policy</button>
            <button onClick={handleFeatureClick}>Usage Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
}