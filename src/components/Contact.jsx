import { useState } from 'react'
import contactBg from '../assets/contact-bg.png'
import './Contact.css'

const FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim() || 'mredrley'
const FORM_ACTION = `https://formspree.io/f/${FORM_ID}`

function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch(FORM_ACTION, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok || data.ok === false) {
        throw new Error(
          data.error ||
            (Array.isArray(data.errors) ? data.errors.map((x) => x.message).join(' ') : '') ||
            `Submission failed (${res.status})`
        )
      }

      setStatus('sent')
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
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
            <img src={contactBg} alt="" className="contact-location-img" />
          </div>

          {status === 'sent' ? (
            <div className="contact-form contact-form--done" role="status" aria-live="polite">
              <p className="contact-done-title">Thank you.</p>
              <p className="contact-done-text">
                We&apos;ve received your message and will reach out to you soon.
              </p>
              <button
                type="button"
                className="contact-banner-action"
                onClick={() => setStatus('idle')}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" action={FORM_ACTION} method="POST" onSubmit={handleSubmit}>
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
                    disabled={status === 'sending'}
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
                    disabled={status === 'sending'}
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
                  disabled={status === 'sending'}
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
                    disabled={status === 'sending'}
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
                  disabled={status === 'sending'}
                />
              </div>

              {status === 'error' && (
                <p className="contact-error" role="alert">{errorMsg}</p>
              )}

              <div className="contact-form-footer">
                <span className="contact-secure">TLS encrypted in transit</span>
                <button
                  type="submit"
                  className="contact-submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'SENDING…' : 'SUBMIT REQUEST →'}
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
