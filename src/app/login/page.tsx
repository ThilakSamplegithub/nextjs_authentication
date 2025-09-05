"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const LoginPage = () => {
  const router=useRouter()
  const[isButtonDisabled,setButtonDisabled]=useState(true)
  const [isSent,setSent]=useState(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  async function onForgotPassword(){
    //  write api to send mail
    try {
      await axios.patch(`/api/users/forgotpass`,{email:user.email})
      setSent(true)
    } catch (error:any) {
      console.log(error.message)
    }
    
  }
  async function onLogin(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    try{
      e.preventDefault();
    console.log(user, "is user");
    const {email,password}=user
      const logged=await axios.post(`/api/users/login`,{email,password})
      console.log(logged)
      router.push('/profile')
      
    }catch(err:any){
      console.log(err.message)
    }
    
  }
  

  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen">
      <h1 className="text-center text-2xl ">Login Page</h1>
      <hr />
      <form onSubmit={onLogin} className="flex flex-col items-center gap-2">
        <label htmlFor="Email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="border rounded-lg focus:outline-none border-gray-300 focus:border-gray-600"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="border rounded-lg focus:outline-none border-gray-300 focus:border-gray-600"
        />
        <button 
          className="border rounded-lg focus:outline-none border-gray-300 focus:border-gray-600 p-2"
          type="submit"
        >
          Login
        </button>
      </form>
      <button onClick={onForgotPassword} className='bg-blue-400 rounded p-1'>{isSent ? "Check Mail":"Forgot Password"}</button>
      <Link href={"/signup"}>Visit Signup Page</Link>
    </div>
  );
};

export default LoginPage;
