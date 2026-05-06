import logo from '../assets/logo.png'
import './Footer.css'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Our Company', href: '#company' },
  { label: 'Our Portfolio', href: '#portfolio' },
  { label: 'About Us', href: '#about' },
  { label: 'Join Us', href: '#join' },
  { label: 'Contact Us', href: '#contact' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="Movements Capital" className="footer-logo-img" />
          </div>
        </div>

        <nav className="footer-nav">
          {navLinks.map((link) => (
            <a key={link.href + link.label} href={link.href} className="footer-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-contact">
          <p>Tel. +54 9 11 5587 7499</p>
          <p>mw@movements.capital</p>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>© 2026 Movements.Capital. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
