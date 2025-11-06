import Header from '../components/Header';
import Footer from '../components/Footer';
import './LegalPages.css';

function PrivacyPolicy() {
  return (
    <div className="page-wraper">
      <Header />
      <div className="legal-page-content">
        <div className="container">
          <div className="legal-page-header">
            <h1>Privacy Policy</h1>
            <p className="last-updated">Last Updated: January 2025</p>
          </div>

          <div className="legal-content">
            <section>
              <h2>1. Introduction</h2>
              <p>
                Welcome to Family Raksha ("we", "our", or "us"). We are committed to protecting your personal information 
                and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2>2. Information We Collect</h2>
              <h3>2.1 Personal Information</h3>
              <p>We may collect the following personal information:</p>
              <ul>
                <li>Name and contact information (email address, phone number, postal address)</li>
                <li>Date of birth and age</li>
                <li>Identity proof documents (Aadhaar, PAN, etc.)</li>
                <li>Financial information for insurance quotes and policy processing</li>
                <li>Term information (for term insurance applications)</li>
                <li>Employment and income details</li>
              </ul>

              <h3>2.2 Usage Information</h3>
              <p>We automatically collect certain information when you visit our website:</p>
              <ul>
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2>3. How We Use Your Information</h2>
              <p>We use your information for the following purposes:</p>
              <ul>
                <li>To process insurance applications and provide quotes</li>
                <li>To communicate with you about our services</li>
                <li>To improve our website and customer service</li>
                <li>To send marketing communications (with your consent)</li>
                <li>To comply with legal and regulatory requirements</li>
                <li>To detect and prevent fraud</li>
                <li>To analyze usage trends and optimize user experience</li>
              </ul>
            </section>

            <section>
              <h2>4. Information Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul>
                <li><strong>Insurance Companies:</strong> To process your insurance applications and policies</li>
                <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our business</li>
                <li><strong>Regulatory Bodies:</strong> IRDAI and other regulatory authorities as required by law</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>
            </section>

            <section>
              <h2>5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information, 
                including:
              </p>
              <ul>
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Access controls and authentication</li>
                <li>Regular security assessments</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section>
              <h2>6. Your Rights</h2>
              <p>Under applicable data protection laws, you have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Object to processing of your information</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Request data portability</li>
              </ul>
            </section>

            <section>
              <h2>7. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your browsing experience. You can control 
                cookies through your browser settings. Please note that disabling cookies may affect website functionality.
              </p>
            </section>

            <section>
              <h2>8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices 
                of these websites. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2>9. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal 
                information from children.
              </p>
            </section>

            <section>
              <h2>10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by 
                posting the new policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h2>11. Contact Us</h2>
              <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
              <div className="contact-info">
                <p><strong>Family Raksha</strong></p>
                <p>Email: <a href="mailto:privacy@familyraksha.com">privacy@familyraksha.com</a></p>
                <p>Phone: <a href="tel:+919236097624">+91 92360 97624</a></p>
              </div>
            </section>

            <section>
              <h2>12. Compliance</h2>
              <p>
                This Privacy Policy is designed to comply with:
              </p>
              <ul>
                <li>Information Technology Act, 2000</li>
                <li>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</li>
                <li>IRDAI regulations and guidelines</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;

