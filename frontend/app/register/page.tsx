"use client";

import { useForm } from 'react-hook-form';
import axios from 'axios';

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await axios.post('http://localhost:5000/api/register', data);
      alert('Registration successful');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific error here
        alert(`Registration failed: ${error.response?.data?.error || error.message}`);
      } else {
        // Handle non-Axios error here
        console.error('Registration failed:', error);
        alert(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-sm">
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full px-2 py-1 border rounded text-black"
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            {...register('password', { required: true })}
            className="w-full px-2 py-1 border rounded text-black"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
