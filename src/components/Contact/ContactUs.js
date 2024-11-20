import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./ContactUs.css";

const Contact = () => {
  return (
    <>
      <div className="contact-container">
        <div className="contact-row">
          <div className="contact-item">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3360.297126289496!2d-96.8378892848168!3d33.15338828086586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c19b109e19eab%3A0x2702fdd11da29dd2!2s615%20Main%20St%2C%20Frisco%2C%20TX%2075034%2C%20USA!5e0!3m2!1sen!2sin!4v1648747037125!5m2!1sen!2sin"
              width="300"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="USA Address"
            ></iframe>
            <div className="contact-details">
              <h2 className="contact-title">CONTACT</h2>
              <h4 className="contact-subtitle">USA ADDRESS</h4>
              <p className="phone-row">
                <FaMapMarkerAlt />
                <div className="address-text">
                  <span>#123,</span>
                  <span>2770 Main Street,</span>
                  <span>Frisco,</span>
                  <span>Texas 75033,</span>
                  <span>USA</span>
                </div>
              </p>
              <p className="phone-row">
                <FaPhone /> <span>+1 510 403 4840</span>
              </p>
              <p className="phone-row">
                <FaEnvelope /> <span>info@ahimay.com</span>
              </p>
              <div className="contact-icons">
                <a href="https://x.com/?lang=en-in">
                  <FaTwitter />
                </a>
                <a href="https://www.facebook.com/">
                  <FaFacebookF />
                </a>
                <a href="https://www.linkedin.com/home">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
          <div className="contact-item">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.792133226961!2d77.58002051483124!3d13.021517890816347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1668eb4b7dd3%3A0x8e6b47d6e6c4e7fa!2s4%2F62%2C%20MSR%20Nagar%2C%20New%20BEL%20Road%2C%20Bengaluru%2C%20Karnataka%20560054%2C%20India!5e0!3m2!1sen!2sin!4v1648747121291!5m2!1sen!2sin"
              width="300"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="India Address"
            ></iframe>
            <div className="contact-details">
              <h2 className="contact-title">CONTACT</h2>
              <h4 className="contact-subtitle">INDIA ADDRESS</h4>
              <p className="phone-row">
                <FaMapMarkerAlt />
                <div className="address-text">
                  <span>4/62, 2nd floor,</span>
                  <span>'Ramachandra Mansion'</span>
                  <span>Behind PNB</span>
                  <span>Next to Monte Carlo</span>
                  <span>MSR Nagar, New BEL Road</span>
                  <span>Bangalore 560054</span>
                  <span>India</span>
                </div>
              </p>

              <p className="phone-row">
                <FaPhone />
                <span>+91 8970029909</span>
              </p>
              <p className="phone-row">
                <FaEnvelope />
                <span>info@ahimay.com</span> info@ahimay.com
              </p>
              <div className="contact-icons">
                <a href="https://x.com/?lang=en-in">
                  <FaTwitter />
                </a>
                <a href="https://www.facebook.com/">
                  <FaFacebookF />
                </a>
                <a href="https://www.linkedin.com/home">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <p>
            Copyright © 2024 AHIMAY TECHNOLOGY SOLUTIONS | All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Contact;
