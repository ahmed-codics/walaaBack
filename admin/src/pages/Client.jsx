import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useAuthStore } from '../../../walaa/src/store/useAuthStore.js';


const Client = () => {
  const [users , setUsers] = useState([]);
  const [formData , setFormData] = useState({fullName: "" , email: "", password: ""});
  
 
  useEffect(() => {
    axios
         .get("http://localhost:5001/api/admin/users")

         .then(
               response => {console.log("Fetched users:", response.data); 
               setUsers(response.data)
            })

         .catch(error => console.error("Error fetching users:", error));

  }, [])

  const addClient = async () => {
    await axios.post("http://localhost:5001/api/auth/signup");
  }


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-gray-800 text-3xl font-semibold mb-4">Client Management</h2>
        <p className="text-gray-600">Manage your clients efficiently with our system.</p>
        <div className="mt-6">
            <div className='border border-black'>
                {users.map(user => (
                    <li className='text-black' key={user._id}>{user.fullName} - {user.email}</li>

                ))}
            </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
            Add New Client
          </button>
        </div>
      </div>
    </div>
  );
};

export default Client;
