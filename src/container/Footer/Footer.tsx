import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

import { images } from '../../constants';
import emailKeys from '../../emailKeys';
import { AppWrap, MotionWrap } from '../../wrapper';
import './Footer.scss';

type Props = {};


const Footer = (props: Props) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(`${emailKeys.SERVICE_ID}`, `${emailKeys.TEMPLATE_ID}`, formData, `${emailKeys.PUBLIC_KEY}`)
      .then((result) => {
          console.log(result.text);
          setLoading(false);
          setIsFormSubmitted(true);
      }, (error) => {
          console.log(error.text);
          setLoading(false);
      });
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:broulaye@vt.edu" className="p-text">broulaye@vt.edu</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+1 (571) 490-2091" className="p-text">+1 (571) 490-2091</a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input className="p-text" type="text" placeholder="Your Name" name="name" value={name} onChange={handleChangeInput} />
          </div>
          <div className="app__flex">
            <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">
            Thank you for getting in touch!
          </h3>
        </div>
      )}
      <div className="copyright">
        <p className="p-text">@2023 Broulaye</p>
        <p className="p-text">All rights reserved</p>
      </div>
    </>
  );
};

export default AppWrap({
  Component: MotionWrap({ Component: Footer, classNames: 'app__footer'}),
  idName: 'contact',
  classNames: 'app__primarybg',
});