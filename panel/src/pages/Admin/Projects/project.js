import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { FiCamera } from 'react-icons/fi';
import Header from '../../../components/header';
import bottomlogo from '../../../assets/wave.svg';
import './project.css';
import { getAdminId } from '../../../utils/Storage';
import { addProjects, getProjects, updateProjects, deleteProjects } from "../../../api/projects";
import { uploadFile } from '../../../utils/FileUpload';

const Projects = () => {
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
    const [selectedProjects, setSelectedProjects] = useState(null);
    const [projects, setProjects] = useState([]);

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

    const addProject = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        const allInputValid = Object.values(newError).every((x) => !x.required);
        if (allInputValid) {
            addProjects(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setInputs(initialStateInputs);
                    setSubmitted(false);
                    getProjectsList();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    const handleFileInputs = (event) => {
        const file = event.target.files[0];
        const folder = "Intro/";
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

    const getProjectsList = async () => {
        try {
            const res = await getProjects();
            setProjects(res?.data?.result);
            console.log("Projects list", res);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProject = async (id) => {
        try {
            await deleteProjects(id);
            toast.success('Projects deleted successfully!');
            getProjectsList();
        } catch (error) {
            console.error('Error deleting Projects:', error);
            toast.error(error.message || 'Failed to delete Projects. Please try again.');
        }
    };

    const handleEdit = (Projects) => {
        setSelectedProjects(Projects);
        setInputs({
            userId: getAdminId(),
            _id: Projects._id,
            title: Projects.title,
            image: Projects.image,
            role: Projects.role,
            description: Projects.description,
        });
    };

    const updateProject = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        const allInputValid = Object.values(newError).every((x) => !x.required);
        if (allInputValid) {
            updateProjects(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setInputs(initialStateInputs);
                    setSubmitted(false);
                    getProjectsList();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    const handleCancelEdit = () => {
        setSelectedProjects(null);
        setInputs(initialStateInputs);
    };

    useEffect(() => {
        getProjectsList();
    }, []);

    return (
        <div className='back_table'>
            <Header />
            <div className="container mb-5 p-5 mt-3">
                <h1 style={{ textAlign: 'center', color: '#7333D5' }}>Projects Management</h1>
                <form onSubmit={selectedProjects ? updateProject : addProject} className=''>
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
                            Upload Intro Image
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
                        {selectedProjects ? 'Update' : 'Add'}
                    </button>
                    {selectedProjects && (
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
                            {projects.map((Projects) => (
                                <tr key={Projects._id}>
                                    <td>{Projects.title}</td>
                                    <td><img src={Projects.image} alt="Intro Image" width="100" height="100" /></td>
                                    <td>{Projects.role}</td>
                                    <td>{Projects.description}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary mr-2" onClick={() => handleEdit(Projects)}>
                                            Edit
                                        </button>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteProject(Projects._id)}>
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

export default Projects;
