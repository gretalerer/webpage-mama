import { useState, useEffect } from 'react'
import contactBg from '../assets/contact-bg.png'
import './Contact.css'

const FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim() || 'mredrley'
const FORM_ACTION = `https://formspree.io/f/${FORM_ID}`

function Contact() {
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('sent') === '1') {
      setSent(true)
      window.history.replaceState({}, '', `${window.location.pathname}#contact`)
    }
  }, [])

  const nextUrl = `${window.location.origin}${window.location.pathname}?sent=1#contact`

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

        {sent && (
          <div className="contact-banner contact-banner--success" role="status">
            <p className="contact-banner-title">Request received</p>
            <p className="contact-banner-text">
              Thank you — we&apos;ve got your message and will be in touch shortly.
            </p>
            <button
              type="button"
              className="contact-banner-action"
              onClick={() => setSent(false)}
            >
              Send another message
            </button>
          </div>
        )}

        <div className="contact-body">

          <div className="contact-location-card">
            <img src={contactBg} alt="" className="contact-location-img" />
          </div>

          {sent ? (
            <div className="contact-form contact-form--done">
              <p className="contact-done-placeholder">
                Your message was submitted successfully.
              </p>
            </div>
          ) : (
            <form className="contact-form" action={FORM_ACTION} method="POST">
              <input type="hidden" name="_next" value={nextUrl} />
              <input type="hidden" name="_subject" value="Movements Capital — Contact form" />

              <div className="contact-form-row">
                <div className="contact-field">
                  <label className="contact-label" htmlFor="contact-fullName">Full Name</label>
                  <input
                    id="contact-fullName"
                    className="contact-input"
                    type="text"
                    name="name"
                    placeholder="ALEXANDER VANCE"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="contact-field">
                  <label className="contact-label" htmlFor="contact-email">Institutional Email</label>
                  <input
                    id="contact-email"
                    className="contact-input"
                    type="email"
                    name="email"
                    placeholder="NAME@INSTITUTION.COM"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-organization">Organization</label>
                <input
                  id="contact-organization"
                  className="contact-input"
                  type="text"
                  name="organization"
                  placeholder="FIRM NAME"
                  autoComplete="organization"
                />
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-inquiry">Nature of Inquiry</label>
                <div className="contact-select-wrap">
                  <select
                    id="contact-inquiry"
                    className="contact-select"
                    name="inquiry"
                    defaultValue="Investor Relations"
                  >
                    <option>Investor Relations</option>
                    <option>Partnership</option>
                    <option>Supplier</option>
                    <option>Customer</option>
                    <option>General</option>
                  </select>
                  <span className="contact-select-arrow" aria-hidden="true">&#8964;</span>
                </div>
              </div>

              <div className="contact-field contact-field--message">
                <label className="contact-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  className="contact-textarea"
                  name="message"
                  placeholder="HOW CAN WE ACCELERATE YOUR MOVEMENT?"
                  rows={4}
                  required
                />
              </div>

              <div className="contact-form-footer">
                <span className="contact-secure">TLS encrypted in transit</span>
                <button type="submit" className="contact-submit">
                  SUBMIT REQUEST →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
