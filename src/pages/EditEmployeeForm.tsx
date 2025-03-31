import React, { useState } from 'react';

const EditEmployeeForm: React.FC = () => {
  const [employee, setEmployee] = useState({
    id: '',
    fullName: '',
    gender: '',
    department: '',
    position: '',
    joinDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Employee data:', employee);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="id" value={employee.id} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" value={employee.fullName} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender" value={employee.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <label htmlFor="department">Department:</label>
        <input type="text" id="department" name="department" value={employee.department} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="position">Position:</label>
        <input type="text" id="position" name="position" value={employee.position} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="joinDate">Join Date:</label>
        <input type="date" id="joinDate" name="joinDate" value={employee.joinDate} onChange={handleChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditEmployeeForm;
