// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`,
        { email, password }
      );

      // Save token in context
      login(data.token);

      // Redirect to home
      navigate('/');
    } catch (err) {
      console.error('Login error:', err.response?.data);
      setError(err.response?.data?.msg || 'Invalid email or password.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-sm bg-[#181818]">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-500">YouTube Clone</h1>
        <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="border border-gray-700 rounded w-full py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-black"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-400 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="border border-gray-700 rounded w-full py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-black"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Log In
            </button>

            <Link
              to="/signup"
              className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-600"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
