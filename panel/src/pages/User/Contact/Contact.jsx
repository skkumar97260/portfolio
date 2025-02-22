import React, { useState } from "react";
import "./Contact.css";
import Header from "../../../components/header";

import { isValidPhone, isValidEmail } from "../../../utils/Validation";
import { addContactMe } from "../../../api/contactme";
import { toast } from "react-toastify";
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const initialState = {
    name: "",
    message: "",
    mobileNumber: "",
    email: "",
    dateTime: new Date().toLocaleString([], {
      dateStyle: "short",
      timeStyle: "short",
    }),
  };

  const initialStateErrors = {
    name: { required: false },
    message: { required: false },
    mobileNumber: { required: false, valid: false },
    email: { required: false, valid: false },
  };

  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleValidation = (data) => {
    const error = { ...initialStateErrors };
    if (data.name === "") {
      error.name.required = true;
    }
    if (data.message === "") {
      error.message.required = true;
    }
    if (data.mobileNumber === "") {
      error.mobileNumber.required = true;
    }
    if (data.email === "") {
      error.email.required = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    if (!isValidPhone(data.mobileNumber)) {
      error.mobileNumber.valid = true;
    }
    return error;
  };

  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true || prop.valid === true) {
          return false;
        }
      }
    }
    return true;
  };

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    if (submitted) {
      const newError = handleValidation({
        ...inputs,
        [e.target.name]: e.target.value,
      });
      setErrors(newError);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);

    if (handleErrors(newError)) {
      addContactMe(inputs)
        .then((res) => {
          if (res?.data?.message === "Email sent successfully") {
            toast.success(res?.data?.message);
            e.target.reset();
            setInputs(initialState);
            setErrors(initialStateErrors);
            setSubmitted(false);
            navigate("/");
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <>
      <Header />
      <div className="container contactForm mt-5 pt-2">
        <nav>
          <div className="navDetials">
            <div className="homeContact">
              <span>
                <i className="bi bi-house-door-fill"></i>
                <h6>Contact Us</h6>
              </span>
              <h3>Contact Us</h3>
            </div>
    
          </div>
        </nav>
        <div className="contactFormsDetials">
          <div className="FormDetails">
            <h4>
              <a href="tel:+91 6383669620">+91 6383669620</a>
            </h4>
            <h5>Official Email</h5>
            <p className="emailpixalive">
              <a href="mailto:skkumar97260@gmail.com">skkumar97260@gmail.com</a>
            </p>
            <h5>Location</h5>
            <p>
              Third floor, No 35/2 Konappana Agrahara, Hosur Rd, 2nd phase,
              <br /> Electronic City, Karnataka 560100
            </p>
            <div className="iconsContact">
              <a href="https://www.facebook.com/profile.php?id=100053862038490" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://x.com/skkumar97260" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com/in/siva-kumar-6106092b4/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="messageBox">
            <h6>HAVE QUESTIONS?</h6>
            <h3>Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="NameBox">
                <input
                  type="text"
                  placeholder="Name"
                  onChange={handleInputs}
                  maxLength={30}
                  name="name"
                  value={inputs.name}
                />
              </div>
              {errors.name.required && (
                <p className="error text-danger">Name is required</p>
              )}
              <div className="NameBox phoneEmail">
                <input
                  type="email"
                  placeholder="Email"
                  onChange={handleInputs}
                  name="email"
                  value={inputs.email}
                />
                {errors.email.required && (
                  <p className="error text-danger">Email is required</p>
                )}
                {errors.email.valid && (
                  <p className="error">Email is not valid</p>
                )}
                <input
                  type="text"
                  placeholder="Mobile Number"
                  onChange={handleInputs}
                  maxLength={10}
                  name="mobileNumber"
                  value={inputs.mobileNumber}
                />
                {errors.mobileNumber.required && (
                  <p className="error text-danger">Mobile Number is required</p>
                )}
                {errors.mobileNumber.valid && (
                  <p className="error">Mobile Number is not valid</p>
                )}
              </div>
              <div className="NameBox">
                <textarea
                  rows={5}
                  onChange={handleInputs}
                  placeholder="Tell me about yourself"
                  name="message"
                  value={inputs.message}
                />
              </div>
              {errors.message.required && (
                <p className="error text-danger">Message is required</p>
              )}
              <button type="submit" className="getDetialsbtn">
                <span>
                  <i className="bi bi-telegram"></i>
                </span>
                Get In Touch
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
