// src/components/auth/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`,
        { username, email, password }
      );

      // Save token in context
      login(data.token);

      // Redirect to home
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err.response?.data);

      if (err.response?.status === 409) {
        setError('This email is already registered.');
      } else if (err.response?.status === 400) {
        setError('Please fill all required fields correctly.');
      } else {
        setError(err.response?.data?.msg || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-sm bg-[#181818]">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-500">YouTube Clone</h1>
        <h2 className="text-xl font-semibold mb-6 text-center">Create an Account</h2>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-400 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              className="border border-gray-700 rounded w-full py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-black"
              required
            />
          </div>

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
              disabled={loading}
              className={`${
                loading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
              } text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500`}
            >
              {loading ? 'Creating...' : 'Sign Up'}
            </button>

            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-600"
            >
              Already have an account? Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
