import React, { useState, useEffect } from 'react';
import { addEducation, getEducation, updateEducation, deleteEducation } from "../../../api/education";
import { toast } from 'react-toastify';
import Header from '../../../components/header';
import bottomlogo from '../../../assets/wave.svg';
import './education.css';
import { getAdminId } from '../../../utils/Storage';


const Contact = () => {
    let initialStateInputs = {
        userId: getAdminId(),
        education: '',
        academicPlace: '',
        academicName: '',
        academicYear: '',
        academicPercentage: '',
    };

    let initialStateErrors = {
        education: { required: false },
        academicPlace: { required: false },
        academicName: { required: false },
        academicYear: { required: false },
        academicPercentage: { required: false }, 
    };

    const [inputs, setInputs] = useState(initialStateInputs);
    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);
    const [selectedEducation, setSelectedEducation] = useState(null);

    const [eductionList, setEductionList] = useState([]);

    const handleValidation = (data) => {
        let error = initialStateErrors;

        if (data.education === "") {
            error.education.required = true;
        }

        if (data.academicPlace === "") {
            error.academicPlace.required = true;
        }

        if (data.academicName === "") {
            error.academicName.required = true;
        }

        if (data.academicYear === "") {
            error.academicYear.required = true;
        }

        if (data.academicPercentage === "") {
            error.academicPercentage.required = true;
        }

        return error;
    };

    const handleInputs = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
        if (submitted) {
            const newError = handleValidation({
                ...inputs,
                [event.target.name]: event.target.value,
            });
            setErrors(newError);
        }
    };

    const addEduction = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        const allInputValid = Object.values(newError).every((x) => !x.required);
        if (allInputValid) {
            addEducation(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setInputs(initialStateInputs);
                    setSubmitted(false);
                    getEducationList();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    const getEducationList = async () => {
        try {
            const res = await getEducation();
            setEductionList(res?.data?.result);
            console.log("Education list", res);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteEduction = async (id) => {
        try {
            await deleteEducation(id);
            toast.success('Education deleted successfully!');
            getEducationList();
        } catch (error) {
            console.error('Error deleting Education:', error);
            toast.error(error.message || 'Failed to delete Education. Please try again.');
        }
    };

    const handleEdit = (education) => {
        setSelectedEducation(education);
        setInputs({
            userId: getAdminId(),
            _id: education._id,
            education: education.education,
            academicPlace: education.academicPlace,
            academicName: education.academicName,
            academicYear: education.academicYear,
            academicPercentage: education.academicPercentage,
        });
    };

    const updateEduction = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        const allInputValid = Object.values(newError).every((x) => !x.required);
        if (allInputValid) {
            updateEducation(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setInputs(initialStateInputs);
                    setSubmitted(false);
                    getEducationList();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    const handleCancelEdit = () => {
        setSelectedEducation(null);
        setInputs(initialStateInputs);
    };

    useEffect(() => {
        getEducationList();
    }, []);

    return (
        <div className='back_table'>
            <Header />
            <div className="container mb-5 p-5 mt-3">
                <h1 style={{ textAlign: 'center', color: '#7333D5' }}>Education Management</h1>
                <form onSubmit={selectedEducation ? updateEduction : addEduction} className=''>
                    <div className="form-group">
                        <label htmlFor="education">Education</label>
                        <input
                            type="text"
                            className="form-control"
                            id="education"
                            name="education"
                            value={inputs.education}
                            onChange={handleInputs}
                            placeholder="Enter Education"
                        />
                        {errors.education.required && <span className="text-danger">Education is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="academicPlace">Academic Place</label>
                        <input
                            type="text"
                            className="form-control"
                            id="academicPlace"
                            name="academicPlace"
                            value={inputs.academicPlace}
                            onChange={handleInputs}
                            placeholder="Enter Academic Place"
                        />
                        {errors.academicPlace.required && <span className="text-danger">Academic Place is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="academicName">Academic Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="academicName"
                            name="academicName"
                            value={inputs.academicName}
                            onChange={handleInputs}
                            placeholder="Enter Academic Name"
                        />
                        {errors.academicName.required && <span className="text-danger">Academic Name is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="academicYear">Academic Year</label>
                        <input
                            type="text"
                            className="form-control"
                            id="academicYear"
                            name="academicYear"
                            value={inputs.academicYear}
                            onChange={handleInputs}
                            placeholder="Enter Academic Year"
                        />
                        {errors.academicYear.required && <span className="text-danger">Academic Year is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="academicPercentage">Academic Percentage</label>
                        <input
                            type="text"
                            className="form-control"
                            id="academicPercentage"
                            name="academicPercentage"
                            value={inputs.academicPercentage}
                            onChange={handleInputs}
                            placeholder="Enter Academic Percentage"
                        />
                        {errors.academicPercentage.required && <span className="text-danger">Academic Percentage is required</span>}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {selectedEducation ? 'Update' : 'Add'}
                    </button>
                    {selectedEducation && (
                        <button type="button" className="btn btn-secondary ml-2" onClick={handleCancelEdit}>
                            Cancel
                        </button>
                    )}
                </form>

                <div className="table-responsive">
                    <table className="table mt-5 mb-5 table-bordered border-primary">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Education</th>
                                <th>Academic Place</th>
                                <th>AcademicName</th>
                                <th>AcademicYear</th>
                                <th>AcademicPercentage</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eductionList.map((education, index) => (
                                <tr key={education._id}>
                                    <td>{index + 1}</td>
                                    <td>{education.education}</td>
                                    <td>{education.academicPlace}</td>
                                    <td>{education.academicName}</td>
                                    <td>{education.academicYear}</td>
                                    <td>{education.academicPercentage}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleEdit(education)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger ml-2"
                                            onClick={() => deleteEduction(education._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bt">
                <img className="bottom" src={bottomlogo} alt="Bottom Logo" />
            </div>
        </div>
    );
};

export default Contact;
