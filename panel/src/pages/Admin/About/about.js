import React, { useState, useEffect, useRef } from 'react';
import { addAbout, getAbout, updateAbout, deleteAbout } from "../../../api/about";
import { toast } from 'react-toastify';
import { FiCamera } from 'react-icons/fi';
import Header from '../../../components/header';
import bottomlogo from '../../../assets/wave.svg';
import './about.css';
import { getAdminId } from '../../../utils/Storage';
import { uploadFile } from '../../../utils/FileUpload';

const About = () => {
    const profileRef = useRef(null);
    const resumeRef = useRef(null);

    const initialStateInputs = {
        userId: getAdminId(),
        image: '',
        description1: '',
        description2: '',
        skills: [{ skill: '', image: '' }],
        resume: '',
    };

    const initialStateErrors = {
        image: { required: false },
        description1: { required: false },
        description2: { required: false },
        skills: [{ skill: { required: false }, image: { required: false } }],
        resume: { required: false },
    };

    const [inputs, setInputs] = useState(initialStateInputs);
    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);
    const [selectedAbout, setSelectedAbout] = useState(null);
    const [abouts, setAbouts] = useState([]);

    const handleValidation = (data) => {
        let error = { ...initialStateErrors };
        if (data.image === "") {
            error.image.required = true;
        }
        if (data.description1 === "") {
            error.description1.required = true;
        }
        if (data.description2 === "") {
            error.description2.required = true;
        }
        data.skills.forEach((skill, index) => {
            if (skill.skill === "") {
                error.skills[index] = { ...error.skills[index], skill: { required: true } };
            }
            if (skill.image === "") {
                error.skills[index] = { ...error.skills[index], image: { required: true } };
            }
        });
        if (data.resume === "") {
            error.resume.required = true;
        }
        return error;
    };

    const handleInputs = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
        if (submitted) {
            setErrors(handleValidation({ ...inputs, [name]: value }));
        }
    };

    const handleSkillsChange = (event, index) => {
        const { name, value } = event.target;
        const newSkills = [...inputs.skills];
        newSkills[index] = { ...newSkills[index], [name]: value };
        setInputs({ ...inputs, skills: newSkills });
    };

    const addSkillField = () => {
        setInputs({ ...inputs, skills: [...inputs.skills, { skill: '', image: '' }] });
        setErrors({ ...errors, skills: [...errors.skills, { skill: { required: false }, image: { required: false } }] });
    };

    const removeSkillField = (index) => {
        const newSkills = [...inputs.skills];
        newSkills.splice(index, 1);
        setInputs({ ...inputs, skills: newSkills });
    };

    const handleFileImage = (event) => {
        const file = event.target.files[0];
        const folder = "Image/";
        if (file) {
            uploadFile(file, folder)
                .then((res) => {
                    setInputs({ ...inputs, image: res.Location });
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("File upload failed. Please try again.");
                });
        }
    };

    const handleFileInputs = (event, index) => {
        const file = event.target.files[0];
        const folder = "Skills/";
        if (file) {
            uploadFile(file, folder)
                .then((res) => {
                    const newSkills = [...inputs.skills];
                    newSkills[index] = { ...newSkills[index], image: res.Location };
                    setInputs({ ...inputs, skills: newSkills });
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("File upload failed. Please try again.");
                });
        }
    };

    const handleFileResume = (event) => {
        const file = event.target.files[0];
        const folder = "Resume/";
        if (file) {
            uploadFile(file, folder)
                .then((res) => {
                    setInputs({ ...inputs, resume: res.Location });
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("File upload failed. Please try again.");
                });
        }
    };

    const getAboutList = async () => {
        try {
            const res = await getAbout();
            setAbouts(res.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    const addAbouts = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        const allInputValid = Object.values(newError).every((x) => !x.required);
        if (allInputValid) {
            addAbout(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setInputs(initialStateInputs);
                    setSubmitted(false);
                    getAboutList();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    const updateAbouts = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        const allInputValid = Object.values(newError).every((x) => !x.required);
        if (allInputValid) {
            updateAbout(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setInputs(initialStateInputs);
                    setSubmitted(false);
                    getAboutList();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    const handleEdit = (about) => {
        console.log("about", about);
        setSelectedAbout(about);
        setInputs({
            userId: getAdminId(),
            _id: about._id,
            image: about.image,
            description1: about.description1,
            description2: about.description2,
            skills: about.skills.length > 0 ? about.skills : [{ skill: '', image: '' }],
            resume: about.resume,
        });
        
    };

    const handleCancelEdit = () => {
        setSelectedAbout(null);
        setInputs(initialStateInputs);
    };

    const deleteAbouts = async (id) => {
        try {
            await deleteAbout(id);
            toast.success('About deleted successfully!');
            getAboutList();
        } catch (error) {
            console.error('Error deleting about:', error);
            toast.error(error.message || 'Failed to delete about. Please try again.');
        }
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getAboutList();
        }
        return () => { isMounted = false; };
    }, []);

    return (
        <div className='back_table'>
            <Header />
            <div className="container-fluid mb-5 p-5 m-3">
                <h1 style={{ textAlign: 'center', color: '#7333D5' }}>About Management</h1>
                <form onSubmit={selectedAbout ? updateAbouts : addAbouts}>
                    <label className="text-black">
                        Upload About Image
                        <span className="text-danger">*</span>&nbsp;
                    </label><br />
                    <label
                        htmlFor="fileInputImage"
                        className="file-upload btn rounded-circle image_notify"
                    >
                        {inputs?.image ? (
                            <img
                                src={inputs?.image}
                                width="100"
                                height="100"
                                className="rounded-circle"
                                alt="Profile"
                            />
                        ) : (
                            <FiCamera size={40} />
                        )}
                    </label>
                    <input
                        ref={profileRef}
                        type="file"
                        id="fileInputImage"
                        name="image"
                        onChange={handleFileImage}
                        hidden
                    />
                    {errors.image.required && (
                        <span className="text-danger">Image is required.</span>
                    )}
                    <br />
                    <div className="form-group">
                        <label className="text-black">Description 1<span className="text-danger">*</span></label>
                        <input
                            className="form-control"
                            type="text"
                            name="description1"
                            value={inputs.description1}
                            onChange={handleInputs}
                        />
                        {errors.description1.required && (
                            <span className="text-danger">Description 1 is required.</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="text-black">Description 2<span className="text-danger">*</span></label>
                        <input
                            className="form-control"
                            type="text"
                            name="description2"
                            value={inputs.description2}
                            onChange={handleInputs}
                        />
                        {errors.description2.required && (
                            <span className="text-danger">Description 2 is required.</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="text-black">Skills<span className="text-danger">*</span></label>
                        {inputs.skills.map((skill, index) => (
                            <div key={index} className="mb-2">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="skill"
                                    placeholder={`Skill ${index + 1}`}
                                    value={skill.skill}
                                    onChange={(event) => handleSkillsChange(event, index)}
                                />
                                {errors.skills[index]?.skill?.required && (
                                    <span className="text-danger">Skill name is required.</span>
                                )}
                                <br />
                                <label htmlFor={`fileInputSkills-${index}`} className="file-upload btn rounded-circle image_notify">
                                    {skill.image ? (
                                        <img
                                            src={skill.image}
                                            width="50"
                                            height="50"
                                            className="rounded-circle"
                                            alt="Skill"
                                        />
                                    ) : (
                                        <FiCamera size={20} />
                                    )}
                                </label>
                                <input
                                    ref={profileRef}
                                    type="file"
                                    id={`fileInputSkills-${index}`}
                                    name="image"
                                    onChange={(event) => handleFileInputs(event, index)}
                                    hidden
                                />
                                {errors.skills[index]?.image?.required && (
                                    <span className="text-danger">Skill image is required.</span>
                                )}
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm ml-2"
                                    onClick={() => removeSkillField(index)}
                                >
                                    Remove Skill
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={addSkillField}
                        >
                            Add Skill
                        </button>
                    </div>
                    <div className="form-group">
                        <label className="text-black">
                            Upload Resume
                            <span className="text-danger">*</span>&nbsp;
                        </label><br />
                     
                        <input
                           ref={resumeRef}
                            type="file"
                            id="fileInputResume"
                            name="resume"
                            onChange={handleFileResume}
                            className="form-control"
                        />
                        {errors.resume.required && (
                            <span className="text-danger">Resume is required.</span>
                        )}
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-6 col-lg-12">
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                >
                                    {selectedAbout ? 'Update' : 'Save'}
                                </button>
                                {selectedAbout && (
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-block mt-2"
                                        onClick={handleCancelEdit}
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
                <br />
                <div>
                    <h1 className="text-black text-center mb-4">List of About</h1>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Description 1</th>
                                <th>Description 2</th>
                                <th>Skills</th>
                                <th>Resume</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {abouts.map((about) => (
                                <tr key={about._id}>
                                    <td>
                                        <img
                                            src={about.image}
                                            alt="About"
                                            className="rounded-circle"
                                            width="50"
                                            height="50"
                                        />
                                    </td>
                                    <td>{about.description1}</td>
                                    <td>{about.description2}</td>
                                    <td>
                                    {about.skills.map((skill, skillIndex) => (
                                            <div key={skillIndex} className="mb-2 d-flex">
                                                <p>{skillIndex + 1} - {skill.skill}</p>
                                                <img
                                                    src={skill.image}
                                                    alt={skill.skill}
                                                    className="img-thumbnail"
                                                    width="50"
                                                    height="50"
                                                />
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        <a
                                            href={about.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Resume
                                        </a>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary mr-2"
                                            onClick={() => handleEdit(about)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => deleteAbouts(about._id)}
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
            <footer>
                <img src={bottomlogo} alt="" className="wave" />
                <div className="footer content">
                    <p>@2021 About Us. All Rights Reserved | Design by Samip Samrat</p>
                </div>
            </footer>
        </div>
    );
};

export default About;
