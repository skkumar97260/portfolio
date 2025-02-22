import { useState } from 'react';
import Header from '../../../components/header';
import bottomlogo from '../../../assets/wave.svg';
import { isValidEmail } from '../../../utils/Validation'; // Corrected import path
import { signup } from '../../../api/admin';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './signup.css';
import { Link } from 'react-router-dom';
function SignUpForm() {
    const navigate = useNavigate();
    const initialStateInputs = {
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
    };
    const initialStateErrors = {
        name: { required: false },
        email: { required: false, valid: false },
        password: { required: false },
        phoneNumber: { required: false },
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
        if (data.name === '') {
            newErrors.name.required = true;
        }
        if (data.email === '') {
            newErrors.email.required = true;
        }
        if (data.password === '') {
            newErrors.password.required = true;
        }
        if (data.phoneNumber === '') {
            newErrors.phoneNumber.required = true;
        }
        if (!isValidEmail(data.email)) {
            newErrors.email.valid = true;
        }
        return newErrors;
    }; const handleErrors = (obj) => {
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
        if (
            handleErrors(newErrors)
        ) {
            signup(inputs)
                .then((res) => {
                     console.log(res);
                        navigate('/login');
                
                    toast.success('Sign Up successfully');
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
                        <div className="card box2_body">
                            <div className="row">
                                <div className="card-body col-md-6 p-5 ">
                                    <h3 className="card-title text-center mb-4">Sign Up</h3>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={inputs.name}
                                            onChange={handleInputs}
                                            required
                                        />
                                        {errors.name.required && (
                                            <span className="text-danger form-text">Name is required</span>
                                        )}
                                        {errors.name.valid && (
                                            <span className="text-danger form-text">Enter a valid name</span>
                                        )}
                                    </div>
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
                                    <div className="mb-3">
                                        <label htmlFor="phoneNumber" className="form-label">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={inputs.phoneNumber}
                                            onChange={handleInputs}
                                            required
                                        />
                                        {errors.phoneNumber.required && (
                                            <span className="text-danger form-text">Phone number is required</span>
                                        )}
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>
                                        Sign Up
                                    </button>

                                </div>
                                <div className="card-body col-md-6 d-flex justify-content-center align-items-center box2_body sidebackround">
                                    <div>
                                        <h3 className="text-center text-white fw-bold">Welcome to Admin Panel</h3>
                                        <h6 className="text-center text-white">Enter your details to sign up for Admin Panel</h6>
                                       <Link className='text-decoration-none' to="/login"> 
                                       <button  className="btn bg-white d-block mx-auto mt-3  fw-bold text-primary " id='buttons'>Login</button>
                                       </Link>
                                    </div>


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

export default SignUpForm;
