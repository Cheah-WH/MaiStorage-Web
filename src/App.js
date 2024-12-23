import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [section, setSection] = useState(0); // Section 0 as the initial value
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    gender: '',
    nric: '',
  });
  const [employeeData, setEmployeeData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Form submitted successfully:', data);
        alert('Form submitted successfully');
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        alert('Error submitting form');
      });
  };

  useEffect(() => {
    if (section === 2) {
      fetch('http://localhost:5000/get-employees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setEmployeeData(data);
        })
        .catch((error) => {
          console.error('Error fetching employee data:', error);
          alert('Error fetching employee data');
        });
    }
  }, [section]);
  
  return (
    <div className="mainContainer">
      <div className="headerLine">
        <h1 className="blue">M</h1>
        <h1 className="yellowOrange">ai</h1>
        <h1 className="blue">Storage</h1>
        <h1 className="black">Employee Tracking System</h1>
      </div>
      <p>Welcome to <b>MaiStorage</b></p>
      {section === 0 && (
        <div className="homeContainer">
          <button className="homeButton" onClick={() => setSection(1)}>Register Employee</button>
          <button className="homeButton" onClick={() => setSection(2)}>View Employees</button>
        </div>
      )}

      {section === 1 && (
        <div className="formContainer">
          <button className="homeButton" onClick={() => setSection(0)}>Back</button>
          <h2>Register Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="formGroup">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                pattern="^[0-9]{10,11}$"
                placeholder="Eg: 0123456789"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="nric">NRIC Number:</label>
              <input
                type="text"
                id="nric"
                name="nric"
                value={formData.nric}
                onChange={handleChange}
                required
                pattern="^\d{12}$"
                placeholder="Eg: 010203101234"
              />
            </div>

            <button type="submit" className="submitButton">Submit</button>
          </form>
        </div>
      )}

      {section === 2 && (
        <div className="viewContainer">
          <button className="homeButton" onClick={() => setSection(0)}>Back</button>
          <h2>View Employees</h2>
          {employeeData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Gender</th>
                  <th>NRIC</th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone_number}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.nric}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No employees found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
