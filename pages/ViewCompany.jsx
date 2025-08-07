import React, { useEffect, useState } from 'react';
import { getCompany } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

const ViewCompany = () => {
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

  if (!company) return <p>Loading...</p>;

  return (
    <div>
      <h2>Company Details</h2>
      <p><strong>Name:</strong> {company.name}</p>
      <p><strong>Location:</strong> {company.location}</p>
      <p><strong>Email:</strong> {company.email}</p>
      <p><strong>Phone:</strong> {company.phone}</p>
      <button onClick={() => navigate('/')}>Back to List</button>
    </div>
  );
};

export default ViewCompany;
