import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { handleError } from '../utils'
import { handleSuccess} from '../utils'

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError('Name, email and password are required');
    }

    try {
      const url = 'https://auth-mern-app-api-mu.vercel.app/auth/signup';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });

      const result = await response.json();
      const { success, message, error} = result;
      if(success) {
        handleSuccess(message);
        setTimeout(()=> {
          navigate('/login')
        }, 1000)
      }else if(error) {
        const details = error?.details[0].message;
        handleError(details);
      }else if(!success){
        handleError(message);
      }


      console.log(result);
      // setSignupInfo({
      //   name: "",
      //   email: "",
      //   password: ""
      // });

    toast.success("Signup successful")

    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center p-6 bg-gradient-to-br from-indigo-50 via-purple-50 relative'>
      
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]"></div>

      <div className='flex flex-col gap-2 w-full max-w-md'> 
        
        <h1 className='text-4xl font-bold text-gray-900 text-center'>Signup</h1>

        <form className="space-y-5" onSubmit={handleSignup}>
          
          {/* Name */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase">
              Full Name
            </label>
            <input
              type="text"
              name='name'
              value={signupInfo.name}
              onChange={handleChange}
              placeholder="Johnathan Doe"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-indigo-300 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase">
              Email
            </label>
            <input
              type="email"
              name='email'
              value={signupInfo.email}
              onChange={handleChange}
              placeholder="name@email.com"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-indigo-300 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase">
              Password
            </label>
            <input
              type="password"
              name='password'
              value={signupInfo.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-white focus:ring-2 focus:ring-indigo-300 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-105 transition mt-6"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>

        <ToastContainer />
      </div>
    </div>
  )
}

export default Signup
