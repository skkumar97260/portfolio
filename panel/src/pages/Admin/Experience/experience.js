import React, { useState, useEffect } from 'react';
import { addExperience, getExperience, updateExperience, deleteExperience } from "../../../api/experience";
import { toast } from 'react-toastify';
import Header from '../../../components/header';
import bottomlogo from '../../../assets/wave.svg';
import './experience.css';
import { getAdminId } from '../../../utils/Storage';

const Experience = () => {
    const initialStateInputs = {
        userId: getAdminId(),
        year: '',
        company: '',
        role: '',
        description: '',
    };

    const initialStateErrors = {
        year: { required: false },
        company: { required: false },
        role: { required: false },
        description: { required: false },
    };

    const [inputs, setInputs] = useState(initialStateInputs);
    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [Experiences, setExperiences] = useState([]);

    const handleValidation = (data) => {
        let error = { ...initialStateErrors };
        if (data.year === "") {
            error.year.required = true;
        }
        if (data.company === "") {
            error.company.required = true;
        }
        if (data.role === "") {
            error.role.required = true;
        }
        if (data.description === "") {
            error.description.required = true;
        }
        return error;
    };

    const handleInputs = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
        if (submitted) {
            const newError = handleValidation({ ...inputs, [name]: value });
            setErrors(newError);
        }
    };

    const addExperiences = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        const allInputValid = Object.values(newError).every((x) => !x.required);
        if (allInputValid) {
            addExperience(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setInputs(initialStateInputs);
                    setSubmitted(false);
                    getExperienceList();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    const getExperienceList = async () => {
        try {
            const res = await getExperience();
            setExperiences(res?.data?.result);
            console.log("Experience list", res);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteExperiences = async (id) => {
        try {
            await deleteExperience(id);
            toast.success('Experience deleted successfully!');
            getExperienceList();
        } catch (error) {
            console.error('Error deleting Experience:', error);
            toast.error(error.message || 'Failed to delete Experience. Please try again.');
        }
    };

    const handleEdit = (Experience) => {
        setSelectedExperience(Experience);
        setInputs({
            userId: getAdminId(),
            _id: Experience._id,
            year: Experience.year,
            company: Experience.company,
            role: Experience.role,
            description: Experience.description,
        });
    };

    const updateExperiences = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        const allInputValid = Object.values(newError).every((x) => !x.required);
        if (allInputValid) {
            updateExperience(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setInputs(initialStateInputs);
                    setSubmitted(false);
                    getExperienceList();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    const handleCancelEdit = () => {
        setSelectedExperience(null);
        setInputs(initialStateInputs);
    };

    useEffect(() => {
        getExperienceList();
    }, []);

    return (
        <div className='back_table'>
            <Header />
            <div className="container mb-5 p-5 mt-3">
                <h1 style={{ textAlign: 'center', color: '#7333D5' }}>Experience Management</h1>
                <form onSubmit={selectedExperience ? updateExperiences : addExperiences} className=''>
                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input
                            type="text"
                            className="form-control"
                            id="year"
                            name="year"
                            value={inputs.year}
                            onChange={handleInputs}
                            required
                        />
                        {errors.year.required && (
                            <span className="text-danger form-text">This field is required.</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="company">Company</label>
                        <input
                            type="text"
                            className="form-control"
                            id="company"
                            name="company"
                            value={inputs.company}
                            onChange={handleInputs}
                            required
                        />
                        {errors.company.required && (
                            <span className="text-danger form-text">This field is required.</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <input
                            type="text"
                            className="form-control"
                            id="role"
                            name="role"
                            value={inputs.role}
                            onChange={handleInputs}
                            required
                        />
                        {errors.role.required && (
                            <span className="text-danger form-text">This field is required.</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={inputs.description}
                            onChange={handleInputs}
                            required
                        ></textarea>
                        {errors.description.required && (
                            <span className="text-danger form-text">This field is required.</span>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {selectedExperience ? 'Update' : 'Add'}
                    </button>
                    {selectedExperience && (
                        <button type="button" className="btn btn-secondary ml-2" onClick={handleCancelEdit}>
                            Cancel
                        </button>
                    )}
                </form>

                <div className="table-responsive">
                    <table className="table mt-5 mb-5 table-bordered border-primary">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Company</th>
                                <th>Role</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Experiences.map((Experience) => (
                                <tr key={Experience._id}>
                                    <td>{Experience.year}</td>
                                    <td>{Experience.company}</td>
                                    <td>{Experience.role}</td>
                                    <td>{Experience.description}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary mr-2" onClick={() => handleEdit(Experience)}>
                                            Edit
                                        </button>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteExperiences(Experience._id)}>
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

export default Experience;
