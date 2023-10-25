import React from 'react';
import '../assets/css/Contact.css'; 

function Contact() {
    return (
        <div className='main-container'>  
            <div className="contact-container">
                <h1>Contact Us</h1>
                <p>If you have any questions or need assistance, please feel free to contact us.</p>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" id="name" name="name" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" name="email" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea id="message" name="message" className="form-control" rows="4"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
