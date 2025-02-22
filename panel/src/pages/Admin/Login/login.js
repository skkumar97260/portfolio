import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import bottomlogo from '../../../assets/wave.svg';
import { isValidEmail } from '../../../utils/Validation'; // Corrected import path
import { login } from '../../../api/login';
import { saveToken } from '../../../utils/Storage';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../../../utils/Auth';
import './login.css';

function LoginForm() {
  const navigate = useNavigate();
  const initialStateInputs = {
    email: '',
    password: '',
  };

  const initialStateErrors = {
    email: { required: false, valid: false },
    password: { required: false },
  };

  const [inputs, setInputs] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    if (submitted) {
      const newErrors = handleValidation({ ...inputs, [name]: value });
      setErrors(newErrors);
    }
  };

  const handleValidation = (data) => {
    const newErrors = { ...initialStateErrors };
    if (data.email === '') {
      newErrors.email.required = true;
    }
    if (data.password === '') {
      newErrors.password.required = true;
    }
    if (!isValidEmail(data.email)) {
      newErrors.email.valid = true;
    }
    return newErrors;
  };

  const handleErrors = (obj) => {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const prop = obj[key];
        if (prop.required === true && prop.valid === true) {
          return false; // Both required and valid are true, return false
        }
      }
    }
    return true; // No property has both required and valid set to true, return true
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = handleValidation(inputs);
    setErrors(newErrors);
    setSubmitted(true);
    if (handleErrors(newErrors)) {
      login(inputs)
        .then((res) => {
          const token = res?.data?.token;
          const adminId = res?.data?.result?._id;
          const data = {
            token: token,
            adminId: adminId,
          };
          saveToken(data);
          if (isAuthenticated()) {
            navigate('/intro');
          }
          toast.success('Login successfully');
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } else {
      setSubmitted(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6 mt-5">
            <div className="card box_body ">
              <div className="row">
                <div className="card-body col-md-6 d-flex justify-content-center align-items-center box_body backgroundside">
                  <div className=''>
                    <h3 className="text-center text-white fw-bold">Welcome to Admin Panel</h3>
                    <h6 className="text-center text-white">Enter your details to Login for Admin Panel</h6>
                    <Link className='text-decoration-none' to="/signup">
                      <button className="btn bg-white d-block mx-auto mt-3  fw-bold text-primary " id='buttons'>SignUp</button>
                    </Link>
                  </div>
                </div>
                <div className="card-body col-md-6 p-5 ">
                  <h3 className="card-title text-center mb-4">Login</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={inputs.email}
                        onChange={handleInputs}
                        required
                      />
                      {errors.email.required && (
                        <span className="text-danger form-text">Email is required</span>
                      )}
                      {errors.email.valid && (
                        <span className="text-danger form-text">Enter a valid email address</span>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={inputs.password}
                        onChange={handleInputs}
                        required
                      />
                      {errors.password.required && (
                        <span className="text-danger form-text">Password is required</span>
                      )}
                      {errors.password.valid && (
                        <span className="text-danger form-text">Password must be at least 8 characters</span>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bt">
        <img className="bottom" src={bottomlogo} alt="Bottom Logo" />
      </div>
    </>
  );
}

export default LoginForm;
