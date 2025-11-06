import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const SUPABASE_URL = 'https://wxofebyviealmeyltqtm.functions.supabase.co/handle-web-lead-india';
  const SUPABASE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4b2ZlYnl2aWVhbG1leWx0cXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTU3NzUsImV4cCI6MjA2MzQ5MTc3NX0.r6jgXR48bAOL66JDsPBW9NpOCPxUszCLMWlStZ6AH34';

  // Auto-open popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSubmitted = sessionStorage.getItem('enquirySubmitted');
      const autoShown = sessionStorage.getItem('autoPopupShown');
      if (!hasSubmitted && !autoShown) {
        openPopup();
        sessionStorage.setItem('autoPopupShown', 'true');
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const openPopup = () => {
    setPopupOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setPopupOpen(false);
    document.body.style.overflow = 'auto';
    setMessage('');
  };

  const isValidEmail = (email) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validation
    if (!formData.name) {
      setMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone) {
      setMessage('Please enter your phone number.');
      return;
    }
    if (formData.email && !isValidEmail(formData.email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const source = 'Footer Enquiry | ' + (isMobile ? 'Mobile' : 'Desktop');

      const apiData = {
        Name: formData.name,
        Email: formData.email,
        Mobile: formData.phone,
        Source: source
      };

      const response = await fetch(SUPABASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_TOKEN}`
        },
        body: JSON.stringify(apiData)
      });

      if (response.ok) {
        setMessage('✓ Thank you! We will contact you shortly.');
        sessionStorage.setItem('enquirySubmitted', 'true');
        setFormData({ name: '', email: '', phone: '' });

        // Track conversion
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'form_submission', {
            'event_category': 'Lead',
            'event_label': 'Footer Enquiry Form'
          });
        }

        if (typeof window.fbq !== 'undefined') {
          window.fbq('track', 'Lead', {
            content_name: 'Footer Enquiry Form',
            content_category: 'footer'
          });
        }

        // Close popup after 2 seconds
        setTimeout(() => {
          closePopup();
        }, 2000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setMessage('✗ Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top button after scrolling 100vh
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Footer */}
      <footer className="site-footer style-4" id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-sm-6 wow fadeIn">
                <h5 className="footer-title">ABOUT US</h5>
                <p>
                  Family Raksha is your trusted partner for comprehensive insurance solutions. 
                  We provide personalized service and expert guidance to protect what matters most to you.
                </p>
              </div>

              <div className="col-xl-3 col-lg-3 col-sm-6 wow fadeIn">
                <div className="widget widget_getintuch">
                  <h5 className="footer-title">CONTACT US</h5>
                  <ul>
                    <li>
                      <i className="fas fa-phone-alt"></i>
                      <a href="tel:+919236097624">+91 92360 97624</a>
                    </li>
                    <li>
                      <i className="fas fa-envelope"></i>
                      <a href="mailto:info@familyraksha.com">info@familyraksha.com</a>
                    </li>
                    <li>
                      <i className="fas fa-map-marker-alt"></i>
                      <span>India</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* <div className="col-xl-3 col-lg-3 col-sm-6 wow fadeIn">
                <div className="widget widget_services style-1">
                  <h5 className="footer-title">Quick Links</h5>
                  <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/term-insurance">Health Insurance</a></li>
                    <li><a href="/term-insurance">Term Insurance</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                  </ul>
                </div>
              </div> */}

              <div className="col-xl-3 col-lg-3 col-sm-6 wow fadeIn">
                <div className="widget widget_services style-1">
                  <h5 className="footer-title">OUR SERVICES</h5>
                  <ul>
                    <li><a href="#">Health Insurance</a></li>
                    <li><a href="#">Term Life Insurance</a></li>
                    <li><a href="#">Investment Plans</a></li>
                    <li><a href="#">Women Term Insurance</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-3 col-lg-3 col-sm-6 wow fadeIn">
                <div className="widget widget_services style-1">
                  <h5 className="footer-title">LEGAL</h5>
                  <ul>
                    <li><Link target='_blank' to="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link target='_blank' to="/terms-conditions">Terms & Conditions</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8 text-left">
                <div className="copyright-text">
                  <p>&copy; {new Date().getFullYear()} Family Raksha. All Rights Reserved. | <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms-conditions">Terms & Conditions</Link></p>
                </div>
              </div>
              <div className="col-md-4 text-left">
                <div className="dlab-social-icon">
                  <ul>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/"><i className="fab fa-twitter"></i></a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button - Only show after scrolling 100vh */}
      {showScrollTop && (
        <button className="scroltop icon-up" type="button" onClick={scrollToTop}>
          <i className="fa fa-arrow-up"></i>
        </button>
      )}

      {/* WhatsApp Button */}
      <a 
        href="https://api.whatsapp.com/send?phone=%20+919236097624&text=Hi!%20I%20am%20looking%20to%20buy%20health%20insurance.%20Can%20you%20help%20me%20familyraksha.com%20team?"
        className="whatsapp-button" 
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp"></i> Chat Us
      </a>

      {/* Enquire Now Floating Button */}
      <button className="enquire-button" type="button" onClick={openPopup}>
        <i className="fas fa-file-alt"></i> Enquire Now
      </button>

      {/* Enquiry Popup Modal */}
      <div className={`enquiry-popup-overlay ${popupOpen ? 'active' : ''}`} onClick={(e) => {
        if (e.target.classList.contains('enquiry-popup-overlay')) {
          closePopup();
        }
      }}>
        <div className="enquiry-popup-content">
          <button className="popup-close" onClick={closePopup}>&times;</button>
          <h3>Buying term insurance for?</h3>
          <form className="enquiry-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name *" 
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })}
                placeholder="Phone Number *" 
                required 
                pattern="[0-9]{10,15}" 
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email Id (Optional)" 
              />
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Enquire Now!'}
            </button>
            {message && (
              <div className={`form-message ${message.includes('✓') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Footer;

