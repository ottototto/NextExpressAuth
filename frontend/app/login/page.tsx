"use client";

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', data);
      alert('Login successful');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/dashboard'); // Redirect to dashboard upon successful login
    } catch (error: any) {
      console.error('Login failed:', error.response || error.message);
      alert(`Login failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-sm">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            {...register('email')}
            className="w-full px-2 py-1 border rounded text-black"
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            {...register('password')}
            className="w-full px-2 py-1 border rounded text-black"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
