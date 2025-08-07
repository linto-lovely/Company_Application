import React, { useEffect, useState } from 'react';
import { getCompanies } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCompanies();
      setCompanies(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Company List</h2>
      <button onClick={() => navigate('/add-company')}>Add Company</button>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.length === 0 ? (
            <tr><td colSpan="5">No companies found</td></tr>
          ) : (
            companies.map((company, index) => (
              <tr key={index}>
                <td>{company.name}</td>
                <td>{company.location}</td>
                <td>{company.email}</td>
                <td>{company.phone}</td>
                <td>
                  <button onClick={() => navigate(`/view-company/${company._id}`)}>View</button>{' '}
                  <button onClick={() => navigate(`/edit-company/${company._id}`)}>Edit</button>{' '}
                  <button onClick={() => navigate(`/delete-company/${company._id}`)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
