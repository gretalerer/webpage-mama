import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for reaching out! We will be in touch shortly.')
    setForm({ firstName: '', lastName: '', email: '', role: '', message: '' })
  }

  return (
    <section className="contact section" id="contact">
      <div className="contact-inner container">
        <div className="contact-image">
          <div className="contact-image-bg" />
        </div>
        <div className="contact-form-wrapper">
          <h2 className="section-title">GET IN TOUCH</h2>
          <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
            Please submit your contact information and we will be in touch with you shortly.
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Apply to us *</label>
              <select name="role" value={form.role} onChange={handleChange} required>
                <option value="">Select a role</option>
                <option value="investor">Investor</option>
                <option value="partner">Partner</option>
                <option value="supplier">Supplier</option>
                <option value="customer">Customer</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
