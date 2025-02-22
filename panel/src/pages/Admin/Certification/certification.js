import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { FiCamera } from 'react-icons/fi';
import Header from '../../../components/header';
import bottomlogo from '../../../assets/wave.svg';
import './certification.css';
import { getAdminId } from '../../../utils/Storage';
import { addCertification, getCertification, updateCertification, deleteCertification } from "../../../api/certification";
import { uploadFile } from '../../../utils/FileUpload';

const Certification = () => {
    const profileRef = useRef(null);

    const initialStateInputs = {
        userId: getAdminId(),
        title: '',
        image: '',
        role: '',
        description: '',
    };

    const initialStateErrors = {
        title: { required: false },
        image: { required: false },
        role: { required: false },
        description: { required: false },
    };

    const [inputs, setInputs] = useState(initialStateInputs);
    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);
    const [selectedCertification, setSelectedCertification] = useState(null);
    const [certifications, setCertifications] = useState([]);

    const handleValidation = (data) => {
        let error = { ...initialStateErrors };
        if (data.title === "") {
            error.title.required = true;
        }
        if (data.image === "") {
            error.image.required = true;
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

    const addCertifications = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        const allInputValid = Object.values(newError).every((x) => !x.required);
        if (allInputValid) {
            addCertification(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setInputs(initialStateInputs);
                    setSubmitted(false);
                    getCertificationsList();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    const handleFileInputs = (event) => {
        const file = event.target.files[0];
        const folder = "Certifications/";
        if (file) {
            uploadFile(file, folder)
                .then((res) => {
                    const image = res?.Location;
                    setInputs({ ...inputs, image: image });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const getCertificationsList = async () => {
        try {
            const res = await getCertification();
            setCertifications(res?.data?.result);
            console.log("Certifications list", res);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCertifications = async (id) => {
        try {
            await deleteCertification(id);
            toast.success('Certification deleted successfully!');
            getCertificationsList();
        } catch (error) {
            console.error('Error deleting Certification:', error);
            toast.error(error.message || 'Failed to delete Certification. Please try again.');
        }
    };

    const handleEdit = (certification) => {
        setSelectedCertification(certification);
        setInputs({
            userId: getAdminId(),
            _id: certification._id,
            title: certification.title,
            image: certification.image,
            role: certification.role,
            description: certification.description,
        });
    };

    const updateCertifications = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        const allInputValid = Object.values(newError).every((x) => !x.required);
        if (allInputValid) {
            updateCertification(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setInputs(initialStateInputs);
                    setSubmitted(false);
                    getCertificationsList();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    const handleCancelEdit = () => {
        setSelectedCertification(null);
        setInputs(initialStateInputs);
    };

    useEffect(() => {
        getCertificationsList();
    }, []);

    return (
        <div className='back_table'>
            <Header />
            <div className="container mb-5 p-5 mt-3">
                <h1 style={{ textAlign: 'center', color: '#7333D5' }}>Certifications Management</h1>
                <form onSubmit={selectedCertification ? updateCertifications : addCertifications} className=''>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={inputs.title}
                            onChange={handleInputs}
                        />
                        {errors.title.required && (
                            <span className="text-danger form-text">This field is required.</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="text-black">
                            Upload Certification Image
                            <span className="text-danger">*</span>&nbsp;
                        </label><br />
                        <label
                            htmlFor="fileInputImage"
                            className="file-upload btn rounded-circle image_notify"
                        >
                            {inputs.image ? (
                                <img
                                    src={inputs.image}
                                    width="100"
                                    height="100"
                                    alt="Preview"
                                    className="preview-image rounded-circle"
                                    name="image"
                                />
                            ) : (
                                <FiCamera size={60} />
                            )}
                        </label>
                        <input
                            ref={profileRef}
                            className="file-upload"
                            onChange={handleFileInputs}
                            name="image"
                            id="fileInputImage"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                        />
                        {errors.image.required && (
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
                        />
                        {errors.role.required && (
                            <span className="text-danger form-text">This field is required.</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={inputs.description}
                            onChange={handleInputs}
                        />
                        {errors.description.required && (
                            <span className="text-danger form-text">This field is required.</span>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {selectedCertification ? 'Update' : 'Add'}
                    </button>
                    {selectedCertification && (
                        <button type="button" className="btn btn-secondary ml-2" onClick={handleCancelEdit}>
                            Cancel
                        </button>
                    )}
                </form>

                <div className="table-responsive">
                    <table className="table mt-5 mb-5 table-bordered border-primary">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Role</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {certifications.map((certification) => (
                                <tr key={certification._id}>
                                    <td>{certification.title}</td>
                                    <td><img src={certification.image} alt="Certification Image" width="100" height="100" /></td>
                                    <td>{certification.role}</td>
                                    <td>{certification.description}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary mr-2" onClick={() => handleEdit(certification)}>
                                            Edit
                                        </button>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteCertifications(certification._id)}>
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

export default Certification;
