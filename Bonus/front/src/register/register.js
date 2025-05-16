import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    name: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert('User created');
      } else {
        alert(`Error: ${data.msg}`);
      }
    } catch (err) {
      console.error(err);
      alert('ERROR.');
    }
  };

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="FirsName"
          value={formData.firstname}
          onChange={handleChange}
        /><br />

        <input
          type="text"
          name="name"
          placeholder="LastName"
          value={formData.name}
          onChange={handleChange}
        /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
