import { useState } from 'react'
import logo from '../assets/logo.png'
import './Header.css'

const navLinks = [
  { label: 'OUR COMPANY', href: '#company' },
  { label: 'OUR PORTFOLIO', href: '#portfolio' },
  { label: 'ABOUT US', href: '#about' },
  { label: 'JOIN US', href: '#join' },
  { label: 'CONTACT US', href: '#contact' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-inner">
        <a href="#" className="logo">
          <img src={logo} alt="Movements Capital" className="logo-img" />
        </a>

        <button
          className={`menu-toggle ${menuOpen ? 'menu-toggle--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Header
