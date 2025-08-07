import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCompany } from '../api/api';

const AddCompany = () => {
    const navigate = useNavigate();
    const { mode, id } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        email: '',
        phone: '',
        pin: ''
    });

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, location, email, phone } = formData;
        if (!name || !location || !email || !phone) {
            return alert("Please fill in all required fields.");
        }

        try {
            const submissionData = new FormData();
            submissionData.append('name', formData.name);
            submissionData.append('location', formData.location);
            submissionData.append('email', formData.email);
            submissionData.append('phone', formData.phone);
            
            if (file) {
                submissionData.append('profile', file);
            }

            const res = await createCompany(submissionData);
            console.log(res);

            if (res.status === 201) {
                alert("Company created successfully!");
                navigate('/');
            } else if (res.response && res.response.status === 409) {
                alert("Company already exists");
            } else {
                alert("Something went wrong");
            }

        } catch (error) {
            console.error("Error creating company:", error);
            alert("Failed to create company");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Add Company</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Location: </label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} />
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Phone: </label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div>
                    <label>Profile Image: </label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <br />
                <button type="submit">Create Company</button>
            </form>
        </div>
    );
};

export default AddCompany;
