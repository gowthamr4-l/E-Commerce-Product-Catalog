import React from 'react'
import '../Styles/Contact.css'

function Contact() {
  return (
    <div>
      <div className="contact-page">
        <h1>Contact Us</h1>
        <p className="highlight">
          Have questions? We're here to help!
        </p>

        <div className="contact-details">
          <p><strong>Email:</strong> gowtham2151@gmail.com</p>
          <p><strong>Phone:</strong> +91 8870483093</p>
          <p><strong>Address:</strong> Shanmugam Rd,
            West Tambaram,
            Tambaram, Chennai, Tamil Nadu 600045</p>
        </div>
        <p className="note">
          Feel free to reach out to us anytime. We value your feedback and inquiries.
        </p>
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
