import React from "react";
import "./privacypolicy.scss"; // Corrected the import statement to match the file name

const Privacypolicy = () => {
  return (
    <div className="privacy-policy container py-5">
      <div className="text-center mb-4">
        <h1>Privacy & Policy</h1>
      </div>
      <div className="content-section">
        <h5 className="section-title">Introduction</h5>
        <p>
          Welcome to FUJA. We value your privacy and are committed to protecting
          your personal information. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit
          our website and use our services. Please read this privacy policy
          carefully. If you do not agree with the terms of this privacy policy,
          please do not access the site.
        </p>
      </div>
      <div className="content-section">
        <h5 className="section-title">Information We Collect</h5>
        <p>
          We collect information about you in a variety of ways. The information
          we may collect on the site includes:
        </p>
        <ul>
          <li>
            <strong>Personal Data:</strong> Personally identifiable information,
            such as your name, shipping address, email address, and telephone
            number, and demographic information, such as your age, gender,
            hometown, and interests, that you voluntarily give to us when you
            register with the site or when you choose to participate in various
            activities related to the site.
          </li>
          <li>
            <strong>Derivative Data:</strong> Information our servers
            automatically collect when you access the site, such as your IP
            address, your browser type, your operating system, your access
            times, and the pages you have viewed directly before and after
            accessing the site.
          </li>
          <li>
            <strong>Financial Data:</strong> Financial information, such as data
            related to your payment method (e.g., valid credit card number, card
            brand, expiration date) that we may collect when you purchase,
            order, return, exchange, or request information about our services
            from the site.
          </li>
        </ul>
      </div>
      <div className="content-section">
        <h5 className="section-title">Use of Your Information</h5>
        <p>
          Having accurate information about you permits us to provide you with a
          smooth, efficient, and customized experience. Specifically, we may use
          information collected about you via the site to:
        </p>
        <ul>
          <li>Assist law enforcement and respond to subpoenas.</li>
          <li>
            Compile anonymous statistical data and analysis for use internally
            or with third parties.
          </li>
          <li>Create and manage your account.</li>
          <li>Delivery product when you are won.</li>
          <li>Email you regarding your account or order.</li>
          <li>
            Fulfill and manage purchases, orders, payments, and other
            transactions related to the site.
          </li>
          <li>
            Generate a personal profile about you to make future visits to the
            site more personalized.
          </li>
          <li>Increase the efficiency and operation of the site.</li>
          <li>
            Monitor and analyze usage and trends to improve your experience with
            the site.
          </li>
          <li>Notify you of updates to the site.</li>
          <li>Offer new products, services, and/or recommendations to you.</li>
          <li>Perform other business activities as needed.</li>
          <li>
            Prevent fraudulent transactions, monitor against theft, and protect
            against criminal activity.
          </li>
          <li>Process payments and refunds.</li>
          <li>Request feedback and contact you about your use of the site.</li>
          <li>Resolve disputes and troubleshoot problems.</li>
          <li>Respond to product and customer service requests.</li>
          <li>Send you a notifications.</li>
        </ul>
      </div>
      <div className="content-section">
        <h5 className="section-title">Disclosure of Your Information</h5>
        <p>
          We may share information we have collected about you in certain
          situations. Your information may be disclosed as follows:
        </p>
        <ul>
          <li>
            <strong>By Law or to Protect Rights:</strong> If we believe the
            release of information about you is necessary to respond to legal
            process, to investigate or remedy potential violations of our
            policies, or to protect the rights, property, and safety of others,
            we may share your information as permitted or required by any
            applicable law, rule, or regulation.
          </li>
          <li>
            <strong>Business Transfers:</strong> We may share or transfer your
            information in connection with, or during negotiations of, any
            merger, sale of company assets, financing, or acquisition of all or
            a portion of our business to another company.
          </li>

          <li>
            <strong>Third-Party Advertisers:</strong> We may use third-party
            advertising companies to serve ads when you visit the site. These
            companies may use information about your visits to the site and
            other websites that are contained in web cookies in order to provide
            advertisements about goods and services of interest to you.
          </li>
        </ul>
      </div>
      <div className="content-section">
        <h5 className="section-title">Data Security</h5>
        <p>
          We use administrative, technical, and physical security measures to
          help protect your personal information. While we have taken reasonable
          steps to secure the personal information you provide to us, please be
          aware that despite our efforts, no security measures are perfect or
          impenetrable, and no method of data transmission can be guaranteed
          against any interception or other type of misuse.
        </p>
      </div>
      <div className="content-section">
        <h5 className="section-title">Policy for Children</h5>
        <p>
          We do not knowingly solicit information from or market to children
          under the age of 13. If we learn that we have collected personal
          information from a child under age 13 without verification of parental
          consent, we will delete that information as quickly as possible. If
          you become aware of any data we have collected from children under age
          13, please contact us using the contact information provided below.
        </p>
      </div>
      <div className="content-section">
        <h5 className="section-title">Contact Us</h5>
        <p>
          If you have questions or comments about this Privacy Policy, please
          contact us at:
          <br />
          <strong>Email:</strong>{" "}
          <a href="mailto:jewelryauctionsystem06@gmail.com">
            jewelryauctionsystem06@gmail.com
          </a>
          <br />
          <strong>Phone:</strong> 0348012834
          <br />
          <strong>Address:</strong> Lot E2a-7, Street D1, D. D1, Long Thanh My,
          Thu Duc City, Ho Chi Minh 700000
        </p>
      </div>
    </div>
  );
};

export default Privacypolicy;
