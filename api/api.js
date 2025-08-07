// import axios from "axios";

// const URL = 'http://localhost:5000'; // backend URL

// export const createCompany = async (data) => {
//     try {
//         const res = await axios.post(`${URL}/api/create-company`, data, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         return res;
//     } catch (error) {
//         return error;
//     }
// };
import axios from "axios";
import { data } from "react-router-dom";

const URL = 'https://company-application.onrender.com'; // backend URL

export const createCompany = async (data) => {
    try {
        const res = await axios.post(`${URL}/api/create-company`, data, {
            headers: {
                // 'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });

        return res;
    } catch (error) {
        // Return the full response if available
        if (error.response) {
            return error.response;
        }
        // If no response from server (e.g., network error)
        return {
            status: 500,
            data: { message: "Network error or server not reachable." },
        };
    }
};

export const getCompanies = async () => {
    try{

        const res = await axios.get(`${URL}/api/company-list`)
        return res.data.data;
    } catch(error) {
        console.error("Fetch error:", error);
      return [];
    }
};

export const getCompany = async (id) => {
    try{

        const res = await axios.get(`${URL}/api/view-company/${id}`);
        return res;
    } catch(error) {
        console.error("Fetch error:", error);
      return [];
    }
};
export const updateCompany = async (id, data) => {
    try {
      return await axios.put(`${URL}/api/update-company/${id}`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return error.response || { status: 500 };
    }
  };
  
  export const deleteCompany = async (id) => {
    try {
      return await axios.delete(`${URL}/api/delete-company/${id}`);
    } catch (error) {
      return error.response || { status: 500 };
    }
  };
  



  
