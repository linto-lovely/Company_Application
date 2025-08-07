import React, { useEffect, useState } from 'react';
import { getCompany, deleteCompany } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteCompany = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      const res = await getCompany(id);
      if (res.status === 200) {
        setCompany(res.data.data);
      }
    };
    fetchCompany();
  }, [id]);

  const handleDelete = async () => {
    const res = await deleteCompany(id);
    if (res.status === 200) {
      alert("Company deleted successfully!");
      navigate('/');
    } else {
      alert("Failed to delete company.");
    }
  };

  if (!company) return <p>Loading...</p>;

  return (
    <div>
      <h2>Delete Company</h2>
      <p>Are you sure you want to delete the following company?</p>
      <p><strong>{company.name}</strong> - {company.email}</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate('/')}>Cancel</button>
    </div>
  );
};

export default DeleteCompany;
