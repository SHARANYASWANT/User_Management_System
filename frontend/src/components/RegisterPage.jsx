import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState([])
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        email,
        password
      });
      if (response.data.success) {
        setSuccessMessage('Registration successful! You can now log in.');
        setEmail('');
        setPassword('');
      } else {
        setErrorMessage(response.data.message || 'Registration failed');
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleRegister}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label>Role:</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setResult(e.target.value)}
          required
        />
        <br />
        <button type="submit" onClick={handleRegister}>Register</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
      <a href="/">Login</a>
    </div>
  );
}

export default RegisterPage;
