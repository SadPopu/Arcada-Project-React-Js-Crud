import React from 'react';
import '../assets/css/Home.css'; 
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Home() {
  return (
    <div className="home-container">
       <section className="section0">
            <Carousel showThumbs={false} showStatus={false} className='carousel'>
                <div>
                <img src={process.env.PUBLIC_URL + '/light-bulb-close-up-colors.jpg'} alt="Service"  />
                </div>
                <div>
                <img src={process.env.PUBLIC_URL + '/light-bulb-minimal.jpg'} alt="Service"  />
                </div>
            </Carousel>
        </section>  

      <section className="section3">
    <h1>Our Services</h1>
    <div className="service-boxes">
        <div className="service-box">
        <img src={process.env.PUBLIC_URL + '/asd.png'} alt="Service" className='left-image' />
            <p className='service-box-text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="service-box">
        <img src={process.env.PUBLIC_URL + '/asd.png'} alt="Service" className='left-image' />
            <p className='service-box-text' >Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="service-box">
        <img src={process.env.PUBLIC_URL + '/asd.png'} alt="Service" className='left-image' />
            <p className='service-box-text' >Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
    </div>
</section>


      <section className="section1">
    <div className="content">
      <img src={process.env.PUBLIC_URL + '/about.png'} alt="About Us" className='left-image' />
        <div className="text">
            <h1>About Us</h1>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

            </p>
        </div>
    </div>
</section>


      <section className="section2">
        <div className='contact-text'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
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
      </section>
    </div>
  );
}

export default Home;
