import React, { useState, useEffect } from 'react';
import { addContact, getContact, updateContact, deleteContact } from "../../../api/contact";
import { toast } from 'react-toastify';
import Header from '../../../components/header';
import bottomlogo from '../../../assets/wave.svg';
import './contact.css';
import { getAdminId } from '../../../utils/Storage';
import { useNavigate } from 'react-router-dom';
import { isValidEmail } from '../../../utils/Validation';

const Contact = () => {
    let initialStateInputs = {
        userId: getAdminId(),
        name: '',
        email: '',
        age: '',
        gender: '',
        phoneNumber: '',
        address: '',
        languages: '',
    };

    let initialStateErrors = {
        name: { required: false },
        email: { required: false, valid: false },
        age: { required: false },
        gender: { required: false },
        phoneNumber: { required: false },
        address: { required: false }, 
        languages: { required: false },  
    };

    const [inputs, setInputs] = useState(initialStateInputs);
    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const navigate = useNavigate();
    const [Contacts, setContacts] = useState([]);

    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (data.name === "") {
            error.name.required = true;
        }
        if (data.email === "") {
            error.email.required = true;
        }
        if (isValidEmail(data.email)) {
            error.email.valid = true;
        }
        if (data.age === "") {
            error.age.required = true;
        }
        if (data.gender === "") {
            error.gender.required = true;
        }
        if (data.phoneNumber === "") {
            error.phoneNumber.required = true;
        }
        if (data.address === "") {
            error.address.required = true;
        }
        if (data.languages === "") {
            error.languages.required = true;
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

    const addContacts = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        const allInputValid = Object.values(newError).every((x) => !x.required);
        if (allInputValid) {
            addContact(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setInputs(initialStateInputs);
                    setSubmitted(false);
                    getContactList();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

  

    useEffect(() => {
        getContactList();
    }, []);

    const getContactList = async () => {
        try {
            const res = await getContact();
            setContacts(res?.data?.result);
            console.log("Contact list", res);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteContacts = async (id) => {
        try {
            await deleteContact(id);
            toast.success('Contact deleted successfully!');
            getContactList();
        } catch (error) {
            console.error('Error deleting Contact:', error);
            toast.error(error.message || 'Failed to delete Contact. Please try again.');
        }
    };

    const handleEdit = (Contact) => {
        setSelectedContact(Contact);
        setInputs({
            userId: getAdminId(),
            _id: Contact._id,
            name: Contact.name,
            email: Contact.email,
            age: Contact.age,
            gender: Contact.gender,
            phoneNumber: Contact.phoneNumber,
            address: Contact.address,
            languages: Contact.languages
        });
    };

    const updateContacts = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        const allInputValid = Object.values(newError).every((x) => !x.required);
        if (allInputValid) {
            updateContact(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setInputs(initialStateInputs);
                    setSubmitted(false);
                    getContactList();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    const handleCancelEdit = () => {
        setSelectedContact(null);
        setInputs(initialStateInputs);
    };

    return (
        <div className='back_table'>
            <Header />
            <div className="container mb-5 p-5 mt-3">
                <h1 style={{ textAlign: 'center', color: '#7333D5' }}>Contact Management</h1>
                <form onSubmit={selectedContact ? updateContacts : addContacts} className=''>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={inputs.name}
                            onChange={handleInputs}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={inputs.email}
                            onChange={handleInputs}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            id="age"
                            name="age"
                            value={inputs.age}
                            onChange={handleInputs}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <input
                            type="text"
                            className="form-control"
                            id="gender"
                            name="gender"
                            value={inputs.gender}
                            onChange={handleInputs}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">PhoneNumber</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={inputs.phoneNumber}
                            onChange={handleInputs}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={inputs.address}
                            onChange={handleInputs}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="languages">Languages</label>
                        <input
                            type="text"
                            className="form-control"
                            id="languages"
                            name="languages"
                            value={inputs.languages}
                            onChange={handleInputs}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {selectedContact ? 'Update' : 'Add'}
                    </button>
                    {selectedContact && (
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>PhoneNumber</th>
                                <th>Address</th>
                                <th>Languages</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Contacts.map(Contact => (
                                <tr key={Contact._id}>
                                    <td>{Contact.name}</td>
                                    <td>{Contact.email}</td>
                                    <td>{Contact.age}</td>
                                    <td>{Contact.gender}</td>
                                    <td>{Contact.phoneNumber}</td>
                                    <td>{Contact.address}</td>
                                    <td>{Contact.languages}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary mr-2" onClick={() => handleEdit(Contact)}>
                                            Edit
                                        </button>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteContacts(Contact._id)}>
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
