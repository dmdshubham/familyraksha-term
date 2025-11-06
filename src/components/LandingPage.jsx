import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [heroForm, setHeroForm] = useState({ name: '', email: '', phone: '' });
  const [ctaForm, setCtaForm] = useState({ name: '', email: '', phone: '' });
  const [heroMessage, setHeroMessage] = useState('');
  const [ctaMessage, setCtaMessage] = useState('');
  const [heroLoading, setHeroLoading] = useState(false);
  const [ctaLoading, setCtaLoading] = useState(false);

  const SUPABASE_URL = 'https://wxofebyviealmeyltqtm.functions.supabase.co/handle-web-lead-india';
  const SUPABASE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4b2ZlYnl2aWVhbG1leWx0cXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTU3NzUsImV4cCI6MjA2MzQ5MTc3NX0.r6jgXR48bAOL66JDsPBW9NpOCPxUszCLMWlStZ6AH34';

  const isValidEmail = (email) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitToSupabase = async (formData, formType) => {
    const setLoading = formType === 'hero' ? setHeroLoading : setCtaLoading;
    const setMessage = formType === 'hero' ? setHeroMessage : setCtaMessage;
    const resetForm = formType === 'hero' ? () => setHeroForm({ name: '', email: '', phone: '' }) : () => setCtaForm({ name: '', email: '', phone: '' });

    try {
      setLoading(true);
      setMessage('');

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const source = 'Landing Page | ' + (isMobile ? 'Mobile' : 'Desktop');

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
        resetForm();

        // Track conversion
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'form_submission', {
            'event_category': 'Lead',
            'event_label': 'Landing Page - ' + formType
          });
        }

        if (typeof window.fbq !== 'undefined') {
          window.fbq('track', 'Lead', {
            content_name: 'Landing Page Form',
            content_category: formType
          });
        }
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

  const handleHeroSubmit = (e) => {
    e.preventDefault();

    if (!heroForm.name) {
      setHeroMessage('Please enter your full name.');
      return;
    }
    if (!heroForm.phone) {
      setHeroMessage('Please enter your phone number.');
      return;
    }
    if (heroForm.email && !isValidEmail(heroForm.email)) {
      setHeroMessage('Please enter a valid email address.');
      return;
    }

    submitToSupabase(heroForm, 'hero');
  };

  const handleCtaSubmit = (e) => {
    e.preventDefault();

    if (!ctaForm.name) {
      setCtaMessage('Please enter your full name.');
      return;
    }
    if (!ctaForm.phone) {
      setCtaMessage('Please enter your phone number.');
      return;
    }
    if (ctaForm.email && !isValidEmail(ctaForm.email)) {
      setCtaMessage('Please enter a valid email address.');
      return;
    }

    submitToSupabase(ctaForm, 'cta');
  };

  const insurers = [
    { name: 'Niva Bupa Term Insurance', logo: '/images/partners/niva.svg' },
    { name: 'Care Term Insurance', logo: '/images/partners/care.svg' },
    { name: 'Aditya Birla Term Insurance', logo: '/images/partners/aditya.svg' },
    { name: 'Bajaj Allianz Term Insurance', logo: '/images/partners/bajaj.svg' },
    { name: 'Manipal Cigna Term Insurance', logo: '/images/partners/manipal.svg' },
    { name: 'Star Term Insurance', logo: '/images/partners/star.svg' }
  ];

  return (
    <div className="page-content bg-white">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
              <div className="hero-content wow fadeInLeft">
                <h1>
                  Buy the Best Term Insurance Plans in India{' '}
                  <span className="highlight-price">starting @₹615/month ONLY</span>
                </h1>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 ms-lg-auto hero-form-col">
              <div className="hero-form-wrapper wow fadeInRight">
                <div className="hero-form">
                  <h3>Find your ideal term insurance plan</h3>
                  <form onSubmit={handleHeroSubmit}>
                    <div className="form-group">
                      <label htmlFor="hero-name">Your Name*</label>
                      <input
                        type="text"
                        id="hero-name"
                        value={heroForm.name}
                        onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="hero-phone">Your Phone Number*</label>
                      <div className="phone-input-group">
                        <div className="country-code">
                          <svg className="country-flag" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="6" fill="#FF9933"/>
                            <rect y="6" width="24" height="6" fill="#FFFFFF"/>
                            <rect y="12" width="24" height="6" fill="#138808"/>
                            <circle cx="12" cy="9" r="2" fill="#000080"/>
                          </svg>
                          +91
                        </div>
                        <input
                          type="tel"
                          id="hero-phone"
                          value={heroForm.phone}
                          onChange={(e) => setHeroForm({ ...heroForm, phone: e.target.value.replace(/[^0-9]/g, '') })}
                          placeholder=""
                          required
                          pattern="[0-9]{10,15}"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="hero-email">Your Email</label>
                      <input
                        type="email"
                        id="hero-email"
                        value={heroForm.email}
                        onChange={(e) => setHeroForm({ ...heroForm, email: e.target.value })}
                        placeholder="Enter your email"
                      />
                    </div>
                    <button type="submit" className="btn-submit" disabled={heroLoading}>
                      {heroLoading ? 'Submitting...' : 'View Plans'}
                    </button>
                    <div style={{ marginTop: '12px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
                      By submitting, you agree to our <Link to="/terms-conditions" target='_blank' style={{ color: '#4a90e2', textDecoration: 'none' }}>Terms & Conditions</Link> and <Link to="/privacy-policy" target='_blank' style={{ color: '#4a90e2', textDecoration: 'none' }}>Privacy Policy</Link>
                    </div>
                    {heroMessage && (
                      <div className={`form-message ${heroMessage.includes('✓') ? 'success' : 'error'}`}>
                        {heroMessage}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="content-inner bg-white">
        <div className="container">
          <div className="section-head style-4 text-center my-2">
            <h2 className="title">Benefits of Term Plans offered through us</h2>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 wow fadeInUp">
              <div className="feature-box">
                <i className="fas fa-balance-scale"></i>
                <h4>12,000+ Cashless*</h4>
                <p>Hospitals Network</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp">
              <div className="feature-box">
                <i className="fas fa-user-tie"></i>
                <h4>Save tax ₹75000*</h4>
                <p>Under Section 80D</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp">
              <div className="feature-box">
                <i className="fas fa-tag"></i>
                <h4>24/7 Claim Support</h4>
                <p>Only for Our customers</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp">
              <div className="feature-box">
                <i className="fas fa-shield-alt"></i>
                <h4>Up to 10% discount</h4>
                <p>on multi-year plans</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Insurers Marquee Section */}
      <section className="top-insurers-section">
        <div className="container">
          <div className="section-head style-4 text-center mb-5">
            <h2 className="title">Our Top Insurers</h2>
          </div>
        </div>
        <div className="marquee-container">
          <div className="marquee-content">
            {insurers.concat(insurers).map((insurer, index) => (
              <div key={index} className="marquee-item">
                <img src={insurer.logo} alt={insurer.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <div className="section-head style-4 text-center mb-5">
            <h2 className="title text-white" style={{ color: 'white' }}>
              Why Choose <strong>Family Raksha</strong> to Buy Term Insurance?
            </h2>
            <p className="text-white stats-description">
              Get the best protection with customizable policies, tax-saving benefits, and the lowest premium guaranteed — all backed by 10+ years of expertise from IRDAI-certified advisors. Enjoy quick 30-minute claim settlements and join thousands of satisfied customers who've rated us 4.5★ on Google.
            </p>
          </div>
          <div className="row">
            <div className="col-md-4 wow fadeInUp">
              <div className="stat-item">
                <h3>10000+</h3>
                <p>Trusted Customers</p>
              </div>
            </div>
            <div className="col-md-4 wow fadeInUp">
              <div className="stat-item">
                <h3>100+</h3>
                <p>International Coverage</p>
              </div>
            </div>
            <div className="col-md-4 wow fadeInUp">
              <div className="stat-item">
                <h3>100%</h3>
                <p>Satisfied Client</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Benefits Section */}
      <section className="insurance-info-section">
        <div className="container">
          <div className="section-head style-4 text-center mb-5">
            <h6 className="sub-title">Term Insurance</h6>
            <h2 className="title">
              We bring the <strong>Best Term Insurance</strong> options to you
            </h2>
            <p className="section-description">
              Term insurance, also known as medical insurance, is a type of policy that covers your medical expenses. It covers expenses for medical treatments at reputed hospitals
            </p>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 wow fadeInUp">
              <div className="info-card">
                <i className="fas fa-gift info-icon"></i>
                <h3>No-Claim Bonus</h3>
                <p>Earn rewards for staying healthy with no-claim bonus benefits.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp">
              <div className="info-card">
                <i className="fas fa-hospital info-icon"></i>
                <h3>Medical Expenses Coverage</h3>
                <p>Complete coverage for all your medical and hospitalization expenses.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp">
              <div className="info-card">
                <i className="fas fa-credit-card info-icon"></i>
                <h3>Cashless Hospitalisation</h3>
                <p>Get treatment without worrying about upfront payments at network hospitals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="content-inner bg-white">
        <div className="container">
          <div className="section-head style-4 text-center mb-5">
            <h2 className="title">
              Key <strong>Features</strong> Of Term Insurance
            </h2>
          </div>
          <div className="row">
            <div className="col-lg-6 wow fadeInLeft">
              <div className="info-card">
                <h3>Coverage Details</h3>
                <ul>
                  <li><strong>Term Insurance Cost:</strong> Starting at Rs 15/Day<sup>*</sup></li>
                  <li><strong>Coverage Amount:</strong> Up to Rs 1 Crore</li>
                  <li><strong>Minimum Entry Age:</strong> 0 years (Newborn Baby)</li>
                  <li><strong>Maximum Entry Age:</strong> 99 years</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight">
              <div className="info-card">
                <h3>Additional Benefits</h3>
                <ul>
                  <li><strong>Claim Procedure:</strong> Cashless claim settlement*</li>
                  <li><strong>Who Should Buy:</strong> Self and Family</li>
                  <li><strong>Covered:</strong> In-Patient Service, Out-Patient Service, Maternity Coverage, etc</li>
                  <li><strong>Buy/Renew Process:</strong> Online</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria Section */}
      <section className="insurance-info-section">
        <div className="container">
          <div className="section-head style-4 text-center mb-5">
            <h2 className="title">
              Eligibility Criteria for Buying <strong>Medical Insurance</strong> in India
            </h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="info-card">
                <table className="eligibility-table">
                  <thead>
                    <tr>
                      <th>Eligibility Criteria</th>
                      <th>Specifications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>For Adults</td>
                      <td>18 years - 99 years</td>
                    </tr>
                    <tr>
                      <td>For Dependent Children</td>
                      <td>Birth - 17 years</td>
                    </tr>
                    <tr>
                      <td>Pre-Existing Term Condition Waiting Period</td>
                      <td>One month to 3 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="insurance-info-section">
        <div className="container">
          <div className="section-head style-4 text-center mb-5">
            <h2 className="title">
              Client <strong>Reviews & Ratings</strong>
            </h2>
            <p className="section-description">
              What stands out is the honesty and transparency with which Family Raksha shares all the details.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12 wow fadeInUp">
              <div className="testimonial-card">
                <div className="quote">
                  "Recently purchased term insurance for a family member. Very good support was provided by the team. Cleared all the doubts and explained all the features of the policy. Gave the plan that exactly fits my requirements."
                </div>
                <div className="author">- Rohan Mehta</div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 wow fadeInUp">
              <div className="testimonial-card">
                <div className="quote">
                  "I'm thrilled with my term insurance from Family Raksha. The process was smooth, their executive cleared all my doubts. Customer support was exceptional, guiding me effortlessly. I feel secure with their comprehensive coverage. Highly recommend them for a hassle-free, trustworthy insurance experience."
                </div>
                <div className="author">- Hardeep Bhargav</div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 wow fadeInUp">
              <div className="testimonial-card">
                <div className="quote">
                  "I recently purchased insurance and I have to say, I am thoroughly impressed with their services. Their customer service team was extremely helpful in guiding me through the different insurance plans and helping me choose the one that best fit my needs and budget. I highly recommend this company to anyone looking for insurance coverage for their family."
                </div>
                <div className="author">- Bharat Badoliya</div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 wow fadeInUp">
              <div className="testimonial-card">
                <div className="quote">
                  "Family Raksha - You guys are superb and excellent as you helped me to find cost effective term insurance for me with good and quick service."
                </div>
                <div className="author">- Abhay Chaturvedi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Buy Section */}
      <section className="why-buy-section">
        <div className="container">
          <div className="section-head style-4 text-center mb-5">
            <h2 className="title">
              5 Reasons Why You Should Buy <strong>Medical Insurance</strong>
            </h2>
            <p className="section-description">
              Medical insurance covers your medical and hospitalization expenses, in the event of a term emergency.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-6 wow fadeInLeft">
              <div className="reason-item">
                <h4>1. Financial protection from unexpected medical bills</h4>
                <p>It's always better to have the right medical insurance coverage so that you can protect your finances from costly medical bills.</p>
              </div>
              <div className="reason-item">
                <h4>2. Coverage for a wide range of medical treatments and procedures</h4>
                <p>Usually, most term insurance policies cover a wide range of medical treatments and procedures. If not planned for, these expenses can drain your savings.</p>
              </div>
              <div className="reason-item">
                <h4>3. Cashless Hospitalization</h4>
                <p>Most insurance companies in India have tie-ups with thousands of hospitals where you can get cashless treatment. The insurer directly settles the bills with the hospital, reducing your stress during emergencies.</p>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight">
              <div className="reason-item">
                <h4>4. Coverage for the Whole Family</h4>
                <p>A family floater plan allows you to cover your entire family — spouse, children, and parents — under one policy. This makes it affordable and convenient to protect everyone's term with a single premium.</p>
              </div>
              <div className="reason-item">
                <h4>5. Tax Benefits Under Section 80D</h4>
                <p>Premiums paid towards term insurance qualify for tax deductions under Section 80D of the Income Tax Act. You can save up to ₹25,000 for self and family, and an additional ₹50,000 if you pay for your parents' policy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="wow fadeInUp">100% Satisfaction Guaranteed</h2>
          <p className="wow fadeInUp">Get A Free Quote - Protect your awesome family</p>
          <div className="cta-form wow fadeInUp">
            <h3>Get A Free Quote</h3>
            <form onSubmit={handleCtaSubmit}>
              <input
                type="text"
                value={ctaForm.name}
                onChange={(e) => setCtaForm({ ...ctaForm, name: e.target.value })}
                placeholder="Full Name *"
                required
              />
              <input
                type="email"
                value={ctaForm.email}
                onChange={(e) => setCtaForm({ ...ctaForm, email: e.target.value })}
                placeholder="Email Id (Optional)"
              />
              <input
                type="tel"
                value={ctaForm.phone}
                onChange={(e) => setCtaForm({ ...ctaForm, phone: e.target.value.replace(/[^0-9]/g, '') })}
                placeholder="Phone Number *"
                required
                pattern="[0-9]{10,15}"
              />
              <button type="submit" className="btn-submit" disabled={ctaLoading}>
                {ctaLoading ? 'Submitting...' : 'Enquire Now!'}
              </button>
              {ctaMessage && (
                <div className={`form-message ${ctaMessage.includes('✓') ? 'success' : 'error'}`}>
                  {ctaMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="content-inner bg-white disclaimer-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="disclaimer-text">
                <strong>Disclaimer:</strong> The information on this website is for general informational purposes only and should not be considered as financial advice or a recommendation to purchase any product or service. If you are unsure about which product or service to choose, we recommend seeking independent professional advice before making a purchase through our website. We strive to ensure that all information published is accurate and up-to-date; however, we cannot guarantee its complete accuracy or reliability.<br /><br />
                * Insurance plans are sold only as yearly plans. The per day rate is only for informational purposes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

