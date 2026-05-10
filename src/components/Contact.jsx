import { useState } from 'react'
import contactBg from '../assets/contact-bg.png'
import './Contact.css'

function Contact() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    organization: '',
    inquiry: 'Investor Relations',
    message: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className="contact section" id="contact">
      <div className="container contact-inner">

        <div className="contact-header">
          <div className="contact-header-left">
            <span className="contact-eyebrow">Connect with us</span>
            <h2 className="contact-heading">
              Shape the next <em>movement.</em>
            </h2>
            <p className="contact-subtext">
              We partner with founders building the future of industrial technology and
              complex infrastructure. Our network is curated; our focus is unwavering.
            </p>
          </div>
          <div className="contact-header-right">
            <a href="mailto:inquiries@movements.cap" className="contact-email-link">
              ↗ INQUIRIES@MOVEMENTS.CAP
            </a>
          </div>
        </div>

        <div className="contact-body">

          <div className="contact-location-card">
            <img
              src={contactBg}
              alt="Movement"
              className="contact-location-img"
            />
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>

            <div className="contact-form-row">
              <div className="contact-field">
                <label className="contact-label">Full Name</label>
                <input
                  className="contact-input"
                  type="text"
                  name="fullName"
                  placeholder="ALEXANDER VANCE"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-field">
                <label className="contact-label">Institutional Email</label>
                <input
                  className="contact-input"
                  type="email"
                  name="email"
                  placeholder="NAME@INSTITUTION.COM"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="contact-field">
              <label className="contact-label">Organization</label>
              <input
                className="contact-input"
                type="text"
                name="organization"
                placeholder="FIRM NAME"
                value={form.organization}
                onChange={handleChange}
              />
            </div>

            <div className="contact-field">
              <label className="contact-label">Nature of Inquiry</label>
              <div className="contact-select-wrap">
                <select
                  className="contact-select"
                  name="inquiry"
                  value={form.inquiry}
                  onChange={handleChange}
                >
                  <option>Investor Relations</option>
                  <option>Partnership</option>
                  <option>Supplier</option>
                  <option>Customer</option>
                  <option>General</option>
                </select>
                <span className="contact-select-arrow">&#8964;</span>
              </div>
            </div>

            <div className="contact-field contact-field--message">
              <label className="contact-label">Message</label>
              <textarea
                className="contact-textarea"
                name="message"
                placeholder="HOW CAN WE ACCELERATE YOUR MOVEMENT?"
                rows={4}
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <div className="contact-form-footer">
              <span className="contact-secure">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                  <rect x="1" y="6" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M3.5 6V4a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Secured Encryption Active
              </span>
              <button type="submit" className="contact-submit">
                SUBMIT REQUEST →
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  )
}

export default Contact
