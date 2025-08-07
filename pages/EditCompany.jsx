import React, { useEffect, useState } from 'react';
import { getCompany, updateCompany } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

const EditCompany = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', location: '', email: '', phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      const res = await getCompany(id);
      if (res.status === 200) {
        setFormData(res.data.data);
      }
    };
    fetchCompany();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateCompany(id, formData);
    if (res.status === 200) {
      alert("Company updated successfully!");
      navigate('/');
    } else {
      alert("Failed to update");
    }
  };

  return (
    <div>
      <h2>Edit Company</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditCompany;
