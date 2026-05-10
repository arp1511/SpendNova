import React from 'react';
import Logo from './Logo.jsx';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <strong><Logo />™</strong>
        <span>Next-gen personal finance.</span>
        <small>© {year} SpendNova. All rights reserved.</small>
      </div>

      <div className="footer-links">
        <a href="/about">About</a>
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="https://github.com" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="mailto:queries.spendnova@gmail.com">queries.spendnova@gmail.com</a>
      </div>
    </footer>
  );
}

export default Footer;
