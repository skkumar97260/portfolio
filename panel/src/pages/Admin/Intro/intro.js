import React, { useState, useEffect, useRef } from 'react';
import { addIntro, getIntro, updateIntro, deleteIntro } from "../../../api/intro";
import { toast } from 'react-toastify';
import Header from '../../../components/header';
import bottomlogo from '../../../assets/wave.svg';
import './intro.css';
import { getAdminId } from '../../../utils/Storage';
import { FiCamera } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../../../utils/FileUpload';

const Intro = () => {
    const profileRef = useRef(null);
    let initialStateInputs = {
        userId: getAdminId(),
        title: "",
        image: "",
        firstName: "",
        lastName: "",
        caption: "",
        description: ""
    };

    let initialStateErrors = {
        title: { required: false },
        image: { required: false },
        firstName: { required: false },
        lastName: { required: false },
        caption: { required: false },
        description: { required: false },
    };

    const [inputs, setInputs] = useState(initialStateInputs);
    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);
    const [selectedIntro, setSelectedIntro] = useState(null);
    const navigate = useNavigate();
    const [Intros, setIntros] = useState([]);

    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (data.title === "") {
            error.title.required = true;
        }
        if (data.image === "") {
            error.image.required = true;
        }
        if (data.firstName === "") {
            error.firstName.required = true;
        }
        if (data.lastName === "") {
            error.lastName.required = true;
        }
        if (data.caption === "") {
            error.caption.required = true;
        }
        if (data.description === "") {
            error.description.required = true;
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

    const addIntros = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        const allInputValid = Object.values(newError).every((x) => !x.required);
        if (allInputValid) {
            addIntro(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    navigate("/dashboard/news/newslist");
                    setInputs(initialStateInputs);
                    setSubmitted(false);
                    getIntroList();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    const handleFileInputs = (event) => {
        const file = event?.target?.files[0];
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

    useEffect(() => {
        getIntroList();
    }, []);

    const getIntroList = async () => {
        try {
            const res = await getIntro();
            setIntros(res?.data?.result);
            console.log("Intro list", res);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteIntros = async (id) => {
        try {
            await deleteIntro(id);
            toast.success('Intro deleted successfully!');
            getIntroList();
        } catch (error) {
            console.error('Error deleting Intro:', error);
            toast.error(error.message || 'Failed to delete Intro. Please try again.');
        }
    };

    const handleEdit = (Intro) => {
        setSelectedIntro(Intro);
        setInputs({
            userId: getAdminId(),
            _id: Intro._id,
            image: Intro.image,
            title: Intro.title,
            firstName: Intro.firstName,
            lastName: Intro.lastName,
            caption: Intro.caption,
            description: Intro.description
        });
    };

    const updateIntros = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        const allInputValid = Object.values(newError).every((x) => !x.required);
        if (allInputValid) {
            updateIntro(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setInputs(initialStateInputs);
                    setSubmitted(false);
                    getIntroList();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    const handleCancelEdit = () => {
        setSelectedIntro(null);
        setInputs(initialStateInputs);
    };

    return (
        <div className='back_table'>
            <Header />
            <div className="container mb-5 p-5 mt-3">
                <h1 style={{ textAlign: 'center', color: '#7333D5' }}>Intro Management</h1>
                <form onSubmit={selectedIntro ? updateIntros : addIntros}>
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
                                        <span className="text-danger form-text">
                                            This field is required.
                                        </span>
                                    )}

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
                    </div>
                    {errors.title.required && (
                                        <span className="text-danger form-text">
                                            This field is required.
                                        </span>
                                    )}

                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={inputs.firstName}
                            onChange={handleInputs}
                        />
                    </div>
                    {errors.firstName.required && (
                                        <span className="text-danger form-text">
                                            This field is required.
                                        </span>
                                    )}
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={inputs.lastName}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="caption">Caption</label>
                        <input
                            type="text"
                            className="form-control"
                            id="caption"
                            name="caption"
                            value={inputs.caption}
                            onChange={handleInputs}
                        />
                    </div>
                    {errors.caption.required && (
                                        <span className="text-danger form-text">
                                            This field is required.
                                        </span>
                    )}
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
                    </div>
                    {errors.description.required && (
                                        <span className="text-danger form-text">
                                            This field is required.
                                        </span>
                    )}
                    <button type="submit" className="btn btn-primary">
                        {selectedIntro ? 'Update' : 'Add'}
                    </button>
                    {selectedIntro && (
                        <button
                            type="button"
                            className="btn btn-secondary ml-2"
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </button>
                    )}
                </form>
                <div className="table-responsive">
                    <table className="table mt-5 mb-5 table-bordered border-primary">
                        <thead>
                            <tr>
                                <th>S.NO</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Caption</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Intros.map((Intro, index) => (
    <tr key={Intro._id}>
        <th>{index+1}</th>
        <td><img src={Intro.image} alt="Intro Image" width="100" height="100" /></td>
        <td>{Intro.title}</td>
        <td>{Intro.firstName}</td>
        <td>{Intro.lastName}</td>
        <td>{Intro.caption}</td>
        <td>{Intro.description}</td>
        <td>
            <button type="button" className="btn btn-primary mr-2" onClick={() => handleEdit(Intro)}>
                Edit
            </button>
            <button type="button" className="btn btn-danger" onClick={() => deleteIntros(Intro._id)}>
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

export default Intro;
