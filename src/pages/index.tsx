import { useState } from 'react'
import axios from 'axios'
// import InstaX from "/public/InstaX.webp";
import Image from 'next/image'
export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('') // New state for messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('') // Clear previous messages

    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password,
      })
      setMessage(response.data.message) // Set success message

      // Redirect after 2 seconds

      setTimeout(() => {
        window.location.href = 'https://source.unsplash.com/random/401x301' // Change this to your desired website
      }, 2000)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'An error occurred')
    }
  }

  return (
    <div className='bg-gray-900 min-h-screen text-white flex flex-col items-center'>
      <div className='fixed top-0 w-full flex justify-between items-center bg-black text-white px-6 py-4 shadow-lg'>
        {/* Logo and Name */}
        <div className='flex items-center space-x-3'>
          <Image
            src='/InstaX.jpg'
            alt='InstaX Logo'
            width={40}
            height={40}
            className='rounded-full border-2 border-pink-500 shadow-lg'
          />
          <h1 className='text-2xl font-bold text-pink-500'>InstaX</h1>
        </div>
      </div>

      {/* 🔹 Navbar */}
      <nav className='w-full bg-gray-800 py-4 px-6 flex justify-between items-center fixed top-0'>
        <h1 className='text-2xl font-bold text-pink-400'>InstaX</h1>
        <div className='space-x-6'>
          <span className='cursor-pointer hover:text-gray-400'>🏠 Home</span>
          <span className='cursor-pointer hover:text-gray-400'>🔍 Search</span>
          <span className='cursor-pointer hover:text-gray-400'>
            ❤️ Notifications
          </span>
          <span className='cursor-pointer hover:text-gray-400'>
            📩 Messages
          </span>
        </div>
      </nav>

      {/* 🔹 Stories Section */}
      <div className='mt-20 flex space-x-4 overflow-x-auto p-4'>
        {[...Array(8)].map((_, index) => (
          <div key={index} className='flex flex-col items-center'>
            <div className='w-16 h-16 bg-gray-700 rounded-full border-2 border-pink-500 p-1'>
              <img
                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                alt='Story'
                className='w-full h-full rounded-full'
              />
            </div>
            <span className='text-sm mt-1'>User{index + 1}</span>
          </div>
        ))}
      </div>

      <div className='w-full max-w-md md:max-w-lg lg:max-w-xl bg-zinc-900 p-8 rounded-lg shadow-2xl mt-20'>
        <h2 className='text-3xl font-bold text-center text-pink-400 glowing-text'>
          InstaX
        </h2>
        {message && (
          <p className='text-center mt-2 text-green-400'>{message}</p>
        )}
        <form onSubmit={handleSubmit} className='space-y-6 mt-4'>
          <div>
            <label className='block text-sm mb-1'>Username</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded focus:outline-none text-white'
            />
          </div>
          <div>
            <label className='block text-sm mb-1'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded focus:outline-none text-white'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg text-lg'
          >
            Login
          </button>
        </form>
      </div>

      {/* 🔹 Posts Section */}
      <div className='mt-10 w-full max-w-lg space-y-6'>
        <h2 className='text-xl font-bold mb-4'>📷 Latest Posts</h2>
        {[...Array(2)].map((_, index) => (
          <div key={index} className='bg-gray-800 p-4 rounded-lg'>
            <div className='flex items-center space-x-3'>
              <img
                src={`https://i.pravatar.cc/150?img=${index + 3}`}
                className='w-10 h-10 rounded-full'
                alt='User'
              />
              <h3 className='font-semibold'>User{index + 3}</h3>
            </div>
            <img
              src={`https://i.pravatar.cc/150?img=${index + 8}`}
              alt='Post'
              className='w-full h-60 object-cover rounded mt-2'
            />

            <div className='flex justify-between mt-2'>
              <button className='text-pink-400 hover:text-pink-500'>
                ❤️ Like
              </button>
              <button className='text-blue-400 hover:text-blue-500'>
                💬 Comment
              </button>
            </div>
            <p className='mt-2 text-gray-300'>Just vibes! </p>
          </div>
        ))}
      </div>
    </div>
  )
}
