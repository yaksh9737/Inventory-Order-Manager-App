import React from "react";
import './ContactPage.css'; // Import the CSS file for the new styles

const ContactPage = () => {
  return (
    <>
      <div className="container my-5 py-5 contact-page">
        <h1 className="text-center contact-title">Contact Us</h1>
        <hr className="contact-divider" />
        <div className="row my-4 h-100">
          <div className="col-md-6 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div className="form-group my-4">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control form-input"
                  id="Name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group my-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control form-input"
                  id="Email"
                  placeholder="name@example.com"
                />
              </div>
              <div className="form-group my-4">
                <label className="form-label">Message</label>
                <textarea
                  rows={5}
                  className="form-control form-input"
                  id="Message"
                  placeholder="Enter your message"
                />
              </div>
              <div className="text-center">
                <button
                  className="my-2 px-5 mx-auto btn btn-submit"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
